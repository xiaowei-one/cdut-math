<script lang="ts" setup>
import { Reading, Download, Upload, Tickets } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

const state = reactive({
  dialogVisible: false,
  form: {},
});
const menuIndex = ref(useRoute().path);
</script>

<template>
  <el-container>
    <el-header class="head">
      <el-menu
        mode="horizontal"
        class="menu"
        :default-active="menuIndex"
        router
      >
        <el-menu-item index="/">
          <el-icon> <tickets /> </el-icon>首页
        </el-menu-item>
        <el-menu-item index="/base/compete">
          <el-icon> <reading /> </el-icon>竞赛报名
        </el-menu-item>
        <el-menu-item index="/base/download">
          <el-icon> <download /> </el-icon>文件下载
        </el-menu-item>
        <el-menu-item index="/base/upload">
          <el-icon> <upload /> </el-icon>文件上传
        </el-menu-item>
      </el-menu>

      <el-aside class="admin">
        <el-button plain size="small" @click="state.dialogVisible = true"
          >登录</el-button
        ></el-aside
      >
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
    <el-dialog v-model="state.dialogVisible" title="Tips" width="50%">
      <el-form ref="formRef" :model="state.form" label-width="120px">
        <el-form-item label="账号">
          <el-input v-model="state.form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="state.form.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="state.dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}

.menu {
  width: 100%;
}

.admin {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
</style>
