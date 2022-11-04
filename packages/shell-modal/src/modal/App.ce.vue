<template>
  <NButton type="success">测试</NButton>
  <NSwitch>NSwitch</NSwitch>
  <!-- <div ref="domRef" v-if="envs.length > 0" class="container auto-put-away">
    <NDescriptions
      v-for="(env, index) in envs"
      :key="index"
      :column="1"
      size="small"
      label-placement="left"
    >
      <NDescriptionsItem label="_key">
        {{ env.globalKey }}
      </NDescriptionsItem>
      <NDescriptionsItem
        v-for="(target, key) in env.envs"
        :key="key"
        :label="key"
      >
        {{ target }}
      </NDescriptionsItem>
    </NDescriptions>
  </div> -->
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { NDescriptions, NDescriptionsItem, NButton, NSwitch } from "naive-ui";

// defineComponent({
//   components: { NDescriptions, NDescriptionsItem, NButton },
// });

// const envs = ref([
//   {
//     globalKey: "globalKey",
//     ebvs: "123",
//   },
// ]);
// const domRef = ref(null);
export default defineComponent({
  components: { NDescriptions, NDescriptionsItem, NButton, NSwitch },
});
</script>

<style>
.container {
  background-color: rgba(38, 38, 38, 0.4);
  border-radius: 3px;
  box-shadow: 0 0 1px #f5f5f5;
  padding: 5px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 999;
  color: #fff;
  font-size: 12px;
}

.auto-put-away {
  transition: all 0.2s;
}
.auto-put-away:hover {
  left: 0 !important;
}
</style>
