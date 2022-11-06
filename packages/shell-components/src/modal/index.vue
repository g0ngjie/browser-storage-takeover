<script setup lang="ts">
import { NModal, NCard } from "naive-ui";
import { onMounted, ref } from "vue";
import { useLocalStorage, useStorage } from "@vueuse/core";

const showModal = ref(false);

const val = Object.values(localStorage).map(target => target)

onMounted(() => {
  showModal.value = true;
});
</script>

<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="模态框"
      size="huge"
      :close-on-esc="false"
    >
      <template #header-extra> 噢！ </template>
      {{ val }}
      <template #footer> 尾部 </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
body {
  background-color: red;
}
</style>
