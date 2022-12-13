//главная страница(кнопка добавления и список проектов пользователя)
//запросы: exports.createProject(post), exports.findAllProjectsForUser(get)
<template>
  <div class="row">
      <div class="col-sm-5">
          <h4>Мои проекты</h4>
          <ul class="list-group">
              <li class="list-group-item" v-for="(project, index) in userProjects" :key="index">
                  <router-link :to="{
                          name: 'user-projects',
                          params: { id: project.id }
                      }">
                      {{project.project_name}}
                  </router-link>
              </li>
          </ul>

          <h5>Добавить новый проект</h5>
          <form @submit="createProject">
            <input type="text" name="name" id="name" placeholder="Название проекта" required v-model="project.name">
            <input type="submit" value="Добавить">         
          </form>
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
                        this.$router.push('/AddUsersForProject');
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