<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body,
header,
section,
footer,
div,
ul,
ol,
li,
img,
a,
span,
em,
del,
legend,
center,
strong,
var,
fieldset,
form,
label,
dl,
dt,
dd,
cite,
input,
hr,
time,
mark,
code,
figcaption,
figure,
textarea,
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  border: 0;
  padding: 0;
  font-style: normal;
}

li {
  list-style: none;
}

@font-face {
  font-family: "iconfont"; /* Project id 2954686 */
  src: url("//at.alicdn.com/t/font_2954686_95udbzi7ece.woff2?t=1637507808064")
      format("woff2"),
    url("//at.alicdn.com/t/font_2954686_95udbzi7ece.woff?t=1637507808064") format("woff"),
    url("//at.alicdn.com/t/font_2954686_95udbzi7ece.ttf?t=1637507808064")
      format("truetype");
}

:root {
  --text-color: #242424;
  --box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  --box-shadow-hover: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  --button-bg-color: #1dcad6;
}
</style>
