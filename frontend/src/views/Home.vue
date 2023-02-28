<template>
    <Navbar />
    <div class="container my-5">
        <div class="title mb-4 text-uppercase text-center">Daftar makanan di Indonesia</div>
        <div class="row">
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
    import Navbar from '../components/Navbar.vue'
    import { onMounted, ref, reactive } from "vue";
    import axios from "axios";
    export default {
        name: 'Home',
        components: {
            Navbar
        },
        setup(){
            let foods = ref([]);
            const formatRupiah = (value) => {
                let val = (value/1).toFixed(0).replace('.', ',')
                return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            onMounted(() => {
                axios.get('http://localhost:8000/foods/')
                .then((response) => {
                    foods.value = response.data.data
                    console.log(foods)
                })
                .catch(error => {
                    console.log(error.response);
                })
            });
            return {
                foods,
                formatRupiah
            }
        }
    }
</script>