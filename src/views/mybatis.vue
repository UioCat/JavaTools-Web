<template>
	<generate :type="type" />
</template>

<script>
import generate from "../components/generate";
export default {
	name: "mybatis",
	props: ["type"],
	components: {
		generate,
	},
};
</script>
