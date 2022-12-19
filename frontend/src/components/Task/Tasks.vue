//все задания для всех проектов
//запросы: exports.findAllTaskForAllProjects
//список названий проектов и их задач(запрос -> exports.findAllTaskForAllProjects)
//каждая строка это ссылка(если название проекта на нужное /ProjectInfo)(если задача, то на /ProjectTasks)
//для каждой задачи отображать кнопки для отметки сделанного(запрос -> task.updateTask)
<template>
    <div class="row">
        <div class="col-sm-5 col-md-5 container" v-if="displayContent">
          <h4 class="mt-5 px-2">Мои задачи</h4>
            <div class="container">
                  <ul class="mt-2 list-group">
                      <li class="col list-group-item" v-for="(project, index) in userProjects" :key="index">
                          <div class="row row-cols-auto">
                              <h6 class="mt-2 col">Проект:</h6>
                              <router-link class="col btn btn-link" :to="{
                                      name: 'project-details', //берется из router.js
                                      params: { id: project.project_id }
                                  }">
                                  {{project.project_name}}
                              </router-link>
                          </div>
                              <ul class="list-group">
                              <div v-for="(task, index) in taskProjects" :key="index">
                                  <li class="list-group-item" v-if="project.project_id === task.project_id">
                                      <div class="row">
                                          <div class="col">
                                              <router-link class="btn btn-link" style="background-color: #FFFFFF;" :to="{
                                              name: 'project-tasks', //берется из router.js
                                              params: { id: task.task_id }
                                              }">
                                                  {{task.task_name}}
                                              </router-link>
                                          </div>
                                          <div class="col-auto" v-if="task.is_done === 0">
                                              <button @click="updateTask(task.task_id)" class="btn btn-warning">Выполнить</button>
                                          </div>
                                          <div class="col-auto" v-else>
                                              <button class="btn btn-success">Выполнено</button>
                                          </div>
                                      </div>
                                  </li>
                              </div>
                          </ul>
                      </li>
                  </ul>
            </div>
        </div>
        <div class="container mt-5" v-else>
            <div class="row justify-content-md-center"><h4 class="col mt-4 col-lg-5">Контент доступен только авторизованным пользователям</h4></div>
        </div>
    </div>
  </template>

<script>
  import http from "../../http-common";
  import UserService from '../../services/user.service';
  export default {
      name: "AllTasks",
      data() {
          return {
              taskProjects: [],
              userProjects: [],
              displayContent: false,
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
        findAllProjects() {
            if (this.currentUser) {
                http
                    .get("/allProject/userId=" + this.currentUser.id)
                    .then(response => {
                        this.userProjects = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
              }
        },
        updateTask(id_task){
            if (this.currentUser) {
                var data = {
                    is_done: true,
                };
                http
                    .post("/updateTask/" + id_task, data)
                    .then(() => { // запрос выполнился успешно
                        window.location.reload();
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                }
            }    
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
          this.findAllTaskForAllProjects();
          this.findAllProjects();
      }
  }
</script>