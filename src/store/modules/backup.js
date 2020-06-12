import firebase from "firebase";
import db from "@/firebase/init";

const state = {
    loading: true,
    filter: 'all',
    todos: []
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
        } else if (state.filter == 'is-not-completed') {
            return state.todos.filter(todo => !todo.is_completed)
        } else if (state.filter == 'is-completed') {
            return state.todos.filter(todo => todo.is_completed)
        }
        return state.todos
    }
};

const actions = {

    initialize_listeners(context) {
        db.collection('todos').onSnapshot(snapshot => {
            snapshot.docChanges.forEach(change => {
                if (change.type === 'added') {
                    const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

                    if (source === 'Server') {
                        context.commit('add_todo', {
                            id: change.doc.id,
                            to_be_done: change.doc.data().to_be_done,
                            is_completed: false,
                        })
                    }
                }
                if (change.type === 'modified') {
                    context.commit('update_todo', {
                        is_completed: change.doc.data().is_completed,
                    })
                }
                if (change.type === 'removed') {
                    context.commit('delete_todo', change.doc.id)
                }
            })
        })
    },

    retrieve_todos(context) {
        context.commit('update_loading', true)
        db.collection('todos').get()
            .then(querySnapshot => {
                let temp_todos = []
                querySnapshot.forEach(doc => {
                    const data = {
                        added_on: doc.data().added_on,
                        to_be_done: doc.data().to_be_done,
                        is_completed: doc.data().is_completed,
                    }
                    temp_todos.push(data)
                })

                context.commit('update_loading', false)
                const todos_sorted = temp_todos.sort((a, b) => {
                    return a.timestamp.seconds - b.timestamp.seconds
                })

                context.commit('retrieve_todos', todos_sorted)
            })
    },
    add_todo(context, todo) {
        db.collection('todos').add({
            is_completed: false,
            to_be_done: title,
            user_id: user.uid,
            added_on: Date.now()
        })
            .then(docRef => {
                context.commit('addTodo', {
                    is_completed: false,
                    to_be_done: title
                })
            })
    },

    update_todo(context, todo) {
        db.collection('todos').doc(todo.id).set({
            completed: todo.is_completed,
        })
            .then(() => {
                context.commit('update_todo', todo)
            })
    },

    delete_todo(context, id) {
        db.collection('todos').doc(id).delete()
            .then(() => {
                context.commit('delete_todo', id)
            })
    },

    update_Filter(context, filter) {
        context.commit('update_filter', filter)
    }
};

const mutations = {

    add_todo(state, todo) {
        state.todos.unshift({
            to_be_done: todo.title,
            is_completed: false,
            added_on: new Date(),
        })
    },
    update_todo(state, todo) {
        const index = state.todos.findIndex(item => item.id == todo.id)
        state.todos.splice(index, 1, {
            'id': todo.id,
            'to_be_done': todo.to_be_done,
            'is_completed': !todo.is_completed
        })
    },
    delete_todo(state, id) {
        const index = state.todos.findIndex(item => item.id == id)
        if (index >= 0) {
            state.todos.splice(index, 1)
        }
    },
    update_filter(state, filter) {
        state.filter = filter
    },

    retrieve_todos(state, todos) {
        state.todos = todos
    },
    update_loading(state, loading) {
        state.loading = loading
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};