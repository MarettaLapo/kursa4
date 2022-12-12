//главная страница(кнопка добавления и список проектов пользователя)
//запросы: exports.createProject(post), exports.findAllProjectsForUser(get)
<template>
  <div class="row">
      <div class="col-sm-5">
          <h4>Мои проекты</h4>
          <ul class="list-group">
              <li class="list-group-item" v-for="(project, index) in userProjects" :key="index">
                  <router-link :to="{
                          name: 'project-details',
                          params: { id: project.id }
                      }">
                      {{project.project_name}}
                  </router-link>
              </li>
          </ul>

          <h5>Добавить новый проект</h5>
          <form @submit="createProject">
            
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
      },
      mounted() {
          this.findAllProjectsForUser();
      }
  }
</script>