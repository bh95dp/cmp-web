<template>
  <form @submit="handleSubmit">
    <text-input
      v-model="answer"
      type="text"
      name="answer"
      placeholder="Your answer"
      required
    >
      {{ question }}
    </text-input>
    <Button>Submit</Button>
  </form>
</template>

<script>
import Button from "@/components/Button.vue";
import TextInput from "@/components/TextInput.vue";

export default {
  props: {
    question: {
      type: String,
      default: "",
    },
  },
  components: {
    Button,
    TextInput,
  },
  data() {
    return {
      answer: "",
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      const url = import.meta.env.VITE_API_URL;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ answer: this.answer }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const error = await response.json();
        this.message = error.message;
      }

      this.$router.push("/home");
    },
  },
};
</script>
