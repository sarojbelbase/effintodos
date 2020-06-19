<template>
  <div class="todoist container is-fluid">
    <div>
      <addtodo />
    </div>
    <div class="legend is-size-5">
      <span class="boxedit">Double click to mark it completed</span>
      <span class="boxedit">
        <span class="incomplete-box"></span>
        {{ active_count }} Active Tasks
      </span>
      <span class="boxedit">
        <span class="complete-box"></span>
        {{ completed_count }} Completed Tasks
      </span>
    </div>

    <div v-if="$store.state.loading" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="todos">
      <div
        v-for="todo in filtered_todos"
        :key="todo.id"
        @mouseover="active = todo.id"
        @mouseleave="active = null"
        @dblclick="on_double_click(todo)"
        :class="{'is-complete': todo.is_completed}"
        class="todo noselect has-text-weight-semibold is-size-6"
      >
        {{ todo.to_be_done }}
        <span
          v-show="active === todo.id"
          @click="delete_todo(todo.id)"
          class="close"
        >&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addtodo from "@/components/home/addtodo";

export default {
  name: "todos",
  data() {
    return {
      active: null
    };
  },
  components: { addtodo },
  computed: mapGetters(["filtered_todos", "completed_count", "active_count"]),
  methods: {
    ...mapActions(["fetch_todos", "delete_todo", "update_todo"]),
    on_double_click(todo) {
      this.update_todo(todo);
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