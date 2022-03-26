<template>
  <!-- <SetupByCode parsePath="/parseSQL" genPath="/generatorFileBySQL" /> -->
  <SetupByCode parsePath="/mock/parseSQL.json" genPath="/generatorFileBySQL" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SetupByCode from "@/components/SetupByCode.vue";

export default defineComponent({
  name: "setup-by-sql",

  components: {
    SetupByCode,
  },

  setup() {},
});
</script>
