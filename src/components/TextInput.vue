<template>
  <div class="field-wrapper">
    <label :for="name">
      <slot></slot>
    </label>
    <input
      :id="name"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="valid"
      v-model="value"
    />
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: [
    "modelValue",
    "type",
    "name",
    "disabled",
    "required",
    "placeholder",
    "isValid",
  ],
  emits: ["update:modelValue"],
  computed: {
    valid() {
      return this.isValid
        ? ".field-input"
        : "field-error";
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

input {
  width: 100%;
  padding: 0.875rem;
  border: none;
  background-color: #f0eded;
  margin-top: 0.5rem;
  transition: all 300ms ease-out;
  border-radius: 0.25rem;
  font-size: 14px;
}

input:focus {
  outline: none !important;
  border: 1px solid #e9e6e6;
  background-color: transparent;
}

input:disabled {
  background-color: rgba(240, 237, 237, 0.5);
  color: rgba(0, 0, 0, 0.8);
}

input:disabled {
  background-color: rgba(#f0eded, 0.5);
  color: rgba(0, 0, 0, 0.6);
}

.field-wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* .field-error {
  border: 1px solid red;
} */
</style>