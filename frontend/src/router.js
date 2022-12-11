import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import UserProject from "./components/Project/UserProject";
import AddProject from "./components/Project/AddProject";

// определяем маршруты
const routes = [
    {
        path: "/UserProject",
        name: "users-project",
        component: UserProject,
        meta: {
            title: "Список проектов пользователя"
        }
    },
    {
        path: "/addProject",
        name: "add-project",
        component: AddProject,
        meta: {
            title: "Добавление нового проекта"
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