<template>
  <div class="container">
    <main class="wrapper">
      <h1 class="title">Login</h1>
      <small>Welcome Back to Computing Masters Project</small>
      <hr />
      <section id="formWrapper">
        <Alert v-if="error" type="error" :message="error"></Alert>
        <!-- Login details -->
        <form v-if="isActive" @submit.prevent="handleLoginSubmit">
          <text-input
            v-model="identity"
            type="text"
            name="identity"
            placeholder="Email or Username"
            required
          >
            Email or Username
          </text-input>
          <text-input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          >
            Password
          </text-input>
          <Button label="submit"></Button>
        </form>
        <form v-else @submit.prevent="handleQuestionSubmit">
          <text-input
            v-model="answer"
            type="text"
            name="answer"
            placeholder="Your answer"
            required
          >
            {{ question }}
          </text-input>
          <Button label="submit"></Button>
        </form>
        <div class="footer">
          <small>
            <router-link to="/forgot-password">
              Forgot your password?
            </router-link>
          </small>
          <small>
            Don&#39;t have an account?
            <router-link to="/signup">
              <strong> Sign up here </strong>
            </router-link>
          </small>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Button from "@/components/Button.vue";
import TextInput from "@/components/TextInput.vue";
import { postFormData } from "../utils";

export default {
  components: {
    Alert,
    Button,
    TextInput,
  },
  data() {
    return {
      identity: "",
      password: "",
      answer: "",
      question: "",
      activeForm: "login",
      submitting: false,
      payload: null,
      error: null,
    };
  },
  computed: {
    isActive() {
      return this.activeForm === "login";
    },
  },
  methods: {
    async handleLoginSubmit() {
      this.submitting = true;
      const values = { identity: this.identity, password: this.password };
      const url = import.meta.env.VITE_API_URL + "/users/validate-login";

      try {
        const data = await postFormData(url, "POST", JSON.stringify(values));
        this.question = data.question.text;
        this.payload = {
          questionId: data.question.id,
          userId: String(data.userId),
        };
        this.activeForm = "question";
      } catch (error) {
        const err = JSON.parse(error.message);
        this.error = err.message;
        setTimeout(() => {
          this.error = null;
        }, 7000);
      } finally {
        this.submitting = false;
      }
    },
    async handleQuestionSubmit() {
      this.submitting = true;

      const url = import.meta.env.VITE_API_URL + "/users/login";
      const body = JSON.stringify({ ...this.payload, answer: this.answer });

      try {
        const data = await postFormData(url, "POST", body);
        window.localStorage.setItem("cmp_token", data.token);
        this.$router.push("/");
      } catch (error) {
        const err = JSON.parse(error.message);
        this.error = err.message;
        setTimeout(() => {
          this.error = null;
        }, 7000);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
