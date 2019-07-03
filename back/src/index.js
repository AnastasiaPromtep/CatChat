const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('Strategy');
        // Call DB here to find user
        const user = {email: 'apromtep@gmail.com', password: 'azerty', token: '1234'};
        if (email === 'apromtep@gmail.com' && password === 'azerty') {
            return done(null, user);
        }
        return done(null, false, { message: 'Bad credentials !'});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => uuid(),
    store: new FileStore(),
    secret: 'Amazing cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/login', function (req, res) {
    return res.sendStatus(200);
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    return res.send('Logged in! Meow!');
});

app.get('/cat', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Meow ok !');
    } else {
        res.status(401);
        return res.send('Unauthorized meow!');
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
