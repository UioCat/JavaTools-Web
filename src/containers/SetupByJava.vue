<template>
  <!-- <SetupByCode parsePath="/parseJava" genPath="/generatorFileByJava" /> -->
  <SetupByCode parsePath="/mock/parseJava.json" genPath="/generatorFileByJava" />
</template>

<script>
import { defineComponent } from "vue";

import SetupByCode from "@/components/SetupByCode.vue";

export default defineComponent({
  name: "setup-by-java",
  components: {
    SetupByCode,
  },
  setup() {},
});
</script>
