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
  <div class="row">
      <div class="col-sm-5 col-md-5 container">
          <h4 class="mt-5">Мои проекты</h4>
          <h5>Добавить новый проект</h5>
          <form>
            <div class="d-grid gap-2 d-md-flex">
                <div class="col-md-10">
                    <input type="text" name="name" id="name" class="mt-2 form-control" placeholder="Название проекта" required v-model="project.name">
                </div>
                <router-link @click="createProject" class="mt-2 btn btn-dark" to="/AddUsersForProject">Добавить</router-link>
            </div>
          </form>

          <ul class="mt-2 list-group">
              <li class="list-group-item" v-for="(project, index) in userProjects" :key="index">
                  <router-link :to="{
                          name: 'user-projects', //берется из router.js
                          params: { id: project.id }
                      }">
                      {{project.project_name}}
                  </router-link>
              </li>
          </ul>          
      </div>
  </div>
</template>

<script>
  import http from "../../http-common";
  export default {
      name: "UserProject",
      data() {
          return {
              userProjects: [],
              project: {
                name: ""
            }
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
        createProject(){
            var data = {
                    name: this.project.name,
                    user_id: this.currentUser.id
                };
                http
                    .post("/createProject", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.go('/AddUsersForProject');
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
        },
    mounted() {
          this.findAllProjectsForUser();
    }  
  }
</script>