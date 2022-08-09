<script>
import Alert from "@/components/Alert.vue";
import { postFormData } from "../utils";

export default {
  components: { Alert },
  data() {
    return {
      user: {},
      loading: false,
      error: null,
    };
  },
  computed: {
    formattedUser() {
      return Object.entries(this.user).map(([key, value] = entry) => {
        if (key === "created_on") {
          (key = "date_created"),
            (value = new Date(value).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            }));
        }
        return {
          key,
          value,
        };
      });
    },
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.loading = true;
      const token = localStorage.getItem("cmp_token");
      const url = import.meta.env.VITE_API_URL + "/users";

      try {
        const data = await postFormData(url, "GET", null, {
          Authorization: "Bearer " + token,
        });
        this.user = data;
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
        <div
          v-for="entry in formattedUser"
          :key="entry.id"
          class="user-details"
        >
          <p style="text-transform: capitalize">
            <b>{{ entry.key.replace("_", " ") }}:</b>
          </p>
          <p>
            {{ entry.value }}
            <router-link v-if="entry.key === 'email'" to="/change-email"
              >change</router-link
            >
          </p>
        </div>
      </section>
      <nav v-else>
        <router-link to="/signup">Sign up</router-link>
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
  gap: 16px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.user-details p {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: calc(50% - 16px);
}

.user-details a {
  background-color: transparent;
  color: #990f3d;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.125rem;
  padding: 5px 12px;
  margin: 0;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  transition: background-color 120ms ease-out;
}

.user-details a:hover {
  background-color: #ece9e9;
}
</style>