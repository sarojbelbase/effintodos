<template>
  <div class="filtertodos container is-fluid">
    <div class="is-pulled-right">
      <span class="title is-size-5 normals">Filter</span>
      <select @change="filterTodos($event)" class="selector">
        <option value="all">All</option>
        <option value="is-completed">Completed</option>
        <option value="is-not-completed">Incomplete</option>
      </select>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
// import { mapActions } from "vuex";
export default {
  name: "filtertodos",
  data() {
    return {};
  },
  // methods: mapActions(["filterTodos"]),
  methods: {
    filterTodos(e) {
      let user = firebase.auth().currentUser;
      const option = e.target.options[e.target.options.selectedIndex].value;
      let ref = db.collection("todos").where("user_id", "==", user.uid);
      if (option == "is-completed") {
        ref
          .where("is_completed", "==", true)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.todos = doc.data();
              console.log(doc.data());
            });
          });
      } else if (option == "is-not-completed") {
        ref
          .where("is_completed", "==", false)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.todos = doc.data();
              console.log(doc.data());
            });
          });
      } else if (option == "all") {
        ref.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.todos = doc.data();
            console.log(doc.data());
          });
        });
      }
    }
  }
};
</script>

<style>
</style>