<script setup lang="ts">
import { NDataTable, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { computed, h, ref } from "vue";
import dayjs from "dayjs";
import {
  currentGlobalData,
  GlobalData,
  replaceCurrentKV,
  useGlobal,
} from "./hooks";

const createColumns = ({
  useFn,
  rmFn,
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
        return h("span", {}, dayjs(+row.createAt).format("YYYY-MM-DD HH:mm"));
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

const data = computed(() => {
  useGlobal.get();
  const list = Object.values(currentGlobalData.value || {});
  return list.sort((a, b) => b.createAt - a.createAt);
});

const columns = createColumns({
  useFn(row: GlobalData) {
    replaceCurrentKV(row);
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
