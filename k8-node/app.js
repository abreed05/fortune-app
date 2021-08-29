const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

require('./config/passport')(passport)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({
    secret : 'secret',
    resave: true,
    proxy: true,
    saveUninitialized : true,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://useradmin:BaZinga90@192.168.10.20:27017/users?authSource=admin',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/user.js'));

app.listen("3000", () => {
    console.log("Server started on port 3000")
})

module.exports = app;