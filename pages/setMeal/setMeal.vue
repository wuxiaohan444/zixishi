<template>
  <view class="container">
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#2487FF">

    </u-tabs>
  </view>
</template>

<script>
export default {
  name: "setMeal",
  data() {
    return {
      list: [
        {
          name: '预订时长卡'
        }, {
          name: '套餐订座卡'
        }
      ],
      current: 0
    }
  },
  methods: {
    change(index) {
      this.current = index;
    }
  }
}
</script>

<style scoped>

</style>
