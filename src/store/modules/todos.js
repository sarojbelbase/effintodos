import firebase from "firebase";
import db from "@/firebase/init";

const state = {
    todos: []
};

const getters = {
    all_todos: state => state.todos
};

const actions = {

    async fetch_todos({ commit }) {
        const user = firebase.auth().currentUser;
        const ref = await db.collection("todos").orderBy("added_on", "asc").where('user_id', '==', user.uid)
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().map(change => {
                if (change.type == 'added') {
                    commit('set_todos', change.doc);
                }
            })
        })
    },

    async add_todo({ commit }, title) {
        const user = firebase.auth().currentUser;
        const ref = await db.collection("todos")
        const response = ref.add({
            is_completed: false,
            to_be_done: title,
            user_id: user.uid,
            added_on: Date.now()
        })
        commit('new_todo', response);
    },

    async delete_todo({ commit }, id) {
        await db.collection("todos").doc(id).delete()
        commit('remove_todo', id);
    },

    async update_todo({ commit }, clicked_item) {
        const response = db.collection("todos").doc(clicked_item.id)
            .update({ is_completed: clicked_item.is_completed })
        commit('clicked_todo', response)
    },

    async filter_todos({ commit }, e) {
        const user = firebase.auth().currentUser;
        const option = e.target.options[e.target.options.selectedIndex].value;

        if (option == "is-completed") {
            db.collection("todos").orderBy("added_on", "asc")
                .where('user_id', '==', user.uid).where("is_completed", "==", true)
                .onSnapshot(snapshot => {
                    snapshot.docChanges().map(change => {
                        commit('filtered_todos', change.doc);
                    })
                })
        }
        else if (option == "is-not-completed") {
            db.collection("todos").orderBy("added_on", "asc")
                .where('user_id', '==', user.uid).where("is_completed", "==", false)
                .onSnapshot(snapshot => {
                    snapshot.docChanges().map(change => {
                        commit('filtered_todos', change.doc);
                    })
                })
        }
        else if (option == "all") {
            db.collection("todos").orderBy("added_on", "asc")
                .where('user_id', '==', user.uid).onSnapshot(snapshot => {
                    snapshot.docChanges().map(change => {
                        commit('filtered_todos', change.doc);
                    })
                })
        }
    }
};

const mutations = {
    set_todos: (state, todos) => state.todos.unshift({
        to_be_done: todos.data().to_be_done,
        is_completed: todos.data().is_completed,
        id: todos.id
    }),
    filtered_todos: (state, todos) => {
        state.todos.splice(0, state.todos.length)
        state.todos.unshift({
            to_be_done: todos.data().to_be_done,
            is_completed: todos.data().is_completed,
            id: todos.id
        })
    },
    new_todo: (state, todo) => state.todos,
    remove_todo: (state, id) => {
        state.todos = state.todos.filter(todo => todo.id !== id)
    },
    clicked_todo: (state, clickedtodo) => {
        const index = state.todos.findIndex(todo => todo.id == clickedtodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, clickedtodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};