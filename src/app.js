require("dotenv").config();
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.get('/api', (req, res) => res.send('Welcome the API'))
app.use("/static", express.static(__dirname + "/assets"));
app.use("/code", express.static(__dirname + "/code"));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log(`App listening on port http://localhost:${port} `))