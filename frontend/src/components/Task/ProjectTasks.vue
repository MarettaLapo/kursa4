//задания определенного проекта для определнного пользователя(запрос -> task.findTaskForProject)
//если пользователь зашел на свои задания отображать кнопки для отметки сделанного(запрос -> task.updateTask)
//если чужие то просто список задач(без каких либо ссылок)

<template>
    <div id="app">
      <nav>
        <router-link class="item" to="/UserProject">Проекты</router-link>
      </nav>
    </div>
  </template>