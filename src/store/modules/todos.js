import firebase from "firebase";
import db from "@/firebase/init";

const state = {
    todos: [],
    filter: 'all'
};

const getters = {
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
        return state.todos
    }
}

const actions = {

    async fetch_todos({ commit }) {
        const user = firebase.auth().currentUser;
        await db.collection("todos").orderBy("added_on", "asc").
            where('user_id', '==', user.uid).onSnapshot(snapshot => {
                snapshot.docChanges().map(change => {

                    if (change.type === 'added') {
                        commit('set_todos', change.doc);
                    }

                    if (change.type === 'removed') {
                        commit('remove_todo', change.doc.id)
                    }
                })
            })
    },

    async add_todo({ commit }, title) {
        const user = firebase.auth().currentUser;
        const response = await db.collection("todos").add({
            is_completed: false,
            to_be_done: title,
            user_id: user.uid,
            added_on: Date.now()
        })
        commit('set_todos', response);
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
    },

    update_filter({ commit }, filter) {
        commit('filtered_todos', filter)
    },
};

const mutations = {
    update_filter: (state, filter) => state.filter = filter,

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