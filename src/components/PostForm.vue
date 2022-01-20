<template>
  <form class="form" v-on:submit.prevent="createPost">
    <h4>Название поста</h4>
    <my-input  
      v-model="post.title"
      placeholder="Название"
    />
    <my-input 
      v-model="post.body"
      placeholder="Описание"
    />
    <my-button>
      Создать
    </my-button>
  </form>
</template>

<script>
export default {

  data() {
    return {
      post: {
        title: '',
        body: '',
      },
      content: 'сшздать'
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  }
  
}
</script>

<style>
  .form {
    display: flex;
    flex-direction: column;
  }

</style>