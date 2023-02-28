<template>
    <NavbarDashboard />
    <div class="container my-5">
        <div class="title mb-4 text-uppercase text-center">Daftar makanan yang saya upload</div>
        <div class="row">
            <div>{{ foods }}</div>
            <div class="col-lg-3" v-for="food in foods" :key="food.id">
                <div class="card border-circle" style="width: 18rem;">
                    <img :src="'/uploads/' + food.image" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title d-flex justify-content-between">
                            <h5>{{ food.name }}</h5>
                            <span>{{ formatRupiah(food.price) }}</span>
                        </div>
                        <div class="card-info">
                            <div id="count">Tersedia : {{ food.count }}</div>
                            <div id="place">Tempat : {{ food.place }}</div>
                        </div>
                        <p class="card-text">{{ food.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import NavbarDashboard from '../components/NavbarDashboard.vue'
    import { useRoute } from 'vue-router'
    import { onMounted, ref } from "vue";
    import axios from "axios";
    export default {
        name: 'Home',
        components: {
            NavbarDashboard
        },
        setup(){
            let foods = ref([]);
            const route = useRoute()
            const formatRupiah = (value) => {
                let val = (value/1).toFixed(0).replace('.', ',')
                return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            return {
                foods,
                formatRupiah,
                route
            }
        },
        mounted() {
            console.log(this.$cookies.get("token"))
                axios.get('http://localhost:8000/foods/me/', {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get("token")}`
                    }
                })
                .then((response) => {
                    foods.value = response.data.data
                    console.log(foods)
                })
                .catch(error => {
                    console.log(error.response);
            })        
        },
        methods: {
            async logout() {
                await axios.delete('http://localhost:8000/users/logout')
                .then(response => {
                    // use toast and refresh page
                    // console.log(response)
                    this.$cookies.remove('token')
                    this.$router.push({ name: 'Home' })
                    // localStorage.removeItem('token')
                    // this.$router.push({ name: 'Login' })
                })
                .catch(error => {
                    this.toast.error(error.response.data.message);
                    console.log(error)
                })
            }
        }
    }
</script>