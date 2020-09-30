<template>
  <div class="mylib-hello-component">{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MyLibHelloComponent',
  props: {
    message: {
      type: String,
      default: 'Hello world!',
    },
  },
});
</script>

<style lang="scss">
.mylib-hello-component {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  color: #0086e626;
}
</style>
