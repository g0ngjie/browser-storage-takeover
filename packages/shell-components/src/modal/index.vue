<script setup lang="ts">
import { NModal, NTabs, NTabPane } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import { useLocalStorage, useStorage } from "@vueuse/core";
import { useTheme, useThemeOverrides } from "./hooks";
import GlobalData from "./global.vue";
import LocalData from "./local.vue";

const showModal = ref(false);

// 主题
const theme = useTheme();
// ui样式覆盖
const themeOverrides = useThemeOverrides();

onMounted(() => {
  showModal.value = true;
});
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NModal
      v-model:show="showModal"
      title="Browser Storage Takeover"
      style="width: 90%; min-height: 500px; margin-top: 10px"
      :maskClosable="false"
      size="small"
      preset="card"
    >
      <NTabs size="small" type="line" animated>
        <NTabPane name="local" tab="本地"><LocalData /></NTabPane>
        <NTabPane name="global" tab="贮存"><GlobalData /></NTabPane>
      </NTabs>
    </NModal>
  </NConfigProvider>
</template>
