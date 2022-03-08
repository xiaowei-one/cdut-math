<script lang="ts" setup>
import { Reading, Download, Upload, Tickets } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { adminLogin } from '../api/api';

interface stateType {
  dialogVisible: boolean;
  form: formType;
  loginState: boolean;
  adminName: string;
}

interface formType {
  account: string;
  password: string;
}

const state: stateType = reactive({
  dialogVisible: false,
  form: {
    account: '',
    password: '',
  },
  loginState: false,
  adminName: '',
});

const menuIndex = ref(useRoute().path);

const login = async () => {
  const formData = new FormData();
  formData.append('account', state.form.account);
  formData.append('password', state.form.password);
  const { data } = await adminLogin(formData);
  ElMessage({ message: "登陆成功", type: "success" });
  state.loginState = true;
  state.dialogVisible = false;
  state.adminName = data;
};
</script>

<template>
  <el-container>
    <el-header class="head">
      <el-menu mode="horizontal" class="menu" :default-active="menuIndex" router>
        <el-menu-item index="/">
          <el-icon>
            <tickets />
          </el-icon>首页
        </el-menu-item>
        <el-menu-item index="/base/compete">
          <el-icon>
            <reading />
          </el-icon>竞赛报名
        </el-menu-item>
        <el-menu-item index="/base/download">
          <el-icon>
            <download />
          </el-icon>文件下载
        </el-menu-item>
        <el-menu-item index="/base/upload" v-if="state.loginState">
          <el-icon>
            <upload />
          </el-icon>文件上传
        </el-menu-item>
      </el-menu>

      <el-aside class="admin">
        <div v-if="state.loginState">{{ state.adminName }}</div>
        <el-button v-else plain size="small" @click="state.dialogVisible = true">登录</el-button>
      </el-aside>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
    <el-dialog v-model="state.dialogVisible" title="管理员登录" width="70%">
      <el-form ref="formRef" :model="state.form" label-width="auto">
        <el-form-item label="账号">
          <el-input v-model="state.form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="state.form.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="login">确定</el-button>
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
