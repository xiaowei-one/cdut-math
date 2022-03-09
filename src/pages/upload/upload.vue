<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive, defineProps } from "vue";
import { useRoute } from "vue-router";
import { baseURL } from "../../../config/config";

const props = defineProps<{ isMobile: boolean }>()

const state: {
  route: object;
  baseURL: string;
} = reactive({
  route: useRoute(),
  baseURL: baseURL + "/files/upload",
});

const beforeUpload = (file: any) => {
  if (file.size > 1048576) {
    ElMessage.error("文件上传最大为1G!");
    return false;
  }
};
</script>

<template>
  <el-container>
    <el-main class="upload">
      <el-upload
        :action="state.baseURL"
        :before-upload="beforeUpload"
        :drag="!props.isMobile"
        multiple
      >
        <template v-if="!props.isMobile">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or
            <em>click to upload</em>
          </div>
        </template>
        <el-button type="primary" v-else>Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">文件上传最大为1G</div>
        </template>
      </el-upload>
    </el-main>
  </el-container>
</template>

<style scoped>
.upload {
  display: flex;
  justify-content: center;
}
</style>
