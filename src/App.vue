<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select 
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <div v-if="error">Ошибка</div>
    <div v-else-if="loading">Загрузка...</div>    
    <div v-else>
      <post-list 
      :posts="sortedPost"
      @remove="removePost"/>
    </div>
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
        dialogVisible: false,
        selectedSort: '',
        sortOptions: [
          { value: 'title', name: 'По названию'},
          { value: 'body', name: 'По содержимому'}
        ],
        loading: true,
        error: false,
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
          this.error =  true;
        } finally {
          this.loading = false
        }
      }
    },
    mounted() {
      this.fetchPost();
    },
    computed: {
      sortedPost() {
        return [...this.posts].sort((a, b) => {
          return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
        })
      },
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
  .app__btns {
    display: flex;
    justify-content: space-between;
  }
</style>
