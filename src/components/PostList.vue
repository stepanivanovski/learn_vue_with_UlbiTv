<template>
   <div class="post" v-for="post in posts">
     <post-item :post="post"/>
  </div>
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
  }
}
</script>

<style>
  .post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid teal
  }
</style>