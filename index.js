const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const bodyParser = require('body-parser');
const chatServerController = require('./chatServer');

const state={
    convo:"",
}

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("frontend")))

app.post('/main',chatServerController)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('update-messages',state.convo)
    socket.on('message',body=>{
        state.convo+= `${body.name}: ${body.message}\n`;
        io.emit('update-messages',state.convo)
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});