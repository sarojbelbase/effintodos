<template>
  <div class="todoist container is-fluid">
    <div>
      <addtodo />
    </div>
    <div class="legend is-size-5">
      <span>Double click to mark it completed</span>
      <span>
        <span class="incomplete-box"></span> Incomplete
      </span>
      <span>
        <span class="complete-box"></span> Completed
      </span>
    </div>
    <div class="todos">
      <div
        v-for="todo in all_todos"
        :key="todo.id"
        @dblclick="on_double_click(todo)"
        :class="{'is-complete': todo.is_completed}"
        class="todo noselect has-text-weight-semibold is-size-6"
      >
        {{ todo.to_be_done }}
        <i @click="delete_todo(todo.id)" class="fas fa-trash"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addtodo from "@/components/home/addtodo";

export default {
  name: "todos",
  components: { addtodo },
  computed: mapGetters(["all_todos"]),
  methods: {
    ...mapActions(["fetch_todos", "delete_todo", "update_todo"]),
    on_double_click(todo) {
      const double_clicked_todo = {
        id: todo.id,
        to_be_done: todo.to_be_done,
        is_completed: !todo.is_completed
      };
      this.update_todo(double_clicked_todo);
      todo.is_completed = !todo.is_completed;
    }
  },
  created() {
    this.fetch_todos();
  }
};
</script>

<style>
</style>