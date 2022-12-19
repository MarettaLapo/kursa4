//добавление заданий для пользователей
//запросы: exports.createTask(post), findUsersInProject(для списка пользователей в проекте)
//наверное надо сделать что сначала есть пустое поле для ввода 
//в конце простая ссылка типа перейти к проекту /ProjectInfo/:id(id этого проекта)
<template>
  <div class="col-sm-5 col-md-5 container" v-if="displayContent">
      <h4 class="mt-5">Добавить задачи</h4>
      <form @submit="createTask">
        <div class="row">
          <input type="text" name="task" id="task" class="col-1 mt-2 form-control" placeholder="Задача" required v-model="task.name">
          <select class="col mt-2 mx-1 btn btn-warning form-select" v-model="task.user">
            <option v-for="(username, index) in currentUsers" :key="index" :value="username.id">
              {{username.username}}
            </option>  
          </select>
          <input type="submit" class="col-2 mt-2 btn btn-dark col" value="Добавить">
        </div>
      </form>
      <h4 class="mt-2">Задачи пользователей</h4>
      <ul class="list-group">
            <li class="list-group-item" v-for="(user, index) in usersProject" :key="index">
                    {{user.username}}   
              <ul class="list-group">
                  <div v-for="(task, index) in tasksProject" :key="index">
                  <li class="list-group-item" v-if="user.user_id===task.user_id">
                          {{task.task_name}}
                  </li>
                  </div>
              </ul>
            </li>
            <button @click="$router.push('/ProjectInfo/' + this.currentProject);" class="mt-2 btn btn-success">Создать проект</button>
        </ul>
  </div>
  <div class="container mt-5" v-else>
    <div class="row justify-content-md-center"><h4 class="col col-lg-5">Контент доступен только авторизованным пользователям</h4></div>
  </div>
</template>
<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
    name: "addTasksForProject",
    data() {
        return {
            currentUsers: [],
            usersProject: [],
            tasksProject: [],
            task:{
              name: "",
              user: "",
            },
            displayContent: false,
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
        findUsersInProject(){
            http
                  .get("/findUsersInProject/projectId=" + this.currentProject)
                  .then(response => {
                      this.currentUsers = response.data;
                      this.task.user = response.data[0].id;
                  })
                  .catch(e => {
                      console.log(e);
                  });
        },
        createTask(e){
          e.preventDefault();
          var data = {
            name: this.task.name,
            user_id: this.task.user,
            project_id: this.currentProject,
          };
          http
                  .post("/createTask", data)
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(e => {
                      console.log(e);
                  })
        },
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
        this.findUsersInProject();
        this.findTasksForAllUsers();
        this.findUsersWithTasks();
    } 
}
</script>