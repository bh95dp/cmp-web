<template>
  <button :type="type" :disabled="disabled">
    {{ label }}
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "submit",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
button {
  background-color: #990f3d;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 13px 21px;
  justify-content: center;
  margin: 1rem 0;
  border: none;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
  text-transform: capitalize;
  transition: opacity 120ms ease-out;
  opacity: 0.8;
}

button:hover {
  opacity: 1;
}

button:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
</style>