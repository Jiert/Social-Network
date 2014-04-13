var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    catchPhrases = ['Monkey balls', 'Toaster Mittens', 'Slapping Wet Puppies'];

app.set('view engine', 'jade');
app.set('view options', { layout : true });
app.set('views', __dirname + '/views');

app.get('/stooges/chat', function(req, res, next){
  res.render('chat');
});

io.sockets.on('connection', function(socket){
  var sendChat = function(title, text){
    socket.emit('chat', {
      title: title,
      contents: text
    });
  };

  setInterval(function(){
    var randomIndex = Math.floor(Math.random() * catchPhrases.length);
    
    sendChat('Stooge', catchPhrases[randomIndex]);
  }, 5000);

  sendChat('Welcome to Stooge Chat', 'Sthe Stooges are on line');

  socket.on('chat', function(data){
    sendChat('You', data.text);
  });

});

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
server.listen(port);
console.log('Listening on port ' + port);