<template>
  <view class="payType">
    <u-mask :show="show" @click="show = false" @click="close">
      <view class="warp">
        <view class="rect" @tap.stop></view>
      </view>
    </u-mask>
  </view>
</template>

<script>
export default {
  name: "payType",
  props:['show'],
  data(){
    return{
      // show:true
    }
  },
  methods:{
    close(){
      console.log(1);
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .rect {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
}
</style>
