<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { queryAllCompetes } from "../../api/api";
import moment from "moment";
const router = useRouter();

const props = defineProps<{
  loginState: boolean;
  tableConfig: {
    index: string;
    auto: string;
    operation: string;
  };
  isMobile: boolean;
}>();

const state: { competeData: Array<any> } = reactive({ competeData: [] });

const toSignUp = (id: number) => {
  router.push(`/base/compete/signUp?id=${id}`);
};
onMounted(async () => {
  const res = await queryAllCompetes();
  state.competeData = res.data.map(
    (e: { id: string; title: string; date: string }) => {
      e.date = moment().format("lll");
      return e;
    }
  );
});
</script>

<template>
  <el-container>
    <el-main>
      <el-table :data="state.competeData" style="width: 100%" size="large">
        <el-table-column
          type="index"
          label="序号"
          v-if="!props.isMobile"
          :width="props.tableConfig.index"
        />
        <el-table-column prop="title" label="名称" />
        <el-table-column prop="date" label="时间" />
        <el-table-column
          fixed="right"
          label="操作"
          :width="props.tableConfig.operation"
        >
          <template #default="scope">
            <el-button type="text" size="large" @click="toSignUp(scope.row.id)"
              >报名</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style scoped></style>
