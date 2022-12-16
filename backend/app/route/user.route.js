module.exports = (app) => {

    const user = require('../controller/user.controller');
    
    // Получение всех пользователей
    // app.get('/api/users', user.findAll);
    
    app.get('/api/username/userId=:user_id&usernameh=:username', user.findByUsername); //поиск по нику для добавления в проект

    app.get('/api/findUsersInProject/projectId=:project_id', user.findUsersInProject); //пользователи для проекта

    app.get('/api/findUsersWithTasks/projectId=:project_id', user.findUsersWithTasks);
};