<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  asyncData({ store }) {
    store.commit('page/setPage', 'about')
  },
})
</script>
