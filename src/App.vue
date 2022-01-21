<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      @click="showDialog"
    >
      Создать пост
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list 
      :posts="posts"
      @remove="removePost"/>
  </div>
</template>

<script> 
  import requests from './services/requests'
  import PostList from './components/PostList.vue' 
  import PostForm from './components/PostForm.vue'

  export default {
    components: {
      PostList, PostForm
    },
    data() {
      return {
        posts: [],
        dialogVisible: false
      }
    },
    methods: {
      createPost(post) {       
        this.posts.push(post);
        requests.post("/posts", post)
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(item => item !== post)
        requests.delete(`/posts/${post.id}`)
      },
      showDialog() {
        this.dialogVisible = true;  
      },
      async fetchPost(url) {
        try {
          const res = await requests.get("/posts")
          this.posts = res.data 
        } catch(e) {
          alert('Ошибка')
        }
      }
    },
    mounted() {
      this.fetchPost();
    },
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
