<template>
  <div class="addtodo container is-fluid">
    <nav class="level is-mobile mt-3">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <router-link :to="{name: 'about'}" style="text-decoration: none;">
            <p class="title is-5">
              <img
                src="../../assets/images/list.svg"
                style="height: 20px; margin-right:4px;"
                type="image/svg"
              />
              <strong style="font-size:1.4rem;">effintodos</strong>
            </p>
          </router-link>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <i class="fa fa-user-circle mr-1"></i>
          <strong class="title is-5">
            <span>{{this.username}}</span>
          </strong>
        </p>
        <p class="level-item linkers" @click="logout">
          <i class="fas fa-sign-out-alt mr-1"></i>
          <strong class="title is-5">
            <span>Logout</span>
          </strong>
        </p>
      </div>
    </nav>

    <div class="columns is-vcentered interactive is-desktop">
      <div class="column is-four-fifths is-full-mobile">
        <div class="add">
          <form @submit="onSubmit" class="columns is-vcentered is-mobile">
            <input
              type="text"
              class="writer column is-four-fifths"
              v-model="title"
              placeholder="Add a task you want to complete..."
            />
            <input type="submit" class="submitter column" value="Add Todo" />
          </form>
        </div>
      </div>
      <div class="column is-one-fifth ml-2">
        <filtertodos class="is-hidden-touch" />
      </div>
    </div>
  </div>
</template>

<script>
import filtertodos from "@/components/home/filtertodos";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";
import db from "@/firebase";

export default {
  name: "addtodo",
  components: {
    filtertodos
  },
  data() {
    return {
      title: "",
      username: null
    };
  },
  methods: {
    ...mapActions(["add_todo"]),
    onSubmit(e) {
      e.preventDefault();
      this.add_todo(this.title);
      this.title = null;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "about" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.username = user.displayName;
    });
  }
};
</script>

<style>
.addtodo .callname {
  margin-top: 20px;
  margin-bottom: 5px;
}

.addtodo .interactive {
  margin-bottom: 10px !important;
}

.addtodo .writer {
  background: #f3f3f3;
  color: var(--darker);
  padding: 18px;
  border: none;
  border-radius: 30px 0px 0px 30px;
  font-weight: 600;
  font-size: 0.8em;
  box-shadow: 10px 4px 4px #bebebe;
}

.addtodo .submitter {
  background: var(--darker);
  color: #fff;
  padding: 18px;
  border: none;
  border-radius: 0px 30px 30px 0px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 2px 5px 6px #bebebe;
}

.addtodo .submitter:hover {
  background: var(--mainColor);
  transition: all 0.5s;
}
</style>