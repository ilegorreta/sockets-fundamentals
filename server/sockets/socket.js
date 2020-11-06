const { io } = require('../server');

io.on('connection', (client) => {

    console.log('User connected');

    client.emit('sendMessage', {
        user: "Admin",
        message: "Hello from the server!"
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    //Listen to client ('on' is to listen)
    client.on('sendMessage', (data, callback) => {
        console.log(data);

        if (data.user) {
            callback({
                resp: "Everything went well (:"
            })
        } else {
            callback({
                resp: "Everything went wrong :("
            })
        }
        callback();
    })

});