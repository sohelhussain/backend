const socket = io();
const $ = e => document.querySelector(e);
$('#name').addEventListener('click', function(e){
    const data = $('input').value;
    socket.emit('use', data); //emit phele btaya kis naam ka socket chanlana he backend par or fir data bhejdena he
});
$('#dikha').addEventListener('click', function(e){
    socket.emit('dikha'); //jis naam ka emit hoga bacgkend par vahi socket chalega 
});

// socket.emit(''); //frontend se data bhejna
// socket.on(''); //backend se data resive karna
socket.on('not', function(e){
    console.log(e);
});