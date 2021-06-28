<template>
  <SetupByCode parsePath="/parseJava" genPath="/generatorFileByJava" />
</template>

<script>
import { defineComponent } from "vue";

import SetupByCode from "@/components/SetupByCode.vue";

export default defineComponent({
  name: "SetupByJava",
  components: {
    SetupByCode,
  },
  setup() {},
});
</script>
