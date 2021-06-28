<template>
  <SetupByCode parsePath="/parseSQL" genPath="/generatorFileBySQL" />
</template>

<script>
import { defineComponent } from "vue";

import SetupByCode from "@/components/SetupByCode.vue";

export default defineComponent({
  name: "SetupBySql",
  components: {
    SetupByCode,
  },
  setup() {},
});
</script>
