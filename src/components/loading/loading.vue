<template>
  <div class="loading-content" v-if="isLoading">
    <a-spin :spinning="spinning" :delay="delayTime">
      <div class="spin-content">我的描述文案是自定义的。。。</div>
    </a-spin>
  </div>
</template>
<script>
export default {
  data () {
    return {
      spinning: false,
      delayTime: 500
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
