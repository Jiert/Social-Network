var express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development';

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

if (env === 'development') {
   // configure stuff here
}

app.get('/', function(req, res){
  res.render('index.jade', { layout: false });
});

app.listen(8080);