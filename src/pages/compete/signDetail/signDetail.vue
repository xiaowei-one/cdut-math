<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { queryAllCompetes, showForm, submitForm } from "../../../api/api";

interface StateType {
  form: any;
  formFiled: Array<filedType>;
}

interface filedType {
  id: number;
  field: string;
  idFk: number;
}

const route = useRoute();
const { id } = route.query;

const state: StateType = reactive({
  form: {},
  formFiled: [],
});

const onSubmit = async () => {
  const params = {
    name: state.form.name,
    student_id: state.form.studentId,
    json: state.form,
    id_fk: id,
  };

  const res = await submitForm(params);
  console.log(res);
};

onMounted(async () => {
  const res = await showForm(<string>id);
  state.formFiled = res.data;
  console.log(res);
});
</script>

<template>
  <el-container>
    <el-main class="main">
      <el-form class="form" ref="formRef" :model="state.form">
        <el-form-item label="姓名">
          <el-input v-model="state.form.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="state.form.studentId"></el-input>
        </el-form-item>
        <el-form-item v-for="item in state.formFiled" :label="item.field">
          <el-input v-model="state.form[item.field]"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="onSubmit" size="large">Submit</el-button>
        </el-form-item>
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
