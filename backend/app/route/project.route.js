module.exports = (app) => {

    const project = require('../controller/project.controller');
    // Добавление нового проекта
    app.post('/api/addProject', project.create);
};