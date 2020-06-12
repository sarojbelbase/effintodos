<template>
  <div class="filtertodos">
    <div class="field">
      <div class="control has-icons-left">
        <div class="select is-medium is-rounded is-dark">
          <select @change="filter_todos($event)" class="selector">
            <option class="option" value="all" @click="update_filter('all')">All</option>
            <option class="option" value="active" @click="update_filter('active')">Active</option>
            <option class="option" value="completed" @click="update_filter('completed')">Completed</option>
          </select>
        </div>
        <span class="icon is-small is-left">
          <i class="fa fa-filter filter"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "filtertodos",
  computed: mapState(["filter"]),
  methods: mapActions(["filter_todos", "update_filter"])
};
</script>