<template>
  <Layout style="margin: 10px 60px">
    <Row style="margin: 10px 0">
      <Card>
        <i-input
          v-model="input"
          type="textarea"
          placeholder="输入"
          size="large"
          clearable
          :autosize="{minRows: 2, maxRows: 5}"
          @on-change="handleChange"
        />
      </Card>
    </Row>
    <Row style="margin: 10px 0">
      <Card>
        <Input
          v-model="output"
          type="textarea"
          placeholder="输出"
          size="large"
          clearable
          :autosize="{minRows: 2, maxRows: 5}"
          @on-focus="handleCopy"
        />
      </Card>
    </Row>
  </Layout>
</template>

<script>
export default {
  name: "ascii",
  data: function() {
    return {
      input: "",
      output: ""
    };
  },
  methods: {
    handleChange: function() {
      this.output = "";
      switch (typeof this.input) {
        case Number:
          break;
        case String:
          break;
        default:
          this.$Message.error("数据有误");
          break;
      }
    },
    handleCopy: function() {
      this.$Message.success("成功复制到剪切板");
    }
  }
};
</script>
