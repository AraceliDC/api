const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes/index')
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.use('/v1', routes)

app.get('/',(req, res) =>{
    res.send('todo ok')
})

app.listen(port, ()=>{
    console.log('server iniciado en el puerto ' + port);
})