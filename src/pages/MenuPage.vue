<script lang="ts" setup>
import { Reading, Download, Upload, Tickets } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const menuIndex = ref(useRoute().path);
</script>

<template>
    <el-container>
        <el-header>
            <el-menu mode="horizontal" :default-active="menuIndex" router>
                <el-menu-item index="/"
                    ><el-icon><tickets /></el-icon>首页</el-menu-item
                >
                <el-menu-item index="/base/compete"
                    ><el-icon><reading /></el-icon>竞赛报名</el-menu-item
                >
                <el-menu-item index="/base/download"
                    ><el-icon><download /></el-icon>文件下载</el-menu-item
                >
                <el-menu-item index="/base/upload"
                    ><el-icon><upload /></el-icon>文件上传</el-menu-item
                >
            </el-menu>
        </el-header>

        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped></style>
