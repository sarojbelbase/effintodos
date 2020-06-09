<template>
  <div class="filtertodos">
    <div class="field">
      <div class="control has-icons-left">
        <div class="select is-medium is-rounded is-dark">
          <select @change="filter_todos($event)" class="selector">
            <option class="option" value="all" selected>All</option>
            <option class="option" value="is-completed">Completed</option>
            <option class="option" value="is-not-completed">Incomplete</option>
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
import { mapActions } from "vuex";
export default {
  name: "filtertodos",
  methods: mapActions(["filter_todos"])
};
</script>