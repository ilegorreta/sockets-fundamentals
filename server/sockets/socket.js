const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');
const users = new Users();

io.on('connection', (client) => {

    console.log('User connected');

    client.on('chatLogin', (data, callback) => {

        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: "Name and room are mandatory"
            });
        }
        //Function to connect a user to a room
        client.join(data.room);

        person = users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPeople', users.getPeoplePerRoom(data.room));

        callback(users.getPeoplePerRoom(data.room));
    })

    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);
        client.broadcast.to(deletedPerson.room).emit('sendMessage', createMessage('Admin', `${deletedPerson.name} left the room`));
        client.broadcast.to(deletedPerson.room).emit('listPeople', users.getPeoplePerRoom(deletedPerson.room));
    });

    client.on('sendMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(data.room).emit('sendMessage', message);
    });

    //Private messages
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        //In the client, we need to add the parameter 'to' in the sending object to set the destinary of the private message 
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message))
    })

});