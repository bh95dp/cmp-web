<template>
  <button :type="type">{{ label }}</button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "submit",
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
  border-radius: 0.25rem;
  padding: 13px 21px;
  margin: 1rem 0;
  border: none;
  cursor: pointer;
  width: 100%;
  text-transform: capitalize;
  transition: opacity 120ms ease-out;
  opacity: 0.8;
}

button:hover {
  opacity: 1;
}
</style>