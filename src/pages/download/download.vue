<script lang="ts" setup>
import { defineProps } from 'vue'
import { onMounted, reactive } from "vue";
import { getFileList, downloadFileById } from "../../api/api";

const props = defineProps<{
  loginState: boolean,
  tableConfig: {
    index: string,
    auto: string,
    operation: string,
  },
  isMobile: boolean,
}>()

const state: { fileData: Array<any> } = reactive({ fileData: [] });

onMounted(async () => {
  const res = await getFileList();
  state.fileData = res.data;
});

const downloadFile = (id: string) => {
  downloadFileById(id);
};

</script>

<template>
  <el-container>
    <el-main>
      <el-table :data="state.fileData">
        <el-table-column
          type="index"
          label="序号"
          v-if="!props.isMobile"
          :width="props.tableConfig.index"
        />
        <el-table-column prop="file_name" label="名称" />
        <el-table-column fixed="right" label="操作" :width="props.tableConfig.operation">
          <template #default="scope">
            <el-button type="text" size="small" @click="downloadFile(scope.row.id)">下载</el-button>
            <el-button v-if="props.loginState" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style scoped></style>
