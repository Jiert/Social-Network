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

app.post('/login', function(req, res){
  console.log('login request');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if (email === null || email.length < 1 || password === null || password.length < 1){
    res.send(400);
    return;
  }

  Account.login(email, password, function(success){
    if (!success){
      res.send(401);
      return;
    }
    console.log('login was successful');
    res.send(200);
  });

});

app.post('/forgotpassword', function(req, res){
  var hostname = req.headers.host;
  var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
  var email = req.param('email', null);
  if (email === null || email.length < 1){
    res.send(400);
    return;
  }

  Account.forgotPassword(email, resetPasswordUrl, function(success){
    if (success){
      res.send(200);
    }
    else {
      //Username or password not found
      res.send(404);
    }
  });

});

app.get('/resetPassword', function(req, res){
  var accountId = req.param('account', null);
  res.render('resetPassword.jade', { locals:{ accountdId: accountId } });
});

app.post('/resetPassword', function(req, res){
  var accountId = req.param('accountId', null);
  var password = req.param('password', null);
  if (accountId !== null && password !== null){
    Account.changeePassword(accountId, password);
  }
  res.render('resetPasswordSuccess.jade');
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