<template>
  <div class="signuppage">
    <section class="hero columns is-vcentered is-fullheight">
      <div class="hero-body card">
        <div class="card-content is-vcentered">
          <div class="title">
            <p class="title is-3">New Here?</p>
            <p class="subtitle is-size-6">Just a quick signup to get you started.</p>
          </div>
          <form @submit.prevent="signUp()">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded" type="email" placeholder="Email" v-model="email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <p class="help is-danger" v-if="feedback">{{this.feedback}}</p>
            <button class="button is-block is-fullwidth is-dark is-rounded" type="submit">Signup!</button>
          </form>
          <br />
          <nav class="level">
            <div class="level-item has-text-centered is-uppercase has-text-dark title is-size-7">
              <div>
                <router-link :to="{name: 'login' }">Already have an account? Signin from here.</router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "signup",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    signUp() {
      if (this.username && this.email && this.password) {
        this.username = slugify(this.username, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.username);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This username is already taken.";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  username: this.username,
                  email: this.email,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "home" });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            console.log("good you are logged in");
          }
        });
      } else {
        this.feedback = "Please provide a username.";
      }
    }
  }
};
</script>

<style>
.card {
  margin-top: 1.5rem;
  border-radius: 0px;
  background: linear-gradient(45deg, #f3f3f3, #ffffff);
  box-shadow: 14px -14px 27px #303030, -14px 14px 27px #ffffff;
}
</style>