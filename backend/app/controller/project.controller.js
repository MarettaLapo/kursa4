var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Project = db.project;

// Добавление нового проекта с именем
exports.create = (req, res) => {
    Project.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};