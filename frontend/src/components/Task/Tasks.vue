//все задания для всех проектов
//запросы: exports.findAllTaskForAllProjects
//список названий проектов и их задач(запрос -> exports.findAllTaskForAllProjects)
//каждая строка это ссылка(если название проекта на нужное /ProjectInfo)(если задача, то на /ProjectTasks)
//для каждой задачи отображать кнопки для отметки сделанного(запрос -> task.updateTask)
<template>
  <div class="row">
      <div class="col-sm-5">
          <h4>Мои проекты</h4>
          <ul class="list-group">
              <li class="list-group-item" v-for="(task, index) in taskProjects" :key="index">
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
      name: "AllTasks",
      data() {
          return {
              taskProjects: [],
          };
      },
      computed: {
          currentUser() {
              return this.$store.state.auth.user;
          }
      },
      methods: {
        findAllTaskForAllProjects() {
              if (this.currentUser) {
                  http
                      .get("/allTasks/userId=" + this.currentUser.id)
                      .then(response => {
                          this.taskProjects = response.data;
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