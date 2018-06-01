const express = require('express');
const cors = require('cors');

const server = express();

const port = 5000;

const projectDb = require('./data/helpers/projectModel.js');
const actionDb = require('./data/helpers/actionModel.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello, David');
})



//***********************projectModel-crud**************************

server.get('/api/projects', (req, res) => {
        projectDb.get()
        .then(response => {
            res.status(200).json({response});
        })
        .catch(error => {
            res.status(500).json({errorMessage: error});
        });        
        
})

server.get('/api/projects/:id', (req, res) => {
    let { id } = req.params
    if (id) {
        projectDb
            .get(id)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(500).json({ error: error })
            })
    } else {
        res.status(400).json({ error: "No project by that ID found" })
    }
})

server.post('/api/projects', (req, res) => {
    let { name, description } = req.body
    console.log(name, description)
    if (!name|| !description) {
        res.status(400).json({ error: "Please provide name and description for project" })
    }
    projectDb
        .insert({ name, description })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error:  "An error occured in the database, please try again later" })
        })
})


server.delete('/api/projects/:id', (req, res) => {
    let { id } = req.params;    
    projectDb
        .get(id)
        .then(result => {
            projectDB.remove(id)
                .then(count => {
                    res.json(result)
                })
              
        })
        .catch(err => {
            res.status(500).json({ error: "An error occured in the database, please try again later" })
        })
})

server.put('/api/projects/:id', (req, res) => {
    const { name, description, completed } = req.body
    const { id } = req.params
    completed === undefined ? completed = false : completed
    projectDb
        .update(id, { name: name, description: description, completed: completed })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error:  "An error occured in the database, please try again later" })
        })
})



server.listen(port, () => console.log(`server running on port ${port}`));