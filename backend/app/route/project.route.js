module.exports = (app) => {

    const project = require('../controller/project.controller');
    
    app.post('/api/addProject', project.create); // Добавление нового проекта
};