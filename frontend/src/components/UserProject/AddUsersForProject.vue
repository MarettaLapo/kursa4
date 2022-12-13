//страница добавления пользователей в проект
//запросы: exports.addUserForProject(post), exports.findByUsername(get)
//сначала находим пользователя через exports.findByUsername(get)(см. у неё в лекции)
//потом рядом с каждым найденным выводим кнопку типа "Добавить в проект"(с вот этим запросом -> exports.addUserForProject(post))
//route и controller инфа о том, какие данные отсылаются
//с самом низу простая ссылка на следующую страницу для добавления заданий /AddTasksForProject
<template>
    <div id="app">
      <nav>
        <router-link class="item" to="/UserProject">Проекты</router-link>
      </nav>
    </div>
  </template>