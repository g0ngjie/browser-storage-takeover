<script setup lang="ts">
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NMenu,
} from "naive-ui";
import { NSelect, NButton, NInput, NPopconfirm } from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";
import {
  StorageType,
  useStorageKeys,
  useInitStorage,
  StorageMapping,
  useGlobal,
  currentType,
} from "./hooks";

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
const menuOptions = ref(useStorageKeys(currentType.value));

const btn = reactive({
  txt: "贮存",
  loading: false,
});

// 存储
const handleSave = () => {
  if (!currentKey.value) return;
  const current = storageData.value[currentType.value][currentKey.value];
  useGlobal.save(currentKey.value, current);

  btn.txt = "Ok !";
  btn.loading = true;
  setTimeout(() => {
    btn.txt = "贮存";
    btn.loading = false;
  }, 500);
};

// 切换源
const handleSelect = (value: StorageType) => {
  currentType.value = value;
  showJsonStr.value = "";
};

// 删除当前环境 K/V
const handleRmConfirm = () => {
  storageData.value[currentType.value][currentKey.value] = null;
  // 删除对应菜单数据
  menuOptions.value = menuOptions.value.filter(
    (target) => target.key !== currentKey.value
  );
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
          v-model:value="currentType"
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
          :loading="btn.loading"
          :disabled="!currentKey"
          secondary
          size="small"
          type="primary"
          @click="handleSave"
          >{{ btn.txt }}</NButton
        >
        <NPopconfirm
          :negative-text="null"
          @positive-click="handleRmConfirm"
          positive-text="确认"
          :show-icon="false"
        >
          <template #trigger>
            <NButton
              style="margin-left: 10px"
              :disabled="!currentKey"
              secondary
              size="small"
              type="error"
              >移除</NButton
            >
          </template>
          确认删除当前变量
        </NPopconfirm>
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
