//все задания для пользователей определенного проекта
//запросы: exports.findTasksForAllUsers
//выводится список всех заданий для всех пользователей (запрос -> exports.findTasksForAllUsers)
//каждый из них ведет на нужный /ProjectTasks(только задания)
//по факту это двухуровневый список
<template>
  <div class="row">
      <div class="col-sm-5 col-md-5 container" v-if="displayContent">
        <h4 class="mt-5">Информация</h4>
        <div v-if="us() === currentUser.id">
                <button @click="$router.push('/AddUsersForProject/' + this.currentProject)" class="mx-auto btn btn-dark">Добавить пользователей</button>
                <button @click="$router.push('/AddTasksForProject/' + this.currentProject)" class="mx-auto btn btn-dark">Добавить задачи</button>
            </div>
            <ul class="list-group">
              <li class="list-group-item" v-for="(user, index) in usersProject" :key="index">
                <div class="row row-cols-auto">
                    <h6 class="mt-2 col">Пользователь:</h6>
                    <div class="mt-1 col">{{user.username}}</div>
                </div>
                <div class="row">
                    <h6 class="mt-2 col">Задачи:</h6>
                    <ul class="list-group col-10">
                        <div v-for="(task, index) in tasksProject" :key="index">
                        <li class="list-group-item" v-if="user.user_id === task.user_id">
                            <div class="row">
                                <div class="mt-2 col">
                                    <router-link class="btn btn-link" style="background-color: #FFFFFF;" :to="{
                                              name: 'project-tasks', //берется из router.js
                                              params: { id: task.task_id }
                                              }">
                                                  {{task.task_name}}
                                </router-link>
                                </div>
                                <div class="col-auto" v-if="currentUser.id === user.user_id && task.is_done === 0">
                                    <button @click="updateTask(task.task_id)" class="btn btn-warning">Выполнить</button>
                                </div>
                                <div class="col-auto" v-if="currentUser.id === user.user_id && task.is_done === 1">
                                    <button class="btn btn-success">Выполнено</button>
                                </div>
                            </div>
                        </li>
                        </div>
                    </ul>
                </div>
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
      name: "ProjectInfo",
      data() {
          return {
              tasksProject: [],
              usersProject:[],
              displayContent: false,
          };
      },
      computed: {
          currentUser() {
              return this.$store.state.auth.user;
          },
          currentProject() {
              return this.$route.params.id;
          }
      },
      methods: {
        findTasksForAllUsers() {
                  http
                      .get("/findTasksForAllUsers/projectId=" + this.currentProject)
                      .then(response => {
                          this.tasksProject = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
              
          },
          findUsersWithTasks() {
                  http
                      .get("/findUsersWithTasks/projectId=" + this.currentProject)
                      .then(response => {
                          this.usersProject = response.data;
                      })
                      .catch(e => {
                          console.log(e);
                      });
            
          },
          updateTask(id_task){
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
            },   
            us(){
                for(var i in this.usersProject){
                    if(this.usersProject[i].is_admin === 1){
                        return this.usersProject[i].user_id;
                    }
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
        this.findTasksForAllUsers();
        this.findUsersWithTasks();
      }
  }
</script>