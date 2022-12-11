module.exports = (app) => {

    const task = require('../controller/task.controller');
    
    app.get('/api/allTasks', task.findAllTaskForAllProjects); 

    app.get('/api/Task', task.findTaskForProject);

    app.get('/api/projectTasks', task.findTasksForAllUsers);

    app.post('/api/createTask', task.createTask);

    app.post('/api/updateTask', task.updateTask); //для отметки готовности задачи
};