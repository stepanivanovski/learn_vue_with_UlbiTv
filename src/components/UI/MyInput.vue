<template lang="">
 <input class="input" :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name: 'my-input',

  props: {
    modelValue: [Number, String]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
<style>
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top:15px;
  }
</style>