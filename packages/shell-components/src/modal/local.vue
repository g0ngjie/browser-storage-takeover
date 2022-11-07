<script setup lang="ts">
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NMenu,
} from "naive-ui";
import { NSelect, NButton, NInput } from "naive-ui";
import { computed, onMounted, ref } from "vue";
import {
  StorageType,
  useStorageKeys,
  useInitStorage,
  StorageMapping,
  useGlobal,
  currentType,
} from "./hooks";

const defaultValue = ref<StorageType>("local");
const storageData = ref<StorageMapping>({ local: {}, session: {} });
// 当前选中key
const currentKey = ref("");
// 当前展示
const showJsonStr = computed({
  get() {
    return storageData.value[currentType.value][currentKey.value];
  },
  set(val) {
    storageData.value[currentType.value][currentKey.value] = val;
  },
});

const options: { label: string; value: StorageType }[] = [
  { label: "LocalStorage", value: "local" },
  { label: "SessionStorage", value: "session" },
];

// 菜单
const menuOptions = computed(() => useStorageKeys(currentType.value));
// 存储
const handleSave = () => {
  if (!currentKey.value) return;
  const current = storageData.value[currentType.value][currentKey.value];
  useGlobal.save(currentKey.value, current);
};

// 切换源
const handleSelect = (value: StorageType) => {
  currentType.value = value;
  showJsonStr.value = "";
};

onMounted(() => {
  storageData.value = useInitStorage();
});
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      content-style="padding: 5px;"
      :width="260"
      show-trigger="arrow-circle"
      collapse-mode="width"
      :show-collapsed-content="false"
    >
      <NSpace vertical>
        <NSelect
          v-model:value="defaultValue"
          @update:value="handleSelect"
          size="small"
          style="width: 150px"
          :options="options"
        />
        <NLayout has-sider position="absolute" style="top: 40px; bottom: 10px">
          <NLayoutSider>
            <NMenu
              :options="menuOptions"
              @update:value="(value) => (currentKey = value)"
            />
          </NLayoutSider>
        </NLayout>
      </NSpace>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered style="padding: 5px; padding-left: 10px">
        <NButton
          :disabled="!currentKey"
          secondary
          size="small"
          type="primary"
          @click="handleSave"
          >贮存</NButton
        >
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 5px; padding-left: 10px;">
        <NInput
          type="textarea"
          v-model:value="showJsonStr"
          :rows="20"
          @update:value="(value) => (showJsonStr = value)"
        />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
