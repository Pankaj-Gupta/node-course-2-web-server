const express = require('express');
const hbs = require('hbs'); //add support for partials
const fs = require('fs');

const port = process.env.PORT || 3000; // port for heroku
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log ', log + '\n');
  next();
}); //middleware to help us to keep track, how server is working

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
}); //so that it can be used in footer partials

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>hello express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage : 'hello',
  });
});

app.get('/about', (req, res)=>{
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port} `);
}); //port
