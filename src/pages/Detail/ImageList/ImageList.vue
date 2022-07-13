<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
      <div class="imgList" v-for="(item,index) in skuImageList" :key="index"  @mouseenter="enterImg(index)" >
        <img :src="item.imgUrl" :class="{active:index==newIndex}">
      </div>
      </div>
    </div>
    <div class="swiper-button-next" @click="toRight"></div>
    <div class="swiper-button-prev" @click="toLeft"></div>
  </div>
</template>

<script>

  export default {
    name: "ImageList",
    props: ['skuImageList','newIndex'],
    data() {
      return {
        index: this.newIndex
      }
    },
    methods: {
      toRight() {
        if(this.index==this.skuImageList.length-1) {
          this.$emit("changeImg",this.index = 0)
        }else {
          this.index++
          this.$emit("changeImg",this.index)
        }
      },
      toLeft(id) {
        if(this.index==0) {
          this.index = this.skuImageList.length-1
          this.$emit("changeImg",this.index)
        }else {
          this.index--
          this.$emit("changeImg",this.index)
        }
      },
      enterImg(index) {
        this.$emit("changeImg",index)
      }
    },

  }
</script>

<style lang="less" scoped>
.imgList {
  flex: 1;
}
  .active {
    border: 2px solid #f60;
    padding: 1px;
  }
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 400px;
      height: 56px;
      display: flex;

      img {
        width: 56px;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: inline-block;
        flex-direction:row;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      display: inline-block;
      position: absolute;
      top: 402px;
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      position: absolute;
      top: 402px;
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>