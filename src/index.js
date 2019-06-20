const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('message', (message) => {
        console.log(message);
    });
});

http.listen(port, function() {
    console.log(`Cat chat meowing on port ${port}`);
});
