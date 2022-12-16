//все задания для пользователей определенного проекта
//запросы: exports.findTasksForAllUsers
//выводится список всех заданий для всех пользователей (запрос -> exports.findTasksForAllUsers)
//каждый из них ведет на нужный /ProjectTasks(только задания)
//по факту это двухуровневый список
<template>
  <div class="row">
      <div class="col-sm-5">
        <h4>,</h4>
          <h4>Информация</h4>
          <ul class="list-group">
              <li class="list-group-item" v-for="(user, index) in usersProject" :key="index">
                      {{user.username}}   
                <ul class="list-group">
                    <div v-for="(task, index) in tasksProject" :key="index">
                    <li class="list-group-item" v-if="user.user_id===task.user_id">
                            {{task.task_name}}
                        <div v-if="currentUser.id === user.user_id && task.is_done === 0">
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
      name: "ProjectInfo",
      data() {
          return {
              tasksProject: [],
              usersProject:[],
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
          
    },
      mounted() {
        this.findTasksForAllUsers();
        this.findUsersWithTasks();
      }
  }
</script>