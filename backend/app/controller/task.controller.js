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
        
        is_done: req.body.is_done,
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
exports.updateTextTask = (req, res) => {
    Task.update({
        name: req.body.name,
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
    console.log(1);
    db.sequelize.query(
        `SELECT t.project_id as project_id, t.name as task_name, t.id as task_id, is_done
            from task t
            join user u on t.user_id = u.id
            where u.id = ?
            order by t.project_id`,
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
exports.findTask = (req, res) => { //все задания по всем проектам пользователя
    db.sequelize.query(
        `SELECT *
            from task t
            where t.id = ?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.task_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
exports.findAllProjects = (req, res) => { //проекты пользователя с задачами
    console.log(1);
    db.sequelize.query(
        `SELECT p.name as project_name, t.project_id as project_id
        from task t
        join project p on p.id = t.project_id
        join user u on t.user_id = u.id
        where u.id = ?
        GROUP by p.name`,
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
        `SELECT t.name as task_name, t.id as task_id, is_done
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
        `select t.name as task_name, t.id as task_id, t.is_done, u.username as username, u.id as user_id, p.name as project_name
            from task t
            join user u on t.user_id = u.id
            join project p on t.project_id = p.id
            where p.id = ?`,
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
