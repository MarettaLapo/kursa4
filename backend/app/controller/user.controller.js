var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var { Op } = require("sequelize");
var User = db.user;

// Для добавления пользователей в проект
// exports.findAll = (req, res) => {
//     User.findAll()
//         .then(objects => {
//             globalFunctions.sendResult(res, objects);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         })
// };

// Для добавления пользователей в проект по username
exports.findByUsername = (req, res) => {
    User.findAll({
        where: {
            username: { [Op.like]: `%${req.params.username}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findUsersInProject = (req, res) => { //все проекты для пользователя
    db.sequelize.query(
        `select u.id, u.username 
        from user u 
        join user_project up on up.user_id = u.id 
        where up.project_id = ? 
        order by u.username`,  
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.project_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findUsersWithTasks = (req, res) => { //все проекты для пользователя
    db.sequelize.query(
        `select u.username as username, u.id as user_id
        from task t
        join user u on t.user_id = u.id
        where t.project_id = ?
        GROUP by u.username
        ORDER by u.username`,  
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.project_id] // подстановка параметров
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};