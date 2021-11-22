<script setup lang="ts">
import { Edit } from "@element-plus/icons";
import { competeData } from "../test";
import { useRouter } from "vue-router";

const router = useRouter();

function toDetail() {
  router.push("/signDetail");
}
</script>

<template>
  <div class="index">
    <div class="title">
      <h1>最近比赛</h1>
    </div>
    <ul class="item" v-for="item in competeData" :key="item.id">
      <li>{{ item.title }}</li>
      <li>&#xe667;&nbsp;&nbsp;{{ item.date }}</li>
      <li>
        <el-button type="primary" :icon="Edit" @click="toDetail" circle size="mini" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  align-self: flex-start;
  margin: 2vw 0vw 2vw 2vw;
}
.item {
  margin: 2vw 0vw 0vw 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  font-size: 20px;
  box-shadow: var(--box-shadow);
  padding: 20px 20px;
  margin: 0 auto 20px;
  transition: all 0.3s;
  cursor: pointer;
  color: var(--text-color);
  font-family: "iconfont";
  border-radius: 5px;
}

.item:hover {
  box-shadow: var(--box-shadow-hover);
  color: var(--button-bg-color);
  transform: translate(0, 3%);
}
</style>
