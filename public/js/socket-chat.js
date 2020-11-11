var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are mandatory');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

//When client connects
socket.on('connect', function() {
    console.log('Connected to the server (:');

    socket.emit('chatLogin', user, function(resp) {
        console.log('Connected users: ', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Connection to the server is lost :(');
});

//Emit is to send info
// socket.emit("sendMessage", {
//     user: "Ivan",
//     message: "Hello from the Client!"
// }, function(resp) {
//     console.log("Response from server: ", resp);
// });

//Listen info from server
socket.on('sendMessage', function(message) {
    console.log('Message from server:', message);
})

//Listen when a user enters or leaves the chat
socket.on('listPeople', function(people) {
    console.log(people);
})

//Private messages
socket.on('privateMessage', function(message) {
    console.log('Private message: ', message);
})