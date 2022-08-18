<template>
  <div class="container">
    <main class="wrapper">
      <h1 class="title">Change Email</h1>
      <hr />
      <Alert v-if="error" type="error" :message="error"></Alert>
      <form @submit.prevent="handleSubmit">
        <text-input
          v-model="email"
          type="email"
          name="email"
          placeholder="Enter new email"
          required
        >
          New Email
        </text-input>
        <Button
          v-if="!emailValidated"
          label="submit"
          type="button"
          :disabled="submitting"
          @click="validateEmail"
        >
          <template #icon>
            <Loading v-if="submitting" />
          </template>
        </Button>
        <text-input
          v-if="emailValidated"
          v-model="answer"
          type="text"
          name="question"
          placeholder="Your answer"
        >
          {{ question }}
        </text-input>
        <Button v-if="emailValidated" label="submit" :disabled="submitting">
          <template #icon>
            <Loading v-if="submitting" />
          </template>
        </Button>
      </form>
    </main>
  </div>
</template>

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
      email: "",
      answer: "",
      question: "",
      submitting: false,
      emailValidated: false,
      error: "",
      payload: null,
    };
  },
  methods: {
    async validateEmail() {
      this.submitting = true;
      const token = localStorage.getItem("cmp_token");
      const url = import.meta.env.VITE_API_URL + "/users/validate-email";

      try {
        const data = await postFormData(
          url,
          "POST",
          JSON.stringify({ email: this.email }),
          { Authorization: "Bearer " + token }
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
      const token = localStorage.getItem("cmp_token");
      const url = import.meta.env.VITE_API_URL + "/users";
      const values = { ...this.payload, answer: this.answer };

      try {
        await postFormData(url, "PUT", JSON.stringify(values), {
          Authorization: "Bearer " + token,
        });
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

<style>
</style>