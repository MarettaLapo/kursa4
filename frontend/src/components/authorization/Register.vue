<template>
    <div class="col-md-3 mx-auto">
        <div>
            <h4>.</h4>
            <h4>Регистрация пользователя</h4>
            <form name="form" @submit="handleRegister">
                <div v-if="!successful">
                    <div class="form-group">
                        <input type="text" class="item form-control" name="username" placeholder="Логин" v-model="user.username" required/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="item mt-2 form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
                    </div>
                    <div class="form-group">
                        <button class="item mt-2 btn btn-dark">Зарегистрировать</button>
                    </div>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterUser',
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                },
                successful: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleRegister(e) {
                e.preventDefault();
                this.message = '';

                this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                    .then( data => {
                        this.message = data.message;
                        this.successful = true;
                    })
                    .catch(e => {
                            this.message = e.response.data.message;
                        }
                    );

            }
        }
    };
</script>