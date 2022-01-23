<template lang="">
  <div>
    <h2>Это страница поста с ID {{$route.params.id}}</h2>
  </div>
</template>
<script>
export default {
 mounted() {
   console.log(this.$route);
 }
}
</script>
<style>
  
</style>