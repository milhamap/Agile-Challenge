<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h3>Login</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handlerLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <router-link :to="{name: 'Home'}" class="text-decoration-none text-dark">Back</router-link>
    </div>
</template>

<script>
    /* eslint-disable */
    import { useRoute } from 'vue-router'
    import axios from "axios";
    export default {
        name: "Login",
        components: {
            Navbar
        },
        data() {
            return {
                email: '',
                password: '',
            }
        },
        setup() {
            const route = useRoute()
            return {
                route
            }
        },
        // beforeCreate() {
        //     if (this.$cookies.isKey('token')) {
        //         this.$router.go(-1) 
        //     }
        // },
        methods: {
            async handlerLogin() {
                // const toast = useToast();
                // const route = useRoute();
                await axios.post('http://localhost:8000/users/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    console.log(response.data.token);
                    this.$cookies.set('token', response.data.token)
                    this.$router.push({ name: 'Dashboard' })
                    // console.log(respons)
                    // console.log(response.data.data.token)
                    // set cookies
                    // use toast to show message
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>