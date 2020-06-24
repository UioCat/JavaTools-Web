<template>
  <Layout style="margin: 3px 50px">
    <Row style="margin: 5px 0">
      <Card>
        <textarea
          style="padding: 4px 7px; font-size: 15px; height: 22vh"
          placeholder="粘贴代码到此处"
          class="code"
        />
      </Card>
    </Row>

    <Row :gutter="16" class="operate">
      <i-col span="8">
        <Card>
          <div v-for="(i, j, k) in fields" :key="k" style="cursor: pointer">
            <div
              @click="handleCheck(j)"
              class="check-option"
              :class="i ? 'checked' : 'uncheck'"
            >{{j}}</div>
          </div>
          <Button @click="handleAll(isAll)" style="cursor: pointer;">全选</Button>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <Button :key="i" v-for="(v, k, i) of option" long>{{v}}</Button>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <textarea style="padding: 4px 7px; font-size: 15px;" @focus="handleCopy" />
        </Card>
      </i-col>
    </Row>
  </Layout>
</template>

<script>
import { copy } from "../utils/tools";

export default {
  name: "mysql",
  props: ["option"],
  data: function() {
    return {
      fields: {
        MongoDB: false,
        Oracle: false,
        MySQL: false,
        MariaDB: false,
        Postgre: false,
        Redis: false
      }
    };
  },
  computed: {
    isAll: function() {
      return Object.values(this.fields).filter(i => i).length;
    }
  },
  methods: {
    handleAll: function(flag) {
      if (flag === 0) {
        for (let key in this.fields) {
          this.fields[key] = true;
        }
      } else {
        for (let key in this.fields) {
          this.fields[key] = false;
        }
      }
    },
    handleCheck: function(name) {
      this.fields[name] = !this.fields[name];
    },
    handleCopy: function(e) {
      copy(e, this);
    }
  }
};
</script>

<style lang="less">
.operate {
  div.ivu-card-body {
    height: calc(90vh - 250px);
  }
}

.ivu-card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.check-option {
  width: 100%;
  font-weight: bold;
  line-height: 1.9em;
  border-radius: 2px;
  border: solid 1px #2d8cf0;
}

.checked {
  color: white;
  background-color: #2d8cf0;
}

.uncheck {
  color: #2d8cf0;
  background-color: white;
}
</style>