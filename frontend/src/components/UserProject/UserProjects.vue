//главная страница(кнопка добавления и список проектов пользователя)
//запросы: exports.createProject(post), exports.findAllProjectsForUser(get)
//на ней выводится список проектов этого пользователя(через этот запрос -> exports.findAllProjectsForUser(get))
//каждая эта строка ведет на /ProjectInfo, то есть нужен id проекта
//так как мы зарегались за пользователя его id всегда можно получить через:
//computed: {
//    currentUser() {
//        return this.$store.state.auth.user;
//    }
//},
//есть кнопка для добавления своего проекта(через этот запрос -> exports.createProject(post))
//при нажатии ведет на страницу /AddUsersForProject(для перехода использовать -> this.$router.push('/AddUsersForProject');)
//на беке смотри что надо передавать(в route и controller) 
<template>
  <div class="row" >//что-то
      <div class="col-sm-5 col-md-5 container" v-if="displayContent">
          <h5 class="mt-5">Добавить новый проект</h5>
          <form>
            <div class="d-grid gap-2 d-md-flex">
                <div class="col-md-10">
                    <input type="text" name="name" id="name" class="mt-2 form-control" placeholder="Название проекта" required v-model="project.name">
                </div>
                <button @click="createProject" class="mt-2 btn btn-dark">Добавить</button>
            </div>
          </form>
          <h5 class="mt-2">Мои проекты</h5>
          <ul class="mt-2 list-group">
              <li class="list-group-item" v-for="(project, index) in userProjects" :key="index">
                  <router-link :to="{
                          name: 'project-details', //берется из router.js
                          params: { id: project.project_id }
                      }">
                      {{project.project_name}}
                  </router-link>
              </li>
          </ul>          
      </div>
      <div v-else>
            Контент доступен только авторизованным пользователям
    </div>
  </div>
</template>

<script>
  import http from "../../http-common";
  import UserService from '../../services/user.service';
  export default {
      name: "UserProject",
      data() {
          return {
              userProjects: [],
              project: {
                name: ""
              },
              displayContent: false,
          };
      },
      computed: {
          currentUser() {
              return this.$store.state.auth.user;
          }
      },
      methods: {
            findAllProjectsForUser() {
              if (this.currentUser) {
                  http
                      .get("/projects/userId=" + this.currentUser.id)
                      .then(response => {
                          this.userProjects = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
              }
        },
        createProject(e){
            e.preventDefault();
            var data = {
                    name: this.project.name,
                    user_id: this.currentUser.id
                };
                http
                    .post("/createProject", data)
                    .then(response => { // запрос выполнился успешно
                        this.$router.push('/AddUsersForProject/' + response.data.project_id);
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
        },
    mounted() {
        UserService.getUserBoard()
                .then(() => {
                    this.displayContent = true;
                })
                .catch(e => {
                        this.content =
                            (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    }
                );
          this.findAllProjectsForUser();
    }  
  }
</script>