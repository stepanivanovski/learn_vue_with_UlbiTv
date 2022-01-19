<template>
  <button class="btn">
    {{content}}
  </button>
</template>

<script>

export default {
  props: {
    content: {
      type: String,
    }
  }
}
</script>

<style>
   .btn {
    margin-top: 15px;
    padding: 15px;
    align-self: flex-end;
    background: none;
    border: 1px solid teal
  }
</style>