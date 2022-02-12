<template>
  <div>
    <h1>Страница с постам</h1>
    <!-- <my-learn-component tent="p"/> -->
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
        dialogVisible: false,
        sortOptions: [
          { value: 'title', name: 'По названию'},
          { value: 'body', name: 'По содержимому'}
        ]
      }
    },
    setup(props) {
      const {posts, totalPages, loading, error} = usePosts(10);
      const {selectedSort, sortedPosts} = useSortedPosts(posts)
      const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

      return {
        posts,
        totalPages,
        loading,
        error,
        selectedSort, 
        sortedPosts,
        earchQuery, sortedAndSearchedPostsл
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