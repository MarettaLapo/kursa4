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
                  <button @click="addUserForProject(username.id)" class="mx-auto btn btn-dark">Добавить в проект</button>
                </div>
            </li>
        </ul>
        <h4>Пользователи в проекте</h4>
        <ul class="mt-2 list-group">
            <li class="list-group-item" v-for="(user, index) in currentUsers" :key="index">
                <div class="d-grid gap-2 d-md-flex">
                  <div class="my-auto mx-5">{{user.username}}</div>
                </div>
            </li>
        </ul>
        <button @click="goto()" class="mx-auto btn btn-dark">Добавить задачи</button>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addUsersForProject",
        data() {
            return {
                username: "",
                users: [],
                currentUsers: [],
            };
        },
        computed: {
            currentProject() {
                return this.$route.params.id;
            },
            currentUser() {
              return this.$store.state.auth.user;
          }
        },
        methods: {
            findByUsername(e) {
                e.preventDefault();
                  http
                      .get("/username/userId="+ this.currentUser.id + "&usernameh=" + this.username)
                      .then(response => {
                          this.users = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
            },
            addUserForProject(id_user){
                var data = {
                    user_id: id_user,
                    project_id: this.currentProject
                };
                http
                    .post("/addUserForProject", data)
                    .then(() => { // запрос выполнился успешно
                        window.location.reload();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            findUsersInProject(){
                http
                      .get("/findUsersInProject/projectId=" + this.currentProject)
                      .then(response => {
                          this.currentUsers = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
            },
            goto(){
                this.$router.push('/AddTasksForProject/' + this.currentProject);
            }
        },
        mounted() {
            this.findUsersInProject();
        } 
    }
</script>