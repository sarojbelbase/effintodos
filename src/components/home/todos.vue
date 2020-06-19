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
.todoist .todos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
  margin-top: 20px;
}

.todoist .noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.todoist .todo {
  background: var(--incomplete);
  padding: 1rem;
  color: var(--notmainColor);
  text-align: center;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 2px 3px 4px #b1b1b1;
}

.todoist .close {
  position: absolute;
  font-size: 1.8em;
  font-weight: 600;
  top: 0px;
  right: 10px;
  cursor: pointer;
}

.todoist .legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.todoist .complete-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: var(--complete);
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 4px;
}

.todoist .incomplete-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: var(--incomplete);
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 4px;
}

.todoist .boxedit {
  font-size: 1.2rem;
  font-weight: 600;
}

.todoist .is-complete {
  background: var(--complete);
  color: #fff;
}

.lds-ring {
  display: block;
  position: relative;
  width: 36px;
  height: 36px;
  margin: auto;
  margin-bottom: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 3px;
  height: 28px;
  margin: 4px;
  border: 4px solid #000a1a;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000a1a transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>