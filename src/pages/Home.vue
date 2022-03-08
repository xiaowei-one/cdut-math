<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

type TState = {
  canvas: any;
  ctx: any;
  af: any;
};
const router = useRouter();
const state: TState = reactive({
  canvas: null,
  ctx: null,
  af: null,
});

function init() {
  const numLasers = 400; // 生成圆点的数量
  state.canvas = document.getElementById("love");
  state.ctx = state.canvas.getContext("2d");
  state.canvas.width = window.innerWidth;
  state.canvas.height = window.innerHeight;
  cancelAnimationFrame(state.af); // 创建帧动画
  render(createLasers(numLasers)); // 开始生成元素
}
function createLasers(n: any) {
  const lasers = [];
  for (let i = 0; i < n; ++i) {
    lasers.push({
      x: Math.random() * state.canvas.width, // 水平方向的位置
      y:
        Math.random() * (1200 - state.canvas.height) +
        state.canvas.height, // 到达的位置
      maxY: Math.random() * (state.canvas.height - 450) + 350, // 最高消失的点的位置
      s: Math.random() * 0.5 + 0.3, // 移动的速度
      r: Math.random() * (6 - 3) + 2.5, // 生成圆点的半径
    });
  }
  return lasers;
}
function renderLaser(l: any) {
  state.ctx.beginPath();
  state.ctx.arc(l.x, l.y, l.r, 0, 2 * Math.PI, false); // 画圆
  state.ctx.fillStyle = "rgba(255, 255, 255, .3)"; // 填充圆
  state.ctx.strokeStyle = "rgba(255, 255, 255, 0)"; //填充边框颜色
  state.ctx.closePath();
  state.ctx.fill();
  state.ctx.moveTo(l.x, l); // 移动
  state.ctx.stroke();
}
function updateLaser(l: any) {
  l.y -= l.s;
  if (l.y < l.maxY) {
    l.y = state.canvas.height;
  }
}
function render(lasers: any) {
  state.ctx.fillStyle = "rgba(255, 255, 255, 0)";
  // 需要注意的地方，清空画布，不然的话会显示运动轨迹，如果背景是纯色背景的可以不写
  state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  for (let l of lasers) {
    renderLaser(l);
    updateLaser(l);
  }
  // 重复调用自身进行动画移动
  state.af = requestAnimationFrame(() => render(lasers));
}

function toCompete() {
  router.push("/base/compete");
}

function toDownload() {
  router.push("/base/download");
}

onMounted(() => {
  init();
  window.onresize = init;
});
</script>

<template>
  <div class="bg">
    <div class="imglogo">
      <img src="../assets/logo.png" />
    </div>
    <canvas id="love"></canvas>
  </div>

  <div class="index">
    <h1>数学建模官网</h1>
    <el-button class="buttons" type="primary" @click="toCompete">报名</el-button>
    <el-button class="buttons" type="primary" @click="toDownload">下载</el-button>
  </div>
</template>

<style scoped>
.bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  z-index: -1;
}

.imglogo {
  position: absolute;
  top: 2vw;
  left: 2vw;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  overflow: hidden;
}

.imglogo img {
  width: 4vw;
  height: 4vw;
}

.index {
  width: 100vw;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h1 {
  font-size: 60px;
  margin-bottom: 30px;
  color: #fff;
  font-family: cursive;
}
.buttons {
  font-size: 20px;
}
</style>
