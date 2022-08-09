<template>
  <div :class="classes">
    <small>{{ message }}</small>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "error",
      validator: function (value) {
        return ["error", "success"].includes(value);
      },
    },
  },
  computed: {
    classes() {
      return {
        "alert error": this.type === "error",
        "alert success": this.type === "success",
      };
    },
  },
};
</script>

<style>
.alert {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.error {
  color: #990f3d;
  background-color: rgba(255, 0, 0, 0.1);
}

.success {
  color: #0b7510;
  background-color: rgba(0, 255, 13, 0.1);
}
</style>