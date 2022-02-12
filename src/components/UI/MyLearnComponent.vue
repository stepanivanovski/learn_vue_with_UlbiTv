<template lang="">
  <div>
    <div>
      Hello 
    </div>
    <my-button @click="proba($event)">
      Проба
    </my-button>
  </div>
  
</template>
<script>
export default {
  props: {tent: String, key: Number}
  ,
  methods: {
    proba(ev) {
      console.log(ev);
    }
  }
}
</script>
<style lang="">
  
</style>