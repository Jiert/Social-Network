var server = http.createServer('app');
var io = require('socket.io').listen(server);
var catchPhrase = ['Why I oughta...', 'Nyuk Nyuk Nyuk!', 'Poifect!', 'Soitenly!', 'Spread Out!'];

var events = require('events');
var eventEmitter = new events.EventEmitter();

function mainLoop(){
  console.log('Starting Application');
  eventEmitter.emit('ApplicationStart');
  
  console.log('Stopping Application');
  eventEmitter.emit('ApplicationStop');  
}

function onApplicationStart(){
  console.log('Handling Application Start Event');
}

function onApplicationRun(){
  console.log('Handling Application Run Event');
}

function onApplicationStop(){
  console.log('Handling Application Stop Event');
}


eventEmitter.on('ApplicationStart', onApplicationStart);
eventEmitter.on('ApplicationRun', onApplicationRun);
eventEmitter.on('ApplicationStop', onApplicationStop);

mainLoop();