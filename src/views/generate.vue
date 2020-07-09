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
      <i-col span="6" class="uio-fields">
        <Card>
          <section>
            <div style="cursor: pointer" v-for="(i, j, k) in fields" :key="k">
              <div
                class="uio-check-option"
                :class="i ? 'uio-checked' : 'uio-uncheck'"
                @click="handleCheck(j)"
              >{{j}}</div>
            </div>
          </section>
          <Button shape="circle" @click="handleAll()">
            <Icon type="md-list" />全 选
          </Button>
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
          <section class="uio-input-group">
            <div>
              <label>填写信息</label>
              <i-input
                v-if="operate === 'create' && isMyBatis"
                v-model="namespace"
                placeholder="命名空间"
              ></i-input>
              <i-input v-else v-model="tbName" placeholder="表  名   "></i-input>
            </div>

            <div v-if="isNeedKey">
              <label>指定主键</label>
              <Select v-model="keyParameter">
                <Option v-for="(v,k,i) in fields" :value="k" :key="i">{{ k }}</Option>
              </Select>
            </div>
          </section>
          <Button type="primary" shape="circle" @click="handleSubmit()">
            <Icon type="md-checkbox-outline" />提 交
          </Button>
          <!-- 输出 -->
          <textarea
            class="uio-code uio-textarea"
            placeholder="命令输出"
            style="height: 20vh"
            :value="outputCode"
            @focus="handleCopy($event)"
          />
        </Card>
      </i-col>
    </Row>
  </Layout>
</template>

<script>
import { copy, parse, generate } from "../utils/tools";
import { post } from "../utils/request";
import { toolSet } from "../utils/config";

export default {
  name: "generate",
  props: ["type"],
  data: function() {
    return {
      inputCode: "",
      outputCode: "",
      selected: 0,
      fields: {
        "字段 1": true,
        "字段 2": false,
        "字段 3": false,
        "字段 4": true,
        "字段 5": false,
        "字段 6": false
      },
      operate: "query",
      keyParameter: "",
      tbName: "",
      namespace: "",
      isMyBatis: false,
      option: null
    };
  },
  created: function() {
    this.isMyBatis = this.type === "mybatis";
    this.option = toolSet[this.type].option;
  },
  computed: {
    isNeedKey: function() {
      return "updatequery".indexOf(this.operate) !== -1;
    }
  },
  methods: {
    handleCode: function(e) {
      this.inputCode = e.target.value;
      parse({ data: e.target.value }, this).then(info => {
        const res = {};
        if (info) info.map(i => (res[i] = false));
        this.fields = res;
      });
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
    handleSubmit: function() {
      const params = { parameter: Object.keys(this.fields).filter(i => i) };
      if (this.isMyBatis) {
        params["namespace"] = this.namespace;
      } else {
        params["tbName"] = this.tbName;
      }
      if (this.isNeedKey) {
        params["keyParameter"] = [this.keyParameter];
      }
      generate(toolSet[this.type].api[this.operate], params, this).then(
        info => {
          if (info) this.$data.outputCode = info;
        }
      );
    },
    handleCopy: function(e) {
      copy(e, this);
    }
  }
};
</script>

<style lang="less">
@out-color: #2d8cf0;
@in-color: #e3f5ff;

div.ivu-layout-content {
  min-height: 600px;
}

.uio-operate {
  div.ivu-card-body {
    min-height: 400px;
    height: calc(100vh - 64px - 52px - 16 * 2px - 25 * 2px - 42px);
    //         视口高度 - 导航栏 - 备案信息 - 内边距 - 标题
  }
}

.uio-fields div.ivu-card-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > section {
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 32px - 16px * 2);
  }
}

div.ivu-col-span-12 > div.ivu-card-bordered > div.ivu-card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button.ivu-btn-circle {
  cursor: pointer;
  margin: 5px 0;
}

.uio-code {
  font-family: Courier, "Courier New", monospace;
  font-weight: 600;
  line-height: 1.1em;
}

.uio-textarea {
  padding: 6px;
  font-size: 15px;
  resize: none;
  margin: 0;
}

.uio-check-option {
  width: 100%;
  font-weight: bold;
  border-radius: 2px;
  font-family: Courier, "Courier New", monospace;
  border: solid 1px @out-color;
}

.uio-checked {
  color: @out-color;
  background-color: @in-color;
}

.uio-uncheck {
  color: @out-color;
  background-color: white;
}

section.uio-radio-group {
  display: flex;
  justify-content: space-around;

  .uio-radio {
    cursor: pointer;
    min-height: 4em;
    max-height: 7em;
    font-weight: 500;
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
      background-color: @in-color;
    }
  }
}

section.uio-input-group {
  label {
    margin: 8px 0;
  }

  label + div {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  input {
    text-align: center;
  }
}
</style>