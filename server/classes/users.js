class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        let person = { id, name, room };
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter(per => per.id === id)[0];

        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeoplePerRoom(room) {
        let peopleOnRoom = this.people.filter(per => per.room === room);
        return peopleOnRoom
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.people = this.people.filter(per => per.id != id);
        return deletedPerson;
    }
}

module.exports = {
    Users
}