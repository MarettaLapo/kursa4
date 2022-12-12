import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import UserProjects from "./components/UserProject/UserProjects"; //главная страница проекта
import AddUsersForProject from "./components/UserProject/AddUsersForProject";
import AddTasksForProject from "./components/UserProject/AddTasksForProject";
import AllTasks from "./components/Task/AllTasks";
import helloTasks from "./components/Task/helloTasks";
import TasksUsers from "./components/Task/TasksUsers";
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
        path: "/TasksUsers",
        name: "tasks-users",
        component: TasksUsers,
        props: true,
        meta: {
            title: "Информация по проекту"
        }
    },
    //страница для всех заданий пользователя(без указания id проекта)
    {
        path: "/AllTasks",
        name: "all-task",
        component: AllTasks,
        props: true,
        meta: {
            title: "Задания"
        }
    },
    //страница для заданий пользователя(с указанием id проекта)
    {
        path: "/helloTasks/:id",
        name: "project-details",
        component: helloTasks,
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