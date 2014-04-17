var express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development';

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

if (env === 'development') {
   // configure stuff here
}

app.post('/register', function(req, res){
  var firstName = req.param('firstName', '');
  var lastName = req.param('lastName', '');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if (email === null || password === null ){
    res.send(400);
    return;
  }

  Account.register(email, password, firstName, lastName);
  res.send(200);
});

app.get('/', function(req, res){
  res.render('index.jade', { layout: false });
});

app.get('/account/authenticated', function(req, res){
  if (req.session.loggedIn){
    res.send(200);
  }
  else {
    res.send(401);
  }
});

app.listen(8080);
console.log('Application Started');