<template>
  <div class="post-item">
    <div>
      <div><strong>Название:</strong>{{post.title}}</div>
      <div><strong>Описание:</strong>{{post.body}}</div>
    </div>
    <my-button>
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
    },
    methods: {
      deletePost() {
        this.$emit('deletePost', this.post)
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