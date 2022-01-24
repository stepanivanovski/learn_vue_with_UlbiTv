<template lang="">
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/store')" style="margin: 0px">Store</my-button> 
      <my-button @click="$router.push('/posts')" style="margin: 0px">Посты</my-button> 
      <my-button @click="$router.push('/about')" style="margin: 0px 20px;">О приложении</my-button> 
    </div>
  </div>
</template>
<script>
  export default {
    
  }
</script>
<style>
  .navbar {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    background-color: gray;
    box-shadow: 2px 2px 4px gray
  }
</style>