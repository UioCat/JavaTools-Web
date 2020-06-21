<template>
  <Layout style="margin: 10px 60px">
    <Row style="margin: 10px 0">
      <label>选择进制：</label>
      <RadioGroup v-model="dec" type="button">
        <Radio label="2"></Radio>
        <Radio label="10"></Radio>
        <Radio label="16"></Radio>
      </RadioGroup>
    </Row>
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
  name: "decimal",
  data: function() {
    return {
      dec: 2,
      input: "",
      output: ""
    };
  },
  methods: {
    handleChange: function() {
      this.dec = "";
    },
    handleCopy: function(params) {}
  }
};
</script>

<style scoped lang="less">
</style>
