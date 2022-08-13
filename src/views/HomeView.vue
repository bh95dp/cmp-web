<script>
import Alert from "@/components/Alert.vue";
import { postFormData } from "../utils";

export default {
  components: { Alert },
  data() {
    return {
      user: {},
      loggedIn: false,
      message: "",
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
    isLoggedIn() {
      const token = localStorage.getItem("cmp_token");
      return !!token && this.user;
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
    async handleLogout() {
      this.loading = true;
      const token = localStorage.getItem("cmp_token");
      const url = import.meta.env.VITE_API_URL + "/users/logout";

      try {
        const data = await postFormData(url, "GET", null, {
          Authorization: "Bearer " + token,
        });
        this.user = null;
        localStorage.removeItem("cmp_token");
        this.message = data.message;
      } catch (error) {
        const err = JSON.parse(error.message);
        localStorage.removeItem("cmp_token");
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
      <small style="text-align: center; display: block">for</small>
      <h1 class="student-name">Nnamdi Adim</h1>
      <h1 class="student-id">219060682 (bh95dp)</h1>
      <hr />
      <section v-if="isLoggedIn">
        <div style="display: flex; align-items: center; width: 100%">
          <h2 style="flex-grow: 1">Your Details</h2>
          <button type="button" class="logout" @click="handleLogout">
            Log out
          </button>
        </div>
        <Alert v-if="error" type="error" :message="error"></Alert>
        <Alert v-if="message" type="success" :message="message"></Alert>
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

.user-details a,
.logout {
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

.user-details a:hover,
.logout:hover {
  background-color: #ece9e9;
}

.title,
.student-name,
.student-id {
  text-align: center;
}

.title {
  font-size: 1rem;
}

.student-id {
  font-size: 1.25rem;
  font-weight: normal;
}
</style>