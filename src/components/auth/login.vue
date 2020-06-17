<template>
  <div class="loginpage">
    <section class="hero columns is-vcentered is-fullheight">
      <div class="hero-body card">
        <div class="card-content is-vcentered">
          <div class="title">
            <p class="title is-3">Welcome :)</p>
            <p class="subtitle is-size-6 has-text-weight-semibold">We knew you were gonna come back.</p>
          </div>
          <form @submit.prevent="login()">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded auths"
                  type="email"
                  name="email"
                  placeholder="Email"
                  v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-rounded auths"
                  type="password"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <p class="help is-size-6 is-danger" v-if="feedback">{{this.feedback}}</p>
            <button
              :class="loading ? 'button is-block is-fullwidth is-dark is-rounded is-loading' : 'button is-block is-fullwidth is-dark is-rounded'"
              type="submit"
            >Login</button>
          </form>
          <br />
          <nav class="level">
            <div class="level-item has-text-centered is-uppercase has-text-dark title is-size-6">
              <div>
                <router-link :to="{name: 'signup' }">Don't have an account? Sign Up here!</router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import db from "@/firebase";
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      loading: false
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.loading = true;
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.loading = false;
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            this.feedback = err.message;
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.feedback = "Please enter email & password.";
      }
    }
  }
};
</script>

<style>
</style>