const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const uuid = require('uuid/v4');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: () => uuid(),
    secret: 'Amazing cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/login', function (req, res) {
    return res.sendStatus(200);
});

app.post('/login', function (req, res) {
    console.log(req.body);
    if (!req.body.login || !req.body.password) {
        res.status(400);
        res.send('Bad credentials');
    } else {
        res.status(200);
        const id = uuid();
        res.send(`Unique id: ${id}`);
    }
});

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
        console.log(message);
    });
});

http.listen(port, function() {
    console.log(`Cat chat meowing on port ${port}`);
});
