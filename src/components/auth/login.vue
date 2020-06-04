<template>
  <div class="loginpage">
    <section class="hero columns is-vcentered is-fullheight">
      <div class="hero-body card has-text-centered has-background-white-bis">
        <div class="login is-vcentered">
          <div class="title">
            <p class="title is-3">Welcome :)</p>
            <p class="subtitle is-size-6">We knew you were gonna come back.</p>
          </div>
          <form>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded" type="email" name="email" placeholder="Email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <button class="button is-block is-fullwidth is-dark is-rounded" type="submit">Login</button>
          </form>
          <br />
          <nav class="level">
            <div class="level-item has-text-centered is-uppercase has-text-dark title is-size-7">
              <div>
                <router-link :to="{name: 'signup' }">Don't have an account? Sign Up here!</router-link>
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
  name: "login",
  data() {
    return {};
  }
};
</script>

<style>
html {
  margin: 0px !important;
}
</style>