<script>
import Alert from "@/components/Alert.vue";
import { postFormData } from "../utils";

export default {
  components: { Alert },
  data() {
    return {
      password: "",
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.fetchPassword();
  },
  methods: {
    async fetchPassword() {
      this.loading = true;
      const body = this.$router.params.token;
      const url = import.meta.env.VITE_API_URL + "/users/password";

      try {
        const data = await postFormData(url, "POST", body);
        this.password = data.password;
      } catch (error) {
        const err = JSON.parse(error.message);
        this.error = err.message;
        setTimeout(() => {
          this.error = null;
        }, 7000);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <main class="wrapper">
      <h1 class="title">Welcome to Computing Masters Project</h1>
      <hr />
      <section v-if="user">
        <h2 class="title">Your Details</h2>
        <Alert v-if="error" type="error" :message="error"></Alert>
        <div class="user-details">
          <p>Your Password is:</p>
          <p style="font-size: 32px; font-weight: medium; margin: 16px 0">
            {{ password }}
          </p>
        </div>
      </section>
      <nav v-else>
        <router-link to="/login">Login</router-link>
      </nav>
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
}

nav a {
  display: flex;
  align-items: center;
  height: 2.5rem;
  justify-content: center;
  width: 100%;
  box-shadow: 0 0 0.2rem 0px rgb(0 0 0 / 20%);
}

nav a:hover {
  background-color: #ece9e9;
}

.user-details {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>