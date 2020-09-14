<template>
  <div class="detail detail-2" :class="{ show: display === true }">
    <h2>Works</h2>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="ui">
      <nuxt-link class="close" to="/">Close</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageWorks',
  computed: {
    display() {
      return this.$store.getters['page/pageId'] === 'works'
    },
  },
})
</script>

<style scoped lang="scss" src="./detail.scss"></style>
