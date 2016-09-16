const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); // no longer needed
const passport = require('passport');
const session = require('express-session');

const app = express();

const nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session({secret: 'library', resave: false, saveUninitialized: false}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);


// default route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello World in EJS',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

const port = process.env.PORT || 8080;
const host = process.env.IP;

app.listen(port, host, err => {
    if (err) {
        console.log(err);
    }
    console.log('running on ' + host + ' on port ' + port);
});