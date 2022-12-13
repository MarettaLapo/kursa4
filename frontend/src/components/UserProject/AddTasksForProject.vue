//добавление заданий для пользователей
//запросы: exports.createTask(post), findUsersInProject(для списка пользователей в проекте)
//наверное надо сделать что сначала есть пустое поле для ввода 
//в конце простая ссылка типа перейти к проекту /ProjectInfo/:id(id этого проекта)
<template>
    <div id="app">
      <nav>
        <router-link class="item" to="/UserProject">Проекты</router-link>
      </nav>
    </div>
  </template>