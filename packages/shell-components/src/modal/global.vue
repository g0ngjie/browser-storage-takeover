<script setup lang="ts">
import { NDataTable, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { h, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { GlobalData, useGlobal } from "./hooks";

const emit = defineEmits(["use"]);

const createColumns = ({
  play,
}: {
  useFn: (row: GlobalData) => void;
  rmFn: (row: GlobalData) => void;
}): DataTableColumns<GlobalData> => {
  return [
    {
      title: "#",
      width: 50,
      key: "",
      render(_, index) {
        return index + 1;
      },
    },
    { title: "Type", width: 80, key: "type" },
    { title: "Key", key: "key" },
    { title: "Value", ellipsis: { tooltip: true }, key: "value" },
    {
      title: "CreateAt",
      key: "createAt",
      width: 150,
      render(row) {
        return h("span", {}, dayjs(row.createAt).format("YYYY-MM-DD HH:mm"));
      },
    },
    {
      title: "Action",
      key: "actions",
      width: 130,
      render(row) {
        return [
          h(
            NButton,
            {
              strong: true,
              size: "small",
              style: "margin-right: 10px",
              type: "primary",
              onClick: () => useFn(row),
            },
            { default: () => "使用" }
          ),
          h(
            NButton,
            {
              strong: true,
              size: "small",
              type: "error",
              onClick: () => rmFn(row),
            },
            { default: () => "移除" }
          ),
        ];
      },
    },
  ];
};

const data = ref<GlobalData[]>([]);

onMounted(async () => {
  const dataMap = await useGlobal.get();
  data.value = Object.values(dataMap || {});
});

const columns = createColumns({
  useFn(row: GlobalData) {
    console.log("[debug]row:", row);
    emit.use(row);
  },
  rmFn(row: GlobalData) {
    useGlobal.remove(row.key);
  },
});
</script>

<template>
  <NDataTable
    :max-height="500"
    :columns="columns"
    :data="data"
    :bordered="false"
  />
</template>
