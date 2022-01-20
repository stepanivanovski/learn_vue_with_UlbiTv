<template>
  <form class="form" v-on:submit.prevent="createPost">
    <h4>Название поста</h4>
    <my-input  
      v-bind:value="post.title"
      v-on:input="post.title = $event.target.value" 
      placeholder="Название"
    />
    <my-input 
      v-bind:value="post.body" 
      v-on:input="post.body = $event.target.value" 
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