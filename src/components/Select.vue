<template>
  <div class="my-4">
    <label :for="name">
      <slot></slot>
    </label>
    <select
      :id="name"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      v-model="value"
    >
      <option value="">Select a {{ name }}</option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        style="text-transform: capitalize"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: [
    "modelValue",
    "name",
    "disabled",
    "required",
    "placeholder",
    "isValid",
    "options",
  ],
  emits: ["update:modelValue"],
  computed: {
    valid() {
      return this.isValid
        ? "border-secondary-200"
        : "border-error-500 text-error-600";
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 1rem;
  color: 262626;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 0;
}

select {
  width: 100%;
  padding: 0.875rem;
  border: none;
  background-color: #f0eded;
  margin-top: 0.5rem;
  transition: all 300ms ease-out;
  border-radius: 0.25rem;
  font-size: 14px;
}

select:focus {
  outline: none !important;
  border: 1px solid #e9e6e6;
  background-color: transparent;
}
</style>