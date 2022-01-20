<template>
  <div class="app">
   <post-form @create="createPost"/>
   <post-list 
    :posts="posts"
    @remove="removePost"/>
  </div>
</template>

<script> 
  import PostForm from './components/PostForm.vue'
  import PostList from './components/PostList.vue' 

  export default {
    components: {
      PostForm, PostList
    },
    data() {
      return {
        posts: [
          {id: 1, title: 'JavaScript1', body: 'Описание поста'},
          {id: 2, title: 'JavaScript2', body: 'Описание поста'},
          {id: 3, title: 'JavaScript3', body: 'Описание поста'}
        ]
      }
    },
    methods: {
      createPost(post) {       
        this.posts.push(post);
      },
      removePost(post) {
        this.posts = this.posts.filter(item => item !== post)
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app {
    padding: 20px;
  }
</style>
