var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var UserProject = db.user_project;
var User = db.user;
var Project = db.project;

//post запросы
exports.createProject = (req, res) => { //создание нового проекта
    Project.create({
        name: req.body.name
    }).then(object => {
        UserProject.create({
            is_admin: true,
            user_id: req.body.user_id,	
            project_id: object.id
        }).then(object => {
            globalFunctions.sendResult(res, object);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        })
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.addUserForProject = (req, res) =>{ //добавление пользователя
    UserProject.create({
        is_admin: false,
        user_id: req.body.user_id,	
        project_id: req.body.project_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


//get запросы
exports.findAllProjectsForUser = (req, res) => { //все проекты для пользователя
    db.sequelize.query(
        `select p.id as project_id, p.name as project_name, up.is_admin
            from project p
            join user_project up on up.project_id = p.id
            WHERE up.user_id = ?`,  
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.user_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};




