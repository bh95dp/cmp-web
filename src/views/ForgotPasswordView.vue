<template>
  <div class="container">
    <main class="wrapper">
      <h1 class="title">Forgot Password</h1>
      <hr />
      <Alert v-if="error" type="error" :message="error"></Alert>
      <Alert v-if="message" type="success" :message="message"></Alert>
      <form @submit.prevent="handleSubmit">
        <text-input
          v-model="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        >
          Email
        </text-input>
        <Button
          v-if="!emailValidated"
          type="button"
          label="submit"
          @click="validateEmail"
        ></Button>
        <text-input
          v-if="emailValidated"
          v-model="answer"
          type="text"
          name="question"
          placeholder="Your answer"
        >
          {{ question }}
        </text-input>
        <Button v-if="emailValidated" label="submit"></Button>
      </form>
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
      email: "",
      answer: "",
      question: "",
      submitting: false,
      emailValidated: false,
      error: "",
      message: "",
      payload: null,
    };
  },
  methods: {
    async validateEmail() {
      this.submitting = true;
      const url = import.meta.env.VITE_API_URL + "/users/validate-user";

      try {
        const data = await postFormData(
          url,
          "POST",
          JSON.stringify({ email: this.email })
        );
        this.question = data.text;
        this.payload = { questionId: data.id, email: this.email };
        this.emailValidated = true;
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
    async handleSubmit() {
      this.submitting = true;
      const url = import.meta.env.VITE_API_URL + "/users/forgot-password";
      const values = { ...this.payload, answer: this.answer };

      try {
        const data = await postFormData(url, "POST", JSON.stringify(values));
        this.message = data.message;
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
