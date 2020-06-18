import Vuex from 'vuex';
import Vue from 'vue';
import firebase from "firebase";
import db from "@/firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    todos: [],
    filter: 'all',
    username: null,
    loading: false,
  },

  getters: {
    completed_count(state) {
      return state.todos.filter(todo => todo.is_completed).length
    },

    active_count(state) {
      return state.todos.filter(todo => !todo.is_completed).length
    },

    filtered_todos(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.is_completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.is_completed)
      }
    }
  },

  actions: {

    async add_todo({ commit }, todo) {
      const user = firebase.auth().currentUser;
      await db.collection("todos").add({
        is_completed: false,
        to_be_done: todo,
        user_id: user.uid,
        added_on: Date.now()
      }).
        then(ref => {
          commit('add_todo', {
            id: ref.id,
            to_be_done: todo,
            is_completed: false
          })
        });
    },

    async fetch_todos({ commit }) {
      commit('update_loading', true)
      const user = firebase.auth().currentUser;
      const snapshot = await db.collection("todos").
        orderBy("added_on", "asc").where('user_id', '==', user.uid).get()
      const response = snapshot.docs.map(doc => commit('set_todos', doc))
      commit('update_loading', false)
    },

    async filter_todos({ commit }, e) {
      const option = e.target.options[e.target.options.selectedIndex].value;
      commit('update_filter', option)
    },

    async delete_todo({ commit }, id) {
      await db.collection("todos").doc(id).delete()
      commit('remove_todo', id);
    },

    async update_todo({ commit }, clicked_item) {
      const response = db.collection("todos").doc(clicked_item.id).update({
        is_completed: !clicked_item.is_completed
      })
      commit('clicked_todo', response)
    },

    get_username({ commit }) {
      commit('fetch_name', firebase.auth().currentUser.displayName);
    },

  },

  mutations: {
    add_todo: (state, todo) => state.todos.unshift({
      id: todo.id,
      to_be_done: todo.to_be_done,
      is_completed: false,
    }),

    set_todos: (state, todos) => state.todos.unshift({
      to_be_done: todos.data().to_be_done,
      is_completed: todos.data().is_completed,
      id: todos.id
    }),

    remove_todo: (state, id) => {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },

    clicked_todo: (state, clickedtodo) => {
      const index = state.todos.findIndex(todo => todo.id == clickedtodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, clickedtodo);
      }
    },

    update_filter: (state, filter) => state.filter = filter,
    update_loading: (state, loading) => state.loading = loading,
    filtered_todos: (state, todos) => state.todos = todos,
    fetch_name: (state, name) => state.username = name
  }
})