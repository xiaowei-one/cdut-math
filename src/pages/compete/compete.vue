<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import { queryAllCompetes } from "../../api/api";
const router = useRouter();

interface StateType {
    competeData: Array<any>;
}

const state: StateType = reactive({
    competeData: [],
});

const toSignUp = (id: number) => {
    router.push(`/base/compete/signUp?id=${id}`);
};
onMounted(async () => {
    const res = await queryAllCompetes();
    state.competeData = res.data;
});
</script>

<template>
    <el-container>
        <el-main>
            <el-table
                :data="state.competeData"
                style="width: 100%"
                size="large"
            >
                <el-table-column prop="id" label="ID" width="150" />
                <el-table-column prop="title" label="名称" width="360" />
                <el-table-column prop="date" label="时间" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size="large"
                            @click="toSignUp(scope.row.id)"
                            >报名</el-button
                        >
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
