const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const server = express();

// initialize with test data
let users = [
    {
        id: shortid.generate(),
        name: "Tak Loufer",
        bio: "It doesn't actually mean 'red wolf'."
    }
]

// middleware
server.use(express.json());
server.use(cors());

// ENDPOINTS

// generic "API running" endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running!' });
});

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio){
        res.status(400).json({ message: "New user requires 'name' and 'bio' properties."});
    } else {
        let newUser = {
            id: shortid.generate(),
            name: req.body.name,
            bio: req.body.bio
        }
        users.push(newUser);
        res.status(201).json(newUser);
    }
})

// GET all users as array
server.get('/api/users', (req, res) => {
    // if error retrieving:
    // res.status(500).json({ message: "The users' information could not be retrieved."});
    res.status(200).json(users);
})

// GET user with specified ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found."});
    }
})

const port = 5001;
server.listen(port, () => console.log(`\n*** api on port ${port} ***\n`));