<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { verification, showForm, submitForm } from "../../../api/api";

const route = useRoute();
const router = useRouter();
const { id } = route.query;

const state: {
  form: any;
  formFiled: Array<{
    id: number;
    field: string;
    idFk: number;
  }>;
  isVisible: boolean;
} = reactive({
  form: {},
  formFiled: [],
  isVisible: true,
});

const onJudge = async () => {
  const params = {
    name: state.form.name,
    student_id: state.form.studentId,
    id_fk: id,
  };
  const res = await verification(params);
  if (res.data) {
    state.form = JSON.parse(res.data.json);
  }
  state.isVisible = false;
};

const onSubmit = async () => {
  const params = {
    name: state.form.name,
    student_id: state.form.studentId,
    json: JSON.stringify(state.form),
    id_fk: id,
  };

  await submitForm(params);
  ElMessage.success('提交成功');
  router.push('/');
};

onMounted(async () => {
  const res = await showForm(<string>id);
  state.formFiled = res.data;
});
</script>

<template>
  <el-container>
    <el-main class="main">
      <el-form class="form" ref="formRef" :model="state.form" label-position="right">
        <template v-if="state.isVisible">
          <el-form-item label="姓名">
            <el-input v-model="state.form.name"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="state.form.studentId"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onJudge" size="large">提交</el-button>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item v-for="item in state.formFiled" :label="item.field" :key="item.id">
            <el-input v-model="state.form[item.field]"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit" size="large">提交</el-button>
          </el-form-item>
        </template>
      </el-form>
    </el-main>
  </el-container>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}
.form {
  width: 65vw;
  padding: 5vw 6vw 2vw 6vw;
  border: 1px solid #e6e6e6;
}
</style>
