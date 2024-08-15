<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: false,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <input
      type="text"
      @input="updateValue"
      :value="modelValue"
      placeholder="Введите текст"
  />
</template>

<style scoped>
</style>
