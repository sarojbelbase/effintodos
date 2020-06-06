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
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo noselect has-text-weight-semibold is-size-6"
        v-bind:class="{'is-complete':todo.completed}"
      >
        {{ todo.title }}
        <i @click="deleteTodo(todo.id)" class="fas fa-trash"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addtodo from "@/components/home/addtodo";
import filtertodos from "@/components/home/filtertodos";

export default {
  name: "Todos",
  components: {
    addtodo,
    filtertodos
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };
      this.updateTodo(updTodo);
    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  }
};
</script>

<style>

</style>