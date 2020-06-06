<template>
  <div class="filtertodos container is-fluid">
    <div class="is-pulled-right">
      <span class="title is-size-5 normals">Filter</span>
      <select @change="filterTodos($event)" class="selector">
        <option value="200">200</option>
        <option value="100">100</option>
        <option value="50">50</option>
        <option value="20">20</option>
        <option value="10">10</option>
        <option value="5">5</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "filtertodos",
  methods: mapActions(["filterTodos"]),
  data() {
    return {};
  }
};
</script>

<style>
</style>