import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import UserProjects from "./components/UserProject/UserProjects"; //главная страница проекта
import AddUsersForProject from "./components/UserProject/AddUsersForProject";
import AddTasksForProject from "./components/UserProject/AddTasksForProject";
import ProjectInfo from "./components/Task/ProjectInfo"; //инфа по проекту
import ProjectTasks from "./components/Task/ProjectTasks";
import Tasks from "./components/Task/Tasks";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
//определяются get запросы в основном(отображаемые страницы)
//определяем маршруты
const routes = [
    //главная страница проектов пользователя
    //на ней список проектов пользоваетеля и кнопка добавления нового проекта
    {
        path: "/UserProjects",
        name: "user-projects",
        component: UserProjects,
        props: true,
        meta: {
            title: "Проекты пользователя"
        }
    },
    //добавление других пользователей в проект
    {
        path: "/AddUsersForProject",
        name: "users-for-project",
        component: AddUsersForProject,
        meta: {
            title: "Добавление пользователей"
        }
    },
    //добавление заданий для добавленых пользователей
    {
        path: "/AddTasksForProject",
        name: "tasks-for-project",
        component: AddTasksForProject,
        meta: {
            title: "Добавление заданий"
        }
    },
    //страница фулл инфы по определенному проекту
    {
        path: "/ProjectInfo/:id",
        name: "project-details",
        component: ProjectInfo,
        props: true,
        meta: {
            title: "Информация по проекту"
        }
    },
    //страница для всех заданий пользователя по всем проектам(без указания id проекта)
    {
        path: "/Tasks",
        name: "user-tasks",
        component: Tasks,
        props: true,
        meta: {
            title: "Задачи"
        }
    },
    //страница для заданий пользователя по определенному проекту(с указанием id проекта)
    {
        path: "/ProjectTasks/:id",
        name: "project-tasks",
        component: ProjectTasks,
        props: true,
        meta: {
            title: "Задания для проекта"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;