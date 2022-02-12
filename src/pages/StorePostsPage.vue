<template>
  <div>
    <h1>Страница с постам</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value='setSearchQuery'
    />
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select 
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
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
  <div 
    v-intersection="{loadMorePosts, page, totalPages}" 
    class="observer" 
    v-if="page < totalPages"
  >
  </div>
</template>

<script> 
  import requests from '@/services/requests'
  import PostList from '@/components/PostList.vue' 
  import PostForm from '@/components/PostForm.vue'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

  export default {
    components: {
      PostList, PostForm
    },
    data() {
      return {
        dialogVisible: false,     
      }
    },
    computed: {
      ...mapState({
        posts: state => state.posts.selectedSort,
        selectedSort: state => state.posts.selectedSort,
        sortOptions: state => state.posts.sortOptions,
        searchQuery: state => state.posts.searchQuery,
        loading: state => state.posts.loading,
        error: state => state.posts.error,
        page: state => state.posts.page,
        limit: state => state.posts.limit,
        totalPages: state => state.posts.totalPages
      }),
      ...mapGetters({
        sortedPosts: 'posts/sortedPosts',
        sortedAndSearchedPosts: 'posts/sortedAndSearchedPosts'
      })
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
      ...mapMutations({
        setSearchQuery: 'posts/setSearchQuery',
        setSelectedSort: 'posts/setSelectedSort',
      }),
      ...mapActions({
        loadMorePosts:'posts/loadMorePosts',
        fetchPosts: 'posts/fetchPosts',
      }),
      createPost(post) {
        this.$store.dispatch('posts/createPost', {post})
          .then(() => {
            this.dialogVisible = false
          })
      },
      removePost(post) {
        this.$store.dispatch('posts/removePost', {post})
      },
      showDialog() {
        this.dialogVisible = true;  
      },
      // changePage(pageNumber) {
      //   this.page = pageNumber
      // },     
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