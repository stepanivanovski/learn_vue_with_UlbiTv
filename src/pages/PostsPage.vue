<template>
  <div>
    <h1>Страница с постами</h1>
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
    <div v-else-if="loading">Загрузка...</div>    
    <div v-else>
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
  <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script> 
  import requests from '@/services/requests'
  import PostList from '@/components/PostList.vue' 
  import PostForm from '@/components/PostForm.vue'

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
        searchQuery: '',
        loading: true,
        error: false,
        page: 1,
        limit: 3,
        totalPages: 0,
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
      // changePage(pageNumber) {
      //   this.page = pageNumber
      // },
      async fetchPost(url) {
        try {
          this.loading = true;
          const res = await requests.get("/posts", { 
            _page: this.page,
            _limit: this.limit
          })
          this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
          this.posts = res.data 
        } catch(e) {
          alert('Ошибка')
          this.error =  true;
        } finally {
          this.loading = false
        }
      },
       async loadMorePosts(url) {
        try {
          this.page+=1
          const res = await requests.get("/posts", { 
            _page: this.page,
            _limit: this.limit
          })
          this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
          this.posts = [...this.posts, ...res.data]; 
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
    watch: {
      // page() {
      //   this.fetchPost()
      // }
    },
    computed: {
      sortedPost() {
        return [...this.posts].sort((a, b) => {
          return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
        })
      },
      sortedAndSearchedPosts() {
        return this.sortedPost.filter(post => post.title.includes(this.searchQuery))
      }
    }
  }
</script>
<style>
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