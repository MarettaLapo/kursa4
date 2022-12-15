//все задания для всех проектов
//запросы: exports.findAllTaskForAllProjects
//список названий проектов и их задач(запрос -> exports.findAllTaskForAllProjects)
//каждая строка это ссылка(если название проекта на нужное /ProjectInfo)(если задача, то на /ProjectTasks)
//для каждой задачи отображать кнопки для отметки сделанного(запрос -> task.updateTask)
<template>
  <div class="row">
      <div class="col-sm-5">
        <h4>,</h4>
          <h4>Мои задачи</h4>
          <ul class="list-group">
              <li class="list-group-item" v-for="(project, index) in userProjects" :key="index">
                <router-link :to="{
                          name: 'project-details', //берется из router.js
                          params: { id: project.project_id }
                      }">
                      {{project.project_name}}
                </router-link>    
                <ul class="list-group">
                    <div v-for="(task, index) in taskProjects" :key="index">
                    <li class="list-group-item" v-if="project.project_id===task.project_id">
                        <router-link :to="{
                          name: 'project-tasks', //берется из router.js
                          params: { id: project.project_id }
                        }">
                            {{task.task_name}}
                        </router-link>
                        <div v-if="task.is_done === 0">
                            <button @click="updateTask(task.task_id)" class="mx-auto btn btn-dark">Сделано</button>
                        </div>
                    </li>
                    </div>
                </ul>
              </li>
          </ul>
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
              userProjects: [],
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
          this.findAllTaskForAllProjects();
          this.findAllProjects();
      }
  }
</script>