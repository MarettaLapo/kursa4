var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Task = db.task;

//post запросы
exports.createTask = (req, res) => { //создание нового задания для пользователя
    console.log(1)
    Task.create({
        name: req.body.name,
        is_done: false,
        user_id: req.body.user_id,
        project_id: req.body.project_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.updateTask = (req, res) => {
    Task.update({
        name: req.body.name,
        is_done: req.body.is_done,
        user_id: req.body.user_id,
        project_id: req.body.project_id
    },
    {
        where:{
            id: req.params.id
        }
    }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//get запросы
exports.findAllTaskForAllProjects = (req, res) => { //все задания по всем проектам пользователя
    db.sequelize.query(
        `SELECT p.name as project_name, t.name as task_name, is_done
            from task t
            join user u on t.user_id = u.id
            join project p on t.project_id = p.id
            where u.id = ?`,
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

exports.findTaskForProject = (req, res) => { //все задания по определенному проекту пользователя
    db.sequelize.query(
        `SELECT t.name as task_name, is_done
            from task t
            join user u on t.user_id = u.id
            join project p on t.project_id = p.id
            where u.id = ? and p.id = ?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.user_id, req.params.project_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findTasksForAllUsers = (req, res) => { //все задания по определенному проекту
    db.sequelize.query(
        `select t.name as task_name, u.username as username, p.name as project_name
            from task t
            join user u on t.user_id = u.id
            join project p on t.project_id = p.id
            where t.project_id = ?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.project_id]
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
