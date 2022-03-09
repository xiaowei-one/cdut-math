<script lang="ts" setup>
import { Reading, Download, Upload, Tickets } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { adminLogin, judgeLogin, cancellation } from '../api/api';

const state: {
  dialogVisible: boolean;
  form: {
    account: string;
    password: string;
  };
  loginState: boolean;
  adminName: string;
  tableConfig: { index: string, auto: string, operation: string },
  isMobile: boolean;
} = reactive({
  dialogVisible: false,
  form: {
    account: '',
    password: '',
  },
  loginState: false,
  adminName: '',
  tableConfig: {
    index: '',
    auto: '',
    operation: '',
  },
  isMobile: false,
});

const menuIndex = ref(useRoute().path);

const setToken = (data: string) => {
  localStorage.setItem('token', data);
  localStorage.setItem('name', state.adminName);
}

const getToken = () => {
  return localStorage.getItem('token');
}

const getName = () => {
  return localStorage.getItem('name');
}

const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}

const judgeUserLogin = async () => {
  const token = getToken();
  if (token) {
    const formData = new FormData();
    formData.append('token', token);
    const res: any = await judgeLogin(formData);
    if (res.code === '0') {
      state.adminName = getName() || '';
      state.loginState = true;
    } else {
      state.loginState = false;
      removeToken();
    }
    judgeMobile();
  }
}

const login = async () => {
  const formData = new FormData();
  formData.append('account', state.form.account);
  formData.append('password', state.form.password);
  const { data } = await adminLogin(formData);
  ElMessage({ message: "登陆成功", type: "success" });
  state.loginState = true;
  state.dialogVisible = false;
  state.adminName = data.managerName;
  setToken(data.token);
  judgeMobile()
};

const handleCommand = async () => {
  const token = getToken();
  await cancellation(token);
  state.loginState = false;
  state.adminName = '';
  ElMessage.info('注销成功');
  removeToken();
  judgeMobile()
}

const judgeMobile = () => {
  const flag = !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  state.isMobile = flag;
  if (flag && state.loginState) {
    state.tableConfig = {
      index: '50',
      auto: 'auto',
      operation: '100',
    }
  } else if (flag) {
    state.tableConfig = {
      index: '50',
      auto: 'auto',
      operation: '50',
    }
  } else {
    state.tableConfig = {
      index: '150',
      auto: 'auto',
      operation: '150',
    }
  }
}

onMounted(() => {
  judgeMobile();
  judgeUserLogin();
})

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
        <el-dropdown v-if="state.loginState" @command="handleCommand">
          <span :class="state.isMobile ? 'adminName' : ''">{{ state.adminName }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button v-else plain size="small" @click="state.dialogVisible = true">登录</el-button>
      </el-aside>
    </el-header>

    <el-main>
      <router-view
        :loginState="state.loginState"
        :isMobile="state.isMobile"
        :tableConfig="state.tableConfig"
      ></router-view>
    </el-main>
    <el-dialog v-model="state.dialogVisible" title="管理员登录" :width="state.isMobile ? '70%' : '40%'">
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

.adminName {
  display: inline-block;
  width: 10vw;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
