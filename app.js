var express = require('express');
var app = express();

app.get('/stooges/:name?', function(req, res, next){
  var name = req.params.name;

  switch( name? name.toLowerCase() : ''){
    case 'larry':
    case 'curly':
    case 'moe':
      res.send(name + ' is my favorite stooge');
      break;

    default:
      next();
  }
});

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);