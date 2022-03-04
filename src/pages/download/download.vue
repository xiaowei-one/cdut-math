<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { getFileList, downloadFileById } from "../../api/api";

interface StateType {
    fileData: Array<any>;
}

const state: StateType = reactive({ fileData: [] });

onMounted(async () => {
    const res = await getFileList();
    state.fileData = res.data;
});

const downloadFile = (id: string) => {
    console.log(id);
    downloadFileById(id);
};

const tableLayout = "auto";
</script>

<template>
    <el-container>
        <el-main>
            <el-table :data="state.fileData" :table-layout="tableLayout">
                <el-table-column prop="id" label="ID" width="150" />
                <el-table-column prop="file_name" label="名称" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size="large"
                            @click="downloadFile(scope.row.id)"
                            >下载</el-button
                        >
                        <el-button type="text" size="large">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
            />
        </el-footer>
    </el-container>
</template>

<style scoped></style>
