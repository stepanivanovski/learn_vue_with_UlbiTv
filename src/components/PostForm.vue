<template>
  <form class="form" v-on:submit.prevent="createPost">
    <h4>Название поста</h4>
    <my-input 
      v-model="post.title"
      placeholder="Название"
      v-focus
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
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now().toString().slice(-4);
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
