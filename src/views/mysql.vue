<template>
  <Layout style="margin: 3px 50px">
    <Row class="uio-operate" type="flex" :gutter="16">
      <!-- 代码 -->
      <i-col span="6">
        <Card>
          <textarea
            class="uio-code uio-textarea"
            placeholder="粘贴代码到此处"
            :value="inputCode"
            @change="handleCode($event)"
          />
        </Card>
      </i-col>
      <!-- 字段列表 -->
      <i-col span="6">
        <Card>
          <div style="cursor: pointer" v-for="(i, j, k) in fields" :key="k">
            <div
              class="uio-check-option"
              :class="i ? 'uio-checked' : 'uio-uncheck'"
              @click="handleCheck(j)"
            >{{j}}</div>
          </div>
          <Button style="cursor: pointer" @click="handleAll()">全选</Button>
        </Card>
      </i-col>

      <i-col span="12">
        <Card>
          <!-- 操作列表 -->
          <section class="uio-radio-group">
            <label class="uio-radio" v-for="(v, k, i) of option" :key="i">
              <input type="radio" v-model="operate" :value="k" />
              <span>{{v[0]}}</span>
            </label>
          </section>
          <!-- 参数列表 -->
          <section>
            <div style="cursor: pointer" v-for="(i, j, k) in fields" :key="k">
              <div>{{j}}</div>
            </div>
          </section>
          <Button style="cursor: pointer" @click="handleSubmit()">提交</Button>
          <!-- 输出 -->
          <textarea
            class="uio-code uio-textarea"
            placeholder="命令输出"
            style="height: 8em"
            :v-model="outputCode"
            @focus="handleCopy"
          />
        </Card>
      </i-col>
    </Row>
  </Layout>
</template>

<script>
import { parse, copy } from "../utils/tools";
import { post } from "../utils/request";
import toolSet from "../utils/config";

export default {
  name: "mysql",
  props: ["option"],
  data: function() {
    return {
      inputCode: "",
      outputCode: "",
      selected: 0,
      fields: {
        "字段 1": false,
        "字段 2": false,
        "字段 3": false,
        "字段 4": true,
        "字段 5": true,
        "字段 6": false
      },
      operate: "query"
    };
  },
  methods: {
    handleCode: function(e) {
      this.code = e.target.value;
      let res = parse(toolSet.mysql.api.parse, { data: e.target.value }, this);
      if (res) this.fields = res;
    },
    handleAll: function() {
      if (this.selected === Object.keys(this.fields).length) {
        for (let key in this.fields) {
          this.fields[key] = false;
        }
      } else {
        for (let key in this.fields) {
          this.fields[key] = true;
        }
      }
      this.selected = Object.values(this.fields).filter(i => i).length;
    },
    handleCheck: function(name) {
      this.fields[name] = !this.fields[name];
      this.selected = Object.values(this.fields).filter(i => i).length;
    },
    handleSubmit: function() {},
    handleCopy: function(e) {
      copy(e, this);
    }
  }
};
</script>

<style lang="less">
@out-color: #2d8cf0;

.uio-code {
  font-family: Courier, "Courier New", monospace;
  font-weight: 600;
  line-height: 1em;
}

.uio-textarea {
  padding: 6px;
  font-size: 15px;
  resize: none;
  margin: 0;
}

.uio-operate {
  div.ivu-card-body {
    height: calc(100vh - 64px - 52px - 16 * 2px - 25 * 2px - 42px);
    //         视口高度 - 导航栏 - 备案信息 - 内边距 - 标题
  }
}

.ivu-card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

div.ivu-col-span-12 > div.ivu-card-bordered > div.ivu-card-body {
  justify-content: space-between;
}

.uio-check-option {
  width: 100%;
  font-weight: bold;
  line-height: 1.9em;
  border-radius: 2px;
  border: solid 1px @out-color;
}

.uio-checked {
  color: white;
  background-color: @out-color;
}

.uio-uncheck {
  color: @out-color;
  background-color: white;
}

.uio-radio-group {
  display: flex;
  justify-content: space-around;

  .uio-radio {
    cursor: pointer;
    min-height: 4em;
    max-height: 8em;
    font-weight: bold;
    line-height: 1.5em;

    & > input {
      display: none;
    }

    & > span {
      border: solid 1px @out-color;
      border-radius: 2px;
      color: @out-color;
      writing-mode: tb-rl;
      text-align: center;
      height: 100%;
    }

    & > input:checked + span {
      background-color: #f0faff;
    }
  }
}
</style>