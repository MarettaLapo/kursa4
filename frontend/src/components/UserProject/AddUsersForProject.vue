//страница добавления пользователей в проект
//запросы: exports.addUserForProject(post), exports.findByUsername(get)
//сначала находим пользователя через exports.findByUsername(get)(см. у неё в лекции)
//потом рядом с каждым найденным выводим кнопку типа "Добавить в проект"(с вот этим запросом -> exports.addUserForProject(post))
//route и controller инфа о том, какие данные отсылаются
//с самом низу простая ссылка на следующую страницу для добавления заданий /AddTasksForProject
<template>
    <div class="col-sm-5 col-md-5 container">
        <h4>,</h4>
        <h4>Поиск пользователей по нику</h4>
        <form @submit="findByUsername">
          <div class="d-grid gap-2 d-md-flex">
            <div class="col-md-10">
                <input type="text" name="username" id="username" class="mt-2 form-control" placeholder="Ник" required v-model="username">
            </div>
            <input type="submit" class="mt-2 btn btn-dark" value="Поиск">
          </div>
        </form>

        <ul class="mt-2 list-group">
            <li class="list-group-item" v-for="(username, index) in users" :key="index">
                <div class="d-grid gap-2 d-md-flex">
                  <div class="my-auto mx-5">{{username.username}}</div>
                  <button @click="addUserForProject()" class="mx-auto btn btn-dark">Добавить в проект</button>
                  <!-- <input type="submit" class="mr-auto md-2 btn btn-dark" value="Добавить"> -->
                </div>
            </li>
        </ul>

        <ul class="mt-2 list-group">
          <li class="list-group-item" v-for="(elem, index) in users" :key="index">
            
          </li>
            <router-link class="item btn btn-dark" to="/AddTasksForProject">Назначить задачи</router-link>
        </ul>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addUserForProject",
        data() {
            return {
                category: {
                    name: ""
                }
            };
        },
        methods: {
          addUserForProject(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name
                };
                http
                    .post("/addCategory", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            }
        }
    }
</script>