<template>
  <generate :type="type" />
</template>

<script>
import generate from "./generate";
export default {
  name: "mysql",
  props: ["type"],
  components: {
    generate
  }
};
</script>
