//все задания для пользователей определенного проекта
//запросы: exports.findTasksForAllUsers
//выводится список всех заданий для всех пользователей (запрос -> exports.findTasksForAllUsers)
//каждый из них ведет на нужный /ProjectTasks(только задания)
//по факту это двухуровневый список
<template>
    <div id="app">
      <nav>
        <router-link class="item" to="/UserProject">Проекты</router-link>
      </nav>
    </div>
  </template>