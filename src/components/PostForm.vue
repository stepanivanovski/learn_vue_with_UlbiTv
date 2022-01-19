<template>
  <form class="form" v-on:submit.prevent="createPost">
    <h4>Название поста</h4>
    <input 
      v-bind:value="post.title"
      v-on:input="post.title = $event.target.value" 
      class="input" 
      type="text" 
      placeholder="Название"
    >
    <input 
      v-bind:value="post.body" 
      v-on:input="post.body = $event.target.value" 
      class="input" 
      type="text" 
      placeholder="Описание"
    >
    <Button :content="'content'"/>
  </form>
</template>

<script>
import Button from './UI/Button.vue';

export default {
  components: {
    Button
  },
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
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top:15px;
  }
</style>