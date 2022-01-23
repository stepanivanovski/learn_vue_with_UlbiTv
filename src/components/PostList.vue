<template>
  <div v-if="posts.length > 0">
    <transition-group name="list" tag="p">
      <post-item 
        class="post" 
        v-for="post in posts" 
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"/>
    </transition-group> 
  </div>
  <h2 v-else style="color:red">
    Список пользователей пуст
  </h2>
</template>

<script>
import PostItem from './PostItem.vue'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style>
  .post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid teal
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.4s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(130px);
  }
</style>