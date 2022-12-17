//задания определенного проекта для определнного пользователя(запрос -> task.findTaskForProject)
//если пользователь зашел на свои задания отображать кнопки для отметки сделанного(запрос -> task.updateTask)
//если чужие то просто список задач(без каких либо ссылок)

<template>
      <div class="col-sm-5 col-md-5 container" v-if="displayContent">
        <h4 class="mt-5">Информация</h4>
        <form @submit="updateTextTask">
            <div class="col-auto">
                <input type="text" :disabled="what()" name="name" id="name" class="form-control" placeholder="Наименование категории" required v-model="task.name">
                <textarea  name="description" :disabled="what()" id="description" class="form-control" v-model="task.description"></textarea>
                  
                <input type="checkbox" :disabled="what()" id="is_done" v-model="task.is_done" :value="task.is_done">
                  <label for="is_done">Сделано</label>
            </div>
            <div class="col-auto" v-if="what()">
              <button @click="$router.push('/ProjectInfo/' + task.project_id)" class="mx-auto btn btn-dark">Назад</button>
            </div>
            <div class="col-auto" v-else>
                <input type="submit" class="btn btn-success" value="Обновить">
            </div>
        </form>
      </div>
      <div v-else>
            Контент доступен только авторизованным пользователям
        </div>
  </template>
<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
    name: "addTasksForProject",
    data() {
        return {
            task: [],
            displayContent: false,
        };
    },
    computed: {
        currentTask() {
            return this.$route.params.id;
        },
        currentUser() {
              return this.$store.state.auth.user;
        },
    },
    methods: {
      updateTextTask(e){
          e.preventDefault();
          var data = {
            name: this.task.name,
            description: this.task.description,
            is_done: this.task.is_done, 
          };
          http
                  .post("/updateTextTask/" + this.currentTask, data)
                  .then(() => {
                    this.$router.go(-1);
                  })
                  .catch(e => {
                      console.log(e);
                  })
        },
        findTask() {
                  http
                      .get("/findTask/" + this.currentTask)
                      .then(response => {
                          this.task = response.data;
                          this.task.name = response.data[0].name;
                          this.task.description = response.data[0].description;
                          this.task.user_id = response.data[0].user_id;
                          this.task.project_id = response.data[0].project_id;
                          if(response.data[0].is_done === 1)
                              this.task.is_done = true;
                          else
                            this.task.is_done = false;
                      })
                      .catch(e => {
                          console.log(e);
                      });
          },
          what(){
            if(this.currentUser.id === this.task.user_id){
              return false;
            }
            else{
              return true;
            }
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
      this.findTask();
    } 
}
</script>