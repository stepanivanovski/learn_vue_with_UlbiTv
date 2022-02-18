<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style>
   .btn {
    margin-top: 15px;
    padding: 15px;
    align-self: flex-end;
    background: none;
    border: 1px solid teal;
    cursor: pointer;
  }
</style>