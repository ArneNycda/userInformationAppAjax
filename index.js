const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const queryUsers = require('./js/queryUsers');
const addUser = require('./js/addUser');
const fs = require('fs');
const ejs = require('ejs');

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

app.route('/search')
    .get(function (req, res) {
        res.render('./pages/search', {title: 'Search', users: []});
    })
    .post(function (req, res) {
        const userHTML = fs.readFileSync(__dirname + '/views/partials/users.ejs', 'utf8');
        const searchTerm = req.body.data === '' ? [] : queryUsers(req.body.data);
        var userHTMLdone = ejs.render(userHTML, {users: searchTerm});
        res.send({users: userHTMLdone});
    });

app.route('/results')
    .get(function (req, res) {
        res.render('./pages/results', {title: 'Results', users: []});
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
