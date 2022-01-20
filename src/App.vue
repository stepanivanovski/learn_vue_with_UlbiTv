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
  import PostList from './components/PostList.vue' 
  import PostForm from './components/PostForm.vue'

  export default {
    components: {
      PostList, PostForm
    },
    data() {
      return {
        posts: [
          {id: 1, title: 'JavaScript1', body: 'Описание поста'},
          {id: 2, title: 'JavaScript2', body: 'Описание поста'},
          {id: 3, title: 'JavaScript3', body: 'Описание поста'}
        ],
        dialogVisible: false
      }
    },
    methods: {
      createPost(post) {       
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(item => item !== post)
      },
      showDialog() {
        this.dialogVisible = true;  
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
