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
      <post-form @create="createPost" />
    </my-dialog>
    <button @click="changeAge">
      увеличить возраст
    </button>
    <div>
      {{ user.age }}
    </div>
    <div v-if="error">
      Ошибка
    </div>
    <div v-else-if="loading">
      Загрузка...
    </div>    
    <div v-else>
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
      />
    </div>
  </div>
  <div 
    v-intersection="{ loadMorePosts, page, totalPages }" 
    class="observer" 
    v-if="page < totalPages"
  />
</template>
<script setup>
  import {ref, reactive} from 'vue'
  // import { isProxy, isRef, isReactive, toRef, toRefs, unref, readonly } from 'vue'
  import PostList from '@/components/PostList.vue' 
  import PostForm from '@/components/PostForm.vue'
  import usePosts from '@/hooks/usePosts'
  import useSortedPosts from '@/hooks/useSortedPosts'
  import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
  
  const user = reactive({name:'Stepa', age: 22})
  const changeAge = () => {
    console.log( );
    user.age++
  }
  const sortOptions = [
    { value: 'title', name: 'По названию'},
    { value: 'body', name: 'По содержимому'}
  ]
  const dialogVisible = ref(false)

  const {
    posts, 
    totalPages, 
    loading, 
    error, 
    page, 
    createPost, 
    removePost
  } = usePosts({limit:10, dialogVisible});
  
  const {selectedSort, sortedPosts} = useSortedPosts(posts)
  const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
  
  const showDialog = () => { dialogVisible.value = true }
</script>


// <script>  
//   import MyLearnComponent  from '@/components/UI/MyLearnComponent'
//   import PostList from '@/components/PostList.vue' 
//   import PostForm from '@/components/PostForm.vue'
//   import usePosts from '@/hooks/usePosts'
//   import useSortedPosts from '@/hooks/useSortedPosts'
//   import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
//   import {ref} from 'vue'


  // export default {
  //   components: {
  //     PostList, PostForm, MyLearnComponent
  //   },
  //   setup() {
  //     const sortOptions = [
  //       { value: 'title', name: 'По названию'},
  //       { value: 'body', name: 'По содержимому'}
  //     ]
  //     const dialogVisible = ref(false)

  //     const {
  //       posts, 
  //       totalPages, 
  //       loading, 
  //       error, 
  //       page, 
  //       createPost, 
  //       removePost
  //     } = usePosts({limit:10, dialogVisible});
      
  //     const {selectedSort, sortedPosts} = useSortedPosts(posts)
  //     const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
      
  //     const showDialog = () => { dialogVisible.value = true }

  //     return {
  //       posts,
  //       totalPages,
  //       loading,
  //       error,
  //       page,
  //       dialogVisible,
  //       createPost,
  //       removePost,
  //       sortOptions,
  //       showDialog,
  //       selectedSort, 
  //       sortedPosts,
  //       searchQuery, 
  //       sortedAndSearchedPosts
  //     }
  //   }
  // }  
// </script>
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