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