<template>
	<Layout style="margin: 10px 60px">
		<Row style="margin: 10px 0">
			<Col span="24">
				<Card>
					<textarea
						style="height: 25vh"
						class="uio-textarea"
						placeholder="输入"
						v-model="string"
						@focus="handleCopy($event)"
						@keypress="handleString()"
					/>
				</Card>
			</Col>
		</Row>
		<Row>
			<Col span="24">
				<Card>
					<textarea
						style="height: 25vh"
						class="uio-textarea"
						placeholder="输出"
						v-model="number"
						@focus="handleCopy($event)"
						@keypress="handleNumber()"
					/>
				</Card>
			</Col>
		</Row>
	</Layout>
</template>

<script>
import { copy } from "../utils/tools";

export default {
	name: "ascii",
	data: function() {
		return {
			string: "",
			number: "",
		};
	},
	methods: {
		handleString: function() {
			if (this.string !== "" || this.string !== " ") {
				this.number = this.string
					.split("")
					.map((i) => i.charCodeAt())
					.join(" ");
			} else {
				this.$Message.error("无法转换");
			}
		},
		handleNumber: function() {
			let pre = this.number.split("");
			pre.filter((i) => (i >= "a" && i <= "z") || (i >= "A" && i <= "Z"));
			this.string = pre.map((i) => i.charCodeAt()).join(" ");
		},
		handleCopy: function(e) {
			copy(e, this);
		},
	},
};
</script>
