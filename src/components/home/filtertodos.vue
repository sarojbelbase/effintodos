<template>
  <div class="filtertodos">
    <div class="field">
      <div class="control has-icons-left">
        <div class="select is-medium is-rounded is-dark">
          <select name="filterer" id="filter_todos" @change="filter_todos($event)" class="selector">
            <option
              v-for="(item, index) in filter_options"
              :value="item.value"
              :key="index"
            >{{item.text}}</option>
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
  data() {
    return {
      filter_options: [
        { text: "All", value: "all" },
        { text: "Active", value: "active" },
        { text: "Completed", value: "completed" }
      ]
    };
  },
  computed: mapState(["filter"]),
  methods: mapActions(["filter_todos"])
};
</script>