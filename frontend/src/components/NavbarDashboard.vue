<template>
    <nav class="navbar navbar-expand-lg bg-danger">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="../assets/logo.png"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <button @click="logout" class="bg-transparent border-none">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script>
    /* eslint-disable */
    export default {
        name: 'NavbarDashboard',
        methods: {
            async logout() {
                await axios.delete('http://localhost:8000/users/logout')
                .then(response => {
                    this.$cookies.remove('token')
                    this.$router.push({ name: 'Home' })
                })
                .catch(error => {
                    this.toast.error(error.response.data.message);
                    console.log(error)
                })
            }
        }
    }
</script>