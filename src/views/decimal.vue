<template>
  <Layout style="margin: 10px 60px">
    <Row style="margin: 10px 0">
      <label>选择输入的进制：</label>
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
          :autosize="{minRows: 6, maxRows: 8}"
          @on-change="handleChange"
        />
      </Card>
    </Row>
    <Row :gutter="16">
      <i-col span="8">
        <Card>
          <label>二进制</label>
          <Input
            v-model="output_B"
            type="textarea"
            placeholder="二进制输出"
            size="large"
            clearable
            :autosize="{minRows: 8, maxRows: 10}"
            @on-focus="handleCopy"
          />
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <label>十进制</label>
          <Input
            v-model="output_D"
            type="textarea"
            placeholder="十进制输出"
            size="large"
            clearable
            :autosize="{minRows: 8, maxRows: 10}"
            @on-focus="handleCopy"
          />
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <label>十六进制</label>
          <Input
            v-model="output_H"
            type="textarea"
            placeholder="十六进制输出"
            size="large"
            clearable
            :autosize="{minRows: 8, maxRows: 10}"
            @on-focus="handleCopy"
          />
        </Card>
      </i-col>
    </Row>
  </Layout>
</template>

<script>
import { copy } from "../utils/tools";

export default {
  name: "decimal",
  data: function() {
    return {
      dec: "10",
      input: "",
      output_B: "",
      output_D: "",
      output_H: ""
    };
  },
  methods: {
    handleChange: function() {
      let val, pre;
      if (!this.input) {
        this.output_B = "";
        this.output_D = "";
        this.output_H = "";
        return;
      }
      switch (this.dec) {
        case "2":
          pre = this.input
            .split("")
            .map(i => (i === "1" || i === "0" ? i : "N"))
            .join("");
          if (pre.search("N") !== -1) {
            this.$Message.error("输入有误");
            return;
          }
          val = Number.parseInt(this.input, 2);
          this.output_B = this.input;
          this.output_D = val.toString(10);
          this.output_H = val.toString(16).toUpperCase();
          break;
        case "10":
          pre = this.input
            .split("")
            .map(i => (i >= "0" && i <= 9 ? i : "N"))
            .join("");
          if (pre.search("N") !== -1) {
            this.$Message.error("输入有误");
            return;
          }
          val = Number.parseInt(this.input, 10);
          this.output_B = val.toString(2);
          this.output_D = this.input;
          this.output_H = val.toString(16).toUpperCase();
          break;
        case "16":
          pre = this.input
            .split("")
            .map(i =>
              !((i >= "G" && i <= "Z") || (i >= "g" && i <= "z")) ? i : "N"
            )
            .join("");
          if (pre.search("N") !== -1) {
            this.$Message.error("输入有误");
            return;
          }
          val = Number.parseInt(pre, 16);
          this.output_B = val.toString(2);
          this.output_D = val.toString(10);
          this.output_H = this.input.toUpperCase();
          break;
      }
    },
    handleCopy: function(e) {
      copy(e, this);
    }
  }
};
</script>

<style scoped lang="less">
label {
  margin-top: -6px;
  margin-bottom: 5px;
}
</style>
