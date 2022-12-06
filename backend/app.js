var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.listen(3000);

var user = require('./app/route/user.route.js');
user(app);

var project = require('./app/route/project.route.js');
project(app);

var user_project = require('./app/route/user_project.route.js');
project(app);

var task = require('./app/route/task.route.js');
project(app);