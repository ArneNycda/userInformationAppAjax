const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const queryUsers = require('./js/queryUsers');
const addUser = require('./js/addUser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.render('./pages/index', {title: 'Home'});
});

app.route('/users')
    .get(function (req, res) {
        res.render('./pages/users', {title: 'Users', users: queryUsers('')});
    })
    .post(function (req, res) {
        addUser(req.body, function(users) {
            res.render('./pages/users', {title: 'Users', users: users});
        });
    });

app.get('/search', function (req, res) {
    res.render('./pages/search', {title: 'Search'});
});

app.route('/results')
    .get(function (req, res) {
        res.render('./pages/results', {title: 'Results'});
    })
    .post(function (req, res) {
        res.render('./pages/results', {title: 'Results', users: queryUsers(req.body.query)});
    });

app.get('/add', function (req, res) {
    res.render('./pages/add', {title: 'Add user'});
});

app.listen(3000, function() {
    console.log('User information app started on port 3000');
});
