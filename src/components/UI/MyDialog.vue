<template lang="">
  <div v-if="show" class="dialog" @click="hideDialog">
    <div class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog(event) {
      const target = event.target
      if (target.classList.contains('dialog')) {
        this.$emit('update:show', false)
      }     
    }
  }
}
</script>
<style>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(0,0,0,0.5);
}
.dialog__content {
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}   
</style>