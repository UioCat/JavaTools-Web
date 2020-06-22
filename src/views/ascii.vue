<template>
  <Layout style="margin: 10px 60px">
    <Row style="margin: 10px 0">
      <Card>
        <i-input
          v-model="string"
          type="textarea"
          placeholder="输入"
          size="large"
          clearable
          :autosize="{minRows: 4, maxRows: 6}"
          @on-focus="handleCopy"
          @on-change="handleString"
        />
      </Card>
    </Row>
    <Row>
      <Card>
        <Input
          v-model="number"
          type="textarea"
          placeholder="输出"
          size="large"
          clearable
          :autosize="{minRows: 4, maxRows: 6}"
          @on-focus="handleCopy"
          @on-change="handleNumber"
        />
      </Card>
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
      number: ""
    };
  },
  methods: {
    handleString: function() {
      if (this.string !== "" || this.string !== " ") {
        this.number = this.string
          .split("")
          .map(i => i.charCodeAt())
          .join(" ");
      } else {
        this.$Message.error("无法转换");
      }
    },
    handleNumber: function() {
      let pre = this.number.split("");
      pre.filter(i => (i >= "a" && i <= "z") || (i >= "A" && i <= "Z"));
      this.string = pre.map(i => i.charCodeAt()).join(" ");
    },
    handleCopy: function(e) {
      this.$Message.success("成功复制到剪切板");
      copy(e, this);
    }
  }
};
</script>
