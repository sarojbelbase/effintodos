<template>
  <div class="addtodo container is-fluid">
    <div class="title">
      <h3>Add Todo</h3>
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
export default {
  name: "AddTodo",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo(this.title);
    }
  }
};
</script>

<style>
</style>