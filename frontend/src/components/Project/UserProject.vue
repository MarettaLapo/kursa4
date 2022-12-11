<template>
    <div>
        <h4>Проекты</h4>
        <!-- Определение ссылок -->
        <!-- <router-link class="item" to="/addProject">Добавить проект</router-link> -->
        <ul>
            
        </ul>
    </div>
</template>

<!-- <script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListProject", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                users: []
            };
        },
        methods: { // методы компонента
            getUsers() {
                http
                    .get("/users") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.users = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getUsers();
        }
    }
</script> -->

<style>
    .item {
        margin-left: 5px;
    }
</style>