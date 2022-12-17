<template>
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="mx-5">.</div><div class="mx-5">.</div>
            <div class="mx-auto"><router-link class="item navbar-brand text-light mx-2" to="/UserProjects">Проекты</router-link></div>
            
            <div class="mx-auto"><router-link class="item navbar-brand text-light mx-2" to="/Tasks">Задачи</router-link></div>
            <div class="mx-5">.</div>
            <div v-if="currentUser">
                <a href @click.prevent="logOut" class="navbar-brand text-light">
                    Выйти
                </a>
            </div>
            <div v-else>
                <router-link to="/login" class="navbar-brand text-light">
                    Войти
                </router-link>
            </div>
        </nav>
  </template>
  
  <script>
      export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>