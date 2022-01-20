<template>
  <div class="post-item">
    <div>
      <div><strong>Название:</strong>{{post.title}}</div>
      <div><strong>Описание:</strong>{{post.body}}</div>
    </div>
    <my-button
      @click="$emit('remove', post)"
    >
      Удалить
    </my-button>
  </div>
</template>

<script>  
  export default { 
    props: {
      post: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style>
  .post-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>