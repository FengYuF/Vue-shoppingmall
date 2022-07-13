<template>
  <div>
    <!-- 下拉菜单 -->
    <type-nav></type-nav>
    <!-- 轮播图 -->
    <list-container/>  
    <recommend />
    <rank/>
    <like/>
    <floor v-for="(floor,id) in floorList" :key="id" :list="floor"/>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import Recommend from "@/pages/Home/Recommend/index";
import Like from './Like/Like.vue'
import Rank from './Rank/Rank.vue'
import Floor from './Floor/Floor.vue'
export default {
  name: "Home",
  components: {
    Recommend,
    ListContainer,
    Floor,
    Rank,
    Like
  },
  computed: {
    floorList() {
      return this.$store.state.floorList
    }
  },
  mounted() {
    this.$store.dispatch('reqGetFloorList')
  }
}
</script>


<style>
/* 轮播图 */
.list-container {
  position: relative;
  top: 37px;
}
.recommend {
  position: relative;
  top: 30px;
}
.floor {
  position: relative;
  top: 40px;
  left: 0;
}
.like {
  position: relative;
}
</style>