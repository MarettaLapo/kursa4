module.exports = (app) => {

    const user = require('../controller/user.controller');
    
    // Получение всех пользователей
    // app.get('/api/users', user.findAll);
    
    app.get('/api/user/username/:username', user.findByUsername); //поиск по нику для добавления в проект

    app.get('/api/user/findUsersInProject/projectId=:project_id', user.findUsersInProject); //пользователи для проекта
};