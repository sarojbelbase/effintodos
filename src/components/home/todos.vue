<template>
  <div class="todoist container is-fluid">
    <addtodo />
    <filtertodos />
    <div class="legend is-size-5">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> Incomplete
      </span>
      <span>
        <span class="complete-box"></span> Complete
      </span>
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        v-for="todo in todos"
        :key="todo.id"
        class="todo noselect has-text-weight-semibold is-size-6"
        :class="{'is-complete': todo.is_completed}"
      >
        {{ todo.to_be_done }}
        <i @click="deleteTodo(todo.id)" class="fas fa-trash"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import addtodo from "@/components/home/addtodo";
import filtertodos from "@/components/home/filtertodos";
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "todos",
  components: {
    addtodo,
    filtertodos
  },
  data() {
    return {
      uid: null,
      todos: []
    };
  },
  methods: {
    deleteTodo(id) {
      db.collection("todos")
        .doc(id)
        .delete()
        .then(() => {
          this.todos = this.todos.filter(todo => {
            return todo.id != id;
          });
        });
    },
    onDblClick(item) {
      const index = this.todos.findIndex(todo => todo.id === item.id);
      const updated_item = db
        .collection("todos")
        .doc(item.id)
        .update({ is_completed: !item.is_completed });
      if (index !== -1) {
        this.todos.splice(index, 1, updated_item);
      }
    }
  },
  // methods: {
  //   ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
  //   onDblClick(todo) {
  //     const updTodo = {
  //       id: todo.id,
  //       title: todo.title,
  //       completed: !todo.completed
  //     };
  //     this.updateTodo(updTodo);
  //   }
  // },
  // computed: mapGetters(["allTodos"]),
  created() {
    // fetch todos

    let user = firebase.auth().currentUser;
    if (user) {
      this.uid = user.uid;
      let ref = db.collection("todos").where("user_id", "==", user.uid);
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added")
            this.todos.unshift({
              to_be_done: change.doc.data().to_be_done,
              is_completed: change.doc.data().is_completed,
              id: change.doc.id
            });
        });
      });
    }
  }
};
</script>

<style>
</style>