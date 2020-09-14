<template>
  <div>
    <div>
      <h1>Sample Portfolio</h1>

      <!-- 遷移リンクのボタン -->
      <!--      <div class="link link-1">-->
      <div class="link link-1" :class="{ show: pageId === 'about' }">
        <nuxt-link class="open" to="/about">About</nuxt-link>
      </div>

      <div class="link link-2" :class="{ show: pageId === 'works' }">
        <nuxt-link class="open" to="/works">Works</nuxt-link>
      </div>

      <div class="link link-3" :class="{ show: pageId === 'contact' }">
        <nuxt-link class="open" to="/contact">Contact</nuxt-link>
      </div>

      <!-- 遷移先画面 -->
      <PageAbout />
      <PageWorks />
      <PageContact />
    </div>

    <nuxt />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import PageAbout from '~/components/PageAbout.vue'
import PageContact from '~/components/PageContact.vue'
import PageWorks from '~/components/PageWorks.vue'

export default Vue.extend({
  name: 'Page',
  components: {
    PageAbout,
    PageWorks,
    PageContact,
  },
  computed: {
    pageId() {
      return this.$store.getters['page/pageId']
    },
  },
})
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  /* ウェブフォントを指定 */
  font-family: 'Lato', sans-serif;
  font-weight: 100;

  /* 背景表示 */
  background-image: url('../assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
<style scoped lang="scss">
/* タイトル表示 */
h1 {
  font-size: calc(100vw / 10);
  text-align: center;
  margin: 0;
  padding: 40px 0 0 0;
  color: white;
}

.link {
  width: 20vw;
  height: 75px;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 2rem;

  /* トランジションの時間 */
  transition: all 0.5s;

  .open {
    color: white;
    width: 100%;
    height: 100%;

    /* モーション用の指定 */
    transition: all 0.1s;
    text-decoration: none;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*  各ボタンの位置と色 */
  &.link-1 {
    transform: translate(10vw, calc(100vh - 200px));
    background: #ad1457;
  }

  &.link-2 {
    transform: translate(40vw, calc(100vh - 200px));
    background: #6a1b9a;
  }

  &.link-3 {
    transform: translate(70vw, calc(100vh - 200px));
    background: #283593;
  }

  &.show {
    // 画面全体に広げる
    width: 100vw;
    height: 100vh;
    // 左上に移動
    transform: translate(0, 0);
    z-index: 10;

    a.open {
      // ボタンは非表示にする
      opacity: 0;
    }
  }
}
</style>
