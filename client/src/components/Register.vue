<template>

  <body class="text-center">
    <img class="logo" src="../assets/logo.png">
    <form class="form-signin" @submit.prevent="handleSubmit">
     <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input class="form-control" id="inputUsername" placeholder="Username" required autofocus v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
      <p class="error">{{ error }}</p>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error:""
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:1337/api/user/register", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if(response.data.error){
            this.error = response.data.error.message;
          }else{
            location.href = "#/login";
          }
        })
        .catch(error => {
          this.error = "Server error";
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
