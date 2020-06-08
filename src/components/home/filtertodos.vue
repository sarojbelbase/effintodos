<template>
  <div class="filtertodos container is-fluid">
    <div class="is-pulled-right">
      <span class="title is-size-5 normals">Filter</span>
      <select @change="filter_todos($event)" class="selector">
        <option value="all">All</option>
        <option value="is-completed">Completed</option>
        <option value="is-not-completed">Incomplete</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "filtertodos",
  methods: mapActions(["filter_todos"])
};
</script>