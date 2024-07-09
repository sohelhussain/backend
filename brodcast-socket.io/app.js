const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

let user = 0;

io.on('connection', function(socket){

    console.log(++user + ' user connected');

    // io.sockets.emit // globle message send for every connected user
    // io.sockets.emit('broadcast', {message: user + ' this is a message are from backend server '});


    // this message are going to only new users
    socket.emit('newuserconnect', {message: ' hii welcome jarvis!  '});


    //not sending the data to new connected user, data send to a already connected user
    socket.broadcast.emit('newuserconnect', {message: user + ' user connected'});


    socket.on('disconnect', function(){
        console.log(--user + ' connection disconnected');
    })
});



// custom-naming

// const com = io.of('/sasan');

// com.on('connection', function(socket){

// })

app.get('/', function(req, res) {
    res.render('chat');
});

server.listen(8080);