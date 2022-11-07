<script setup lang="ts">
import { NDataTable, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { h } from "vue";
import dayjs from "dayjs";

type GlobalData = {
  target: "local" | "session";
  key: string;
  value: any;
  createAt: string;
};
const createColumns = ({
  play,
}: {
  play: (row: GlobalData) => void;
}): DataTableColumns<GlobalData> => {
  return [
    {
      title: "#",
      width: 50,
      render(_, index) {
        return index + 1;
      },
    },
    { title: "Target", width: 80, key: "target" },
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
              onClick: () => play(row),
            },
            { default: () => "使用" }
          ),
          h(
            NButton,
            {
              strong: true,
              size: "small",
              type: "error",
              onClick: () => play(row),
            },
            { default: () => "移除" }
          ),
        ];
      },
    },
  ];
};

const data: GlobalData[] = [
  {
    target: "local",
    key: "token",
    value: "asdflk;1j231j231j231j231j231j231j23",
    createAt: Date.now(),
  },
  { target: "local", key: "token", value: "asdflk;1j23", createAt: Date.now() },
  { target: "local", key: "token", value: "asdflk;1j23", createAt: Date.now() },
];

const columns = createColumns({
  play(row: GlobalData) {
    console.log("[debug]row:", row);
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
