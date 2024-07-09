const socket = io();
// socket.on('broadcast', function (data) {
//     document.body.innerHTML = '';
//     document.write(data.message);
// });
socket.on('newuserconnect', function (data) {
    document.body.innerHTML = '';
    document.write(data.message);
});


// 
const socket2 = io('/sasan');

socket2.on('newuserconnect', function (data) {
    document.body.innerHTML = '';
    document.write(data.message);
});

