<!-- 自定义分页器 -->
<template>
  <div class="pagination">
  <!-- 上 -->
    <button :disabled="pageNo==1" @click="pageNoAdd(pageNo)">上一页</button>
    <button v-if="startPageAndendPage.start>1" @click="$emit('pageNoInfo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startPageAndendPage.start>2">...</button>
    <!-- 中 -->
    <button v-for="(page,index) in startPageAndendPage.end" :key="index" v-show="page>=startPageAndendPage.start" @click="$emit('pageNoInfo',page)" :class="{active:pageNo==page}">{{page}}</button>
    <!-- 下 -->
    <button v-if="startPageAndendPage.end<totalPage-1">···</button>
    <button v-if="startPageAndendPage.end<totalPage" @click="$emit('pageNoInfo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="pageNoSub(pageNo)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    methods:{
        pageNoAdd(pageNo) {
            pageNo--
            this.$emit("pageNoInfo",pageNo)
        },
        pageNoSub(pageNo) {
            pageNo++
            this.$emit("pageNoInfo",pageNo)
        }
    },
    computed:{
        // 计算最后的页码
        totalPage() {
            return Math.ceil(this.total/this.pageSize)
        },
        // 计算连续页码数
        startPageAndendPage() {
            let start = 0
            let end = 0
            // 因为设置的连续页码数为5  如果总页数小于连续页码数,我们需要进行处理
            if(this.continues>this.totalPage) {
                start = 1
                end = this.totalPage
                console.log("分支1");
            }else {
                // pageNo:8 -> 6 7 8 9 10
                // 总页数大于连续页码数的分支
                start =parseInt(this.pageNo) - parseInt(this.continues/2)
                end = parseInt(this.pageNo) + parseInt(this.continues/2)
                // 上面的start可能会出现bug -> PageNo=1 ->  -1 0 1 2 3 正常的分页器都不会出现负数,所以需要改进
                if(start<1) {
                    start = 1
                    end = this.continues
                }
                // 上面的end可能会出现bug -> PageNo=31 ->  28 29 31 32 33 这样的话end超过了总页数,需要改进
                if(end > this.totalPage) {
                    start = this.totalPage - 5 + 1
                    end = this.totalPage
                }
            }
            start = parseInt(start)
            end = parseInt(end)
            return {start,end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
