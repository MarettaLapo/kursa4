module.exports = (app) => {

    const user_project = require('../controller/user_project.controller');
    
    app.get('/api/projects/userId=:user_id', user_project.findAllProjectsForUser); // все проекты для пользователя

    app.post('/api/createProject', user_project.createProject); //создание проекта

    app.post('/api/addUserForProject', user_project.addUserForProject); //добавление пользователей
};