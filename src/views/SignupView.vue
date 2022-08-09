<template>
  <div class="container">
    <main id="page1" class="wrapper show">
      <h1 class="title">Sign up</h1>
      <small>Please fill in this form to create an account.</small>
      <hr />
      <form
        v-if="activeForm === 'sentences'"
        @submit.prevent="handleValidateSentence"
      >
        <Alert v-if="error" type="error" :message="error"></Alert>
        <fieldset>
          <legend>
            Enter three sentences of 5 - 10 words to generate your password
          </legend>
          <text-input
            v-model="sentence1"
            type="text"
            name="sentence1"
            placeholder="First sentence"
            required
          >
            First Sentence
            <template name="error"></template>
          </text-input>
          <text-input
            v-model="sentence2"
            type="text"
            name="sentence2"
            placeholder="Second sentence"
            required
          >
            Second Sentence
          </text-input>
          <text-input
            v-model="sentence3"
            type="text"
            name="sentence3"
            placeholder="Third sentence"
            required
          >
            Third Sentence
          </text-input>
          <Button label="submit"></Button>
        </fieldset>
      </form>
      <form
        v-else-if="activeForm === 'questions'"
        @submit.prevent="handleCreateUser"
      >
        <Alert v-if="error" type="error" :message="error"></Alert>
        <fieldset>
          <legend>Choose your password</legend>
          <div
            v-for="(item, i) in passwords"
            :key="i"
            class="field-wrapper"
            style="display: flex; align-items: center"
          >
            <input
              type="radio"
              :id="item"
              v-model="password"
              :value="item"
              required
              style="width: auto; margin-top: 0; margin-right: 8px"
            />
            <label :for="item" style="text-transform: none">{{ item }}</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Security Questions</legend>
          <div class="field-wrapper">
            <text-input
              v-for="que in questions"
              :key="que.id"
              v-model="que.answer"
              type="text"
              :name="`question-${que.id}`"
              placeholder="Your Answer"
              required
            >
              {{ que.text }}
            </text-input>
          </div>
          <Button label="submit"></Button>
        </fieldset>
      </form>
      <form v-else @submit.prevent="handleValidateUser">
        <text-input
          v-for="field in fields"
          :key="field.name"
          v-model="field.value"
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :isValid="!getErrorMessage(field)"
          required
        >
          {{ field.name.replace("_", " ") }}
          <template #error>
            <small v-if="error" class="field-error">{{
              getErrorMessage(field)
            }}</small>
          </template>
        </text-input>
        <select-input
          v-model="sex"
          name="sex"
          placeholder="Select your sex"
          :options="['Male', 'Female', 'Other']"
          required
        >
          Sex
        </select-input>
        <Button label="submit"></Button>
      </form>
      <div class="footer">
        <small>
          Already have an account?
          <router-link to="/login">
            <strong> Login here </strong>
          </router-link>
        </small>
      </div>
    </main>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Button from "@/components/Button.vue";
import SelectInput from "@/components/Select.vue";
import TextInput from "@/components/TextInput.vue";
import { postFormData } from "../utils";

export default {
  components: {
    Alert,
    Button,
    TextInput,
    SelectInput,
  },
  data() {
    return {
      submitting: false,
      error: null,
      payload: null,
      passwords: [],
      questions: {},
      activeForm: "",
      sex: "",
      fields: {
        username: {
          value: "",
          name: "username",
          type: "text",
          placeholder: "Your username",
        },
        email: {
          value: "",
          name: "email",
          type: "email",
          placeholder: "Your email",
        },
        age: {
          value: "",
          name: "age",
          type: "number",
          placeholder: "Your Age",
        },
        location: {
          value: "",
          name: "location",
          type: "text",
          placeholder: "Your location",
        },
        password_reminder: {
          value: "",
          name: "password_reminder",
          type: "number",
          placeholder: "How often (in days) do you want to a new password?",
        },
      },
      sentence1: "",
      sentence2: "",
      sentence3: "",
      password: "",
    };
  },
  methods: {
    async handleValidateUser() {
      this.submitting = true;
      const values = this.getFieldValues();
      const url = import.meta.env.VITE_API_URL + "/users/validate";

      try {
        await postFormData(url, "POST", JSON.stringify(values));
        this.error = null;
        this.activeForm = "sentences";
        this.payload = { ...values };
      } catch (error) {
        const err = JSON.parse(error.message);
        this.error = err.message;
      } finally {
        this.submitting = false;
      }
    },
    async handleValidateSentence() {
      this.submitting = true;
      const values = [this.sentence1, this.sentence2, this.sentence3];
      const url = import.meta.env.VITE_API_URL + "/sentences/validate";

      try {
        const data = await postFormData(url, "POST", JSON.stringify(values));
        this.questions = data.questions;
        this.questions["answer"] = "";
        this.passwords = data.passwords;
        this.payload = {
          ...this.payload,
          sentences: values.map((value) => ({ text: value })),
        };
        this.error = null;
        this.activeForm = "questions";
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
    async handleCreateUser() {
      this.submitting = true;
      const url = import.meta.env.VITE_API_URL + "/users";
      const payload = {
        ...this.payload,
        password: this.password,
        answers: this.questions.map((que) => ({
          text: que.answer,
          questionId: que.id,
        })),
      };

      try {
        const data = await postFormData(url, "POST", JSON.stringify(payload));
        localStorage.setItem("cmp_token", data.token);
        this.$router.push("/");
      } catch (error) {
        const err = JSON.parse(error.message);
        this.error = err.message;
      } finally {
        setTimeout(() => {
          this.error = null;
        }, 7000);
        this.submitting = false;
      }
    },
    getFieldValues() {
      const values = {};
      Object.entries(this.fields).forEach((field) => {
        values[field[0]] = field[1].value;
      });
      return { ...values, sex: this.sex.toLowerCase() };
    },
    getErrorMessage(field) {
      if (this.error) {
        console.log(this.error);
        return this.error[field.name];
      }
      return;
    },
  },
};
</script>

<style scoped>
.field-error {
  color: red;
  width: 100%;
}
</style>