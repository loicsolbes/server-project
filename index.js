//Server code

const { request, response } = require('express');

const express = require('express');
const Datastore = require('nedb')

const app = express()

app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json( {limit: '1mb'} ))

const dataBase = new Datastore('database.db')
dataBase.loadDatabase()

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    dataBase.insert(data);
    response.json(data);
  });
