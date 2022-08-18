<script>
import Alert from "@/components/Alert.vue";
import Button from "@/components/Button.vue";
import Loading from "@/components/Loading.vue";
import TextInput from "@/components/TextInput.vue";
import { postFormData } from "../utils";

export default {
  components: {
    Alert,
    Button,
    Loading,
    TextInput,
  },
  data() {
    return {
      question: "",
      answer: "",
      password: "",
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      this.loading = true;
      const url = import.meta.env.VITE_API_URL + "/users/question";

      try {
        const data = await postFormData(url, "GET");
        this.question = data.question;
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
    async fetchPassword() {
      this.loading = true;
      const token = this.$route.query.qs;
      const url = import.meta.env.VITE_API_URL + "/users/get-password";
      const values = {
        token,
        answer: this.answer,
        questionId: this.question.id,
      };

      try {
        const data = await postFormData(url, "POST", JSON.stringify(values));
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
      <small style="text-align: center; display: block">for</small>
      <h1 class="student-name">Nnamdi Adim</h1>
      <h1 class="student-id">219060682 (bh95dp)</h1>
      <hr />
      <Alert v-if="error" type="error" :message="error"></Alert>
      <section>
        <div v-if="password" class="user-details">
          <p>Your Password is:</p>
          <p style="font-size: 20px; font-weight: medium; margin: 16px 0">
            {{ password }}
          </p>
        </div>
        <template v-else>
          <form v-if="question" @submit.prevent="fetchPassword">
            <text-input
              v-model="answer"
              type="text"
              name="answer"
              placeholder="Your answer"
              required
            >
              {{ question.text }}
            </text-input>
            <Button label="submit" :disabled="loading">
              <template #icon>
                <Loading v-if="loading" />
              </template>
            </Button>
          </form>
        </template>
      </section>
      <nav>
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
  flex-direction: column;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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