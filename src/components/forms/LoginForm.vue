<template>
  <form @submit="handleSubmit">
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
      type="text"
      name="password"
      placeholder="Password"
      required
    >
      Password
    </text-input>
    <Button>Submit</Button>
  </form>
</template>

<script>
import Button from "@/components/Button.vue";
import TextInput from "@/components/TextInput.vue";

export default {
  components: {
    Button,
    TextInput,
  },
  data() {
    return {
      identity: "",
      password: "",
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

      const data = response.json();
      this.$emit("validateIdentity", data.question);
    },
  },
};
</script>

<style>
</style>