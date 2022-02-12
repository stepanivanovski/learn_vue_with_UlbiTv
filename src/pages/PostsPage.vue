<template>
  <div>
    <h1>Страница с постам</h1>
    <my-input
      v-model="searchQuery"
    />
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
    <div v-if="loading">Загрузка...</div>    
    <div v-if="posts">
      <post-list 
        :posts="sortedAndSearchedPosts"
        @remove="removePost"/>
    </div>
    <!-- <div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        :class="{
          'current-page': page === pageNumber 
        }" 
        class="page"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
  <div 
    v-intersection="{ loadMorePosts, page, totalPages }" 
    class="observer" 
    v-if="page < totalPages"
  >
  </div>
</template>

<script>  
  import MyLearnComponent  from '@/components/UI/MyLearnComponent'
  import requests from '@/services/requests'
  import PostList from '@/components/PostList.vue' 
  import PostForm from '@/components/PostForm.vue'

  export default {
    components: {
      PostList, PostForm, MyLearnComponent
    },
    data() {
      return {
        posts: [],
        selectedSort: '',
        dialogVisible: false,
        sortOptions: [
          { value: 'title', name: 'По названию'},
          { value: 'body', name: 'По содержимому'}
        ],
        searchQuery: '',
        loading: true,
        error: false,
        page: 1,
        limit: 3,
        totalPages: 0    
      }
    },
    computed: {
      sortedPosts() {
        return this.posts.sort((a, b) => {
          return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
        })
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
      }
    },
    watch: {
      // page() {
      //   this.fetchPost()
      // }
    },
    mounted() {
      if (!this.posts.length) {
        this.fetchPosts();
      }
    },
    methods: {
      showDialog() {
        this.dialogVisible = true;  
      }, 
      async removePost(post) {
        try {
          const response = await requests.delete(`/posts/${post.id}`)
          this.posts = this.posts.filter(item => item !== post)
        } catch(e) {
          alert('Ошибка')
        }
      }, 
      async createPost(post) {
        try {
          const response = await requests.post("/posts", post)
          this.posts.push(post);
          this.dialogVisible = false;
        }catch(e) {
          alert('Ошибка')
        }
      },
      async fetchPosts() {
        try {
          this.loading = true;
          const res = await requests.get("/posts", { 
            _page: this.page,
            _limit: this.limit
          })
          this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
          this.posts = res.data; 
        } catch(e) {
          alert('Ошибка')
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      async loadMorePosts() {
        try {
          this.page = this.page +=1;
           const res = await requests.get("/posts", { 
            _page: this.page,
            _limit: this.limit
          })
          this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
          this.posts = [...this.posts, ...res.data] 
        } catch(e) {
          alert('Ошибка')
          this.error = true;
        } finally {
          this.loading = false;
        }
      }   
    }
  }
</script>
<style scoped>
  .page {
    border: 1px solid black;
    padding: 10px;
  } 
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .current-page {
    border: 5px solid teal;
  }
  .observer {
    height: 30px;
    background: gray;
  }

</style>