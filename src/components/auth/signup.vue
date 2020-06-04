<template>
  <div class="signuppage">
    <section class="hero columns is-vcentered is-fullheight">
      <div class="hero-body card has-text-centered">
        <div class="card-content is-vcentered">
          <div class="title">
            <p class="title is-3">New Here?</p>
            <p class="subtitle is-size-6">Just a quick signup to know about you.</p>
          </div>
          <form>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded" type="email" placeholder="Name" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded" type="email" placeholder="Email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-rounded" type="password" placeholder="Password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <button class="button is-block is-fullwidth is-dark is-rounded" type="submit">Signup!</button>
          </form>
          <br />
          <nav class="level">
            <div class="level-item has-text-centered is-uppercase has-text-dark title is-size-7">
              <div>
                <router-link :to="{name: 'login' }">Already have an account? Signin from here.</router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {};
  }
};
</script>

<style>
</style>