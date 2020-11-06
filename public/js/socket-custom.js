var socket = io();

//On is to listen events
socket.on('connect', function() {
    console.log('Connected to the server (:');
});

socket.on('disconnect', function() {
    console.log('Connection to the server is lost :(');
});

//Emit is to send info
socket.emit("sendMessage", {
    user: "Ivan",
    message: "Hello from the Client!"
}, function(resp) {
    console.log("Response from server: ", resp);
});

//Listen info from server
socket.on("sendMessage", function(message) {
    console.log('server:', message);
})