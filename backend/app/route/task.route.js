module.exports = (app) => {

    const task = require('../controller/task.controller');
    
    app.get('/api/allTasks/userId=:user_id', task.findAllTaskForAllProjects); 

    app.get('/api/allProject/userId=:user_id', task.findAllProjects);

    app.get('/api/findTaskForProject/userId=:user_id&projectId=:project_id', task.findTaskForProject);

    app.get('/api/findTasksForAllUsers/projectId=:project_id', task.findTasksForAllUsers);
    app.get('/api/findTask/:task_id', task.findTask);
    app.post('/api/createTask', task.createTask);

    app.post('/api/updateTask/:id', task.updateTask); //для отметки готовности задачи
    //посмотреть как делалась отметка от изменении админа
    app.post('/api/updateTextTask/:id', task.updateTextTask); //для отметки готовности задачи
    //посмотреть как делалась отметка от изменении админа
};