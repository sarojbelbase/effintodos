<template>
  <div class="addtodo container is-fluid">
    <div class="title is-flex">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h3
              class="callname"
            >Hello {{this.username}}, hope you not letting grass grow under your feet!</h3>
          </div>
        </div>
        <div class="level-left">
          <div class="level-item">
            <h3 class="callname ml-3">
              <a @click="logout" class="link">Logout</a>
            </h3>
          </div>
        </div>
      </nav>
    </div>

    <div class="columns is-vcentered interactive is-desktop is-multiline">
      <div class="column is-four-fifths is-full-mobile">
        <div class="add">
          <form @submit="onSubmit" class="columns is-vcentered is-mobile">
            <input
              type="text"
              class="writer column is-four-fifths"
              v-model="title"
              placeholder="Add Tasks ..."
            />
            <input type="submit" class="submitter column" value="Add Todo" />
          </form>
        </div>
      </div>
      <div class="column is-one-fifth is-full-mobile">
        <filtertodos />
      </div>
    </div>
  </div>
</template>

<script>
import filtertodos from "@/components/home/filtertodos";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";
import db from "@/firebase";

export default {
  name: "addtodo",
  components: {
    filtertodos
  },
  data() {
    return {
      title: "",
      username: null
    };
  },
  methods: {
    ...mapActions(["add_todo"]),
    onSubmit(e) {
      e.preventDefault();
      this.add_todo(this.title);
      this.title = null;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "about" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.username = user.displayName;
    });
  }
};
</script>

<style>
</style>