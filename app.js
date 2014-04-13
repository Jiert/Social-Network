var express = require('express');
// var http = require('http');
var app = express();
// var server = http.createServer('app');
// var io = require('socket.io').listen(server);
// var catchPhrase = ['Why I oughta...', 'Nyuk Nyuk Nyuk!', 'Poifect!', 'Soitenly!', 'Spread Out!'];

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// function mainLoop(){
//   console.log('Starting Application');
//   eventEmitter.emit('ApplicationStart');
  
//   console.log('Stopping Application');
//   eventEmitter.emit('ApplicationStop');  
// }

// function onApplicationStart(){
//   console.log('Handling Application Start Event');
// }

// function onApplicationRun(){
//   console.log('Handling Application Run Event');
// }

// function onApplicationStop(){
//   console.log('Handling Application Stop Event');
// }


// eventEmitter.on('ApplicationStart', onApplicationStart);
// eventEmitter.on('ApplicationRun', onApplicationRun);
// eventEmitter.on('ApplicationStop', onApplicationStop);

// mainLoop();

app.set('view engine', 'jade');
app.set('view options', { layout : true });
app.set('views', __dirname + '/views');

app.get('/stooges/:name?', function(req, res, next){
  var name = req.params.name;

  switch( name? name.toLowerCase() : ''){
    case 'larry':
    case 'curly':
    case 'moe':
      res.render('stooges', {stooge: name});
      break;

    default:
      next();
  }
});

app.get('/stooges/*?', function(req, res){
  res.render('stooges', {stooge : null});
});

app.get('/?', function(req, res){
  res.render('index');
});

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);