<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
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