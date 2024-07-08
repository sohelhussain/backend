const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let use = 0;

let user = [];
let usersId = [];

io.on('connection', function(socket) {
    console.log( ++use +' connection established' + socket.id);

    socket.on('use', function(val) {
        user.push(val);
        usersId.push(socket.id);
        console.log(user, usersId);
    })
    socket.on('dikha', function(naam) {
        if(usersId.indexOf(socket.id) !== -1){
            console.log(user[usersId.indexOf(socket.id)]);
            io.emit( 'not', user[usersId.indexOf(socket.id)]); // jitne bhi user he un sabhi ko data bhejna
        }
    });

    socket.on('disconnect', function(){
        console.log( --use +' connection closed');
    });
});


app.get('/', (req, res) => {
    res.render('index');
});

server.listen(8080);