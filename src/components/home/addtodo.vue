<template>
  <div class="addtodo container is-fluid">
    <div class="title">
      <h3
        class="callname"
      >Hello @{{this.username}}, hope you not letting grass grow under your feet!</h3>
    </div>
    <div class="add">
      <form @submit="onSubmit" class="columns">
        <input
          type="text"
          class="writer column is-four-fifths"
          v-model="title"
          placeholder="Add Todo..."
        />
        <input type="submit" class="submitter column" value="Add Todo" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      username: null
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo(this.title);
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .where("user_id", "==", user.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.username = doc.data().username;
            });
          })
          .catch(err => {
            console.log("Error, couldn't get any username.", err);
          });
      } else {
        this.username = null;
      }
    });
  }
};
</script>

<style>
</style>