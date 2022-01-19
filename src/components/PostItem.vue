<template>
  <div class="post-item">
    <div>
      <div><strong>Название:</strong>{{post.title}}</div>
      <div><strong>Описание:</strong>{{post.body}}</div>
    </div>
    <Button :content="'Удалить'"/>
  </div>
</template>
<script>
  import Button from './UI/Button.vue';
  
  export default {
    components: {
      Button,
    },
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