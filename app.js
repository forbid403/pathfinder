const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/crawl/Atcoder', (req, res) => {

});

db.once('open', ()=>{console.log("connected to mongo db")})
mongoose.connect('mongodb://localhost/pathfinder');

app.listen(port, () => console.log(`Listening on port ${port}`))