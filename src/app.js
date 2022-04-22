require("dotenv").config();
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const connectLiveReload = require("connect-livereload");

if(process.env.NODE_ENV == "development") {
    console.log(process.env.NODE_ENV)
    app.use(connectLiveReload())
}
app.get('/api', (req, res) => res.send('Welcome the API'))
app.use("/static", express.static(__dirname + "/assets"));
app.use("/code", express.static(__dirname + "/code"));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log(`App listening on port http://localhost:${port} `))