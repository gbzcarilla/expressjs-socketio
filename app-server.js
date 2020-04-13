var express = require('express');
app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

var port = 3000;

// Static files
app.use(express.static('public'));

app.get('/', function(req, res){
  //res.send('<h1>Hello There!</h1>');
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('A User has connected...');

  // Handle disconnect message
  socket.on('disconnect', function(){
    console.log('A User has disconnected...');
  });

  // Handle chat message
  socket.on('chat message', function(data){
    console.log(data.handle + ': ' + data.message);
    io.emit('chat message', data);
  });

  // Handle typing message
  socket.on('typing', function(name){
    // emit to everyone except the original one
    socket.broadcast.emit('typing', name);
    //console.log('somebody is typing...:' + name);
  });
});


http.listen(port, function(){
  console.log('listening on *:'+port);
});