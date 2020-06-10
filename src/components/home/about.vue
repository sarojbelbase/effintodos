<template>
  <div class="aboutpage container is-fluid">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <router-link class="navbar-item" :to="{name: 'about'}">
                <img src="../../assets/images/list.svg" type="image/svg" />
              </router-link>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-two-fifths">
              <div class="middle-part">
                <p class="subtitle is-size-3 has-text-black mb-4">
                  <span class="title is-size-1 has-text-weight-bold has-text-black">Effintodos</span> helps you complete
                  <br />your
                  <span
                    class="title is-size-3 has-text-black red-shadow"
                  >tasks like they are supposed to.</span>
                  <br />
                  <strong
                    class="subtitle has-text-black"
                    style="font-size: 17px; margin-top: -20px;"
                  >
                    Let's not ruin our todos with
                    <strike class="mr-1">strikethrough</strike>and checkboxes.
                  </strong>
                </p>

                <div class="is-block">
                  <router-link :to="{name: 'signup'}">
                    <button
                      class="button is-rounded is-small"
                      style="background-color: #0b132b; color: white; font-weight: bold; text-transform: uppercase; padding:22px; border:none;"
                    >Sign Up</button>
                  </router-link>
                  <router-link :to="{name: 'login'}">
                    <button
                      class="button is-rounded is-small ml-3"
                      style="background-color: #463f3a; color: white; font-weight: bold; text-transform: uppercase; padding:23px; border:none;"
                    >Log in</button>
                  </router-link>
                  <div class="mt-6">
                    <nav class="level">
                      <div class="level-left">
                        <div class="level-item">
                          <span class="icon">
                            <a href="https://twitter.com/sidbelbase">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </span> &emsp;
                          <span class="icon">
                            <a href="https://instagram.com/sidbelbase">
                              <i class="fab fa-instagram"></i>
                            </a>
                          </span> &emsp;
                          <span class="icon">
                            <a href="https://github.com/sidbelbase">
                              <i class="fab fa-github"></i>
                            </a>
                          </span>
                          &emsp;
                          <span
                            style="text-align: left; font-size: 15px; font-weight:bold;"
                            class="has-text-dark"
                          >| Developed by sidbelbase</span>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-three-fifths">
              <img src="../../assets/images/carbon.svg" type="image/css" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  }
};
</script>

<style>
.aboutpage {
  background: url("../../assets/images/hero.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  filter: contrast(0.8);
  filter: grayscale(0.4);
}

/* .content {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  top: 10px;
  left: 0;
  position: fixed;
  margin-left: 20px;
  margin-right: 20px;
  right: 0;
  z-index: 2;
  padding: 0 10px;
} */
</style>