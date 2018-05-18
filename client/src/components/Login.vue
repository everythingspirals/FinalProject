<template>
  <body class="text-center">
    <img src="../assets/logo.png">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input class="form-control" id="inputUsername" placeholder="Username" required autofocus v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
      <p class="error">{{ error }}</p>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <a class="btn btn-lg btn-primary btn-block" href="#/register">Register</a>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:1337/api/user/verify", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.data.success === false) {
            this.error = "Invalid login";
          } else {
            localStorage.setItem("username", this.username);
            location.href = "#/";
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
