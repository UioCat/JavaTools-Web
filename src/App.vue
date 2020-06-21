<template>
  <div id="app">
    <Layout style="box-shadow: 0px -3px 10px #2776bb; z-index:9999; position: relative">
      <Header style="background-color: #ffffff; font-size: 18px; font-weight: 500">
        <Icon type="md-hammer" /> UIO 的工具箱
      </Header>
    </Layout>

    <Layout style="padding-top: 5px;">
      <Sider
        :style="{
          position: 'fixed',
          height: '100%',
          left: 0,
          overflow: 'auto',
          backgroundColor: '#ffffff',
          fontWeight: '500'
        }"
      >
        <Menu :active-name="curTool" width="auto" style="height: 100vh;" @on-select="select">
          <MenuItem v-for="(value, name, key) of toolSet" :key="key" :name="name">{{value.name}}</MenuItem>
        </Menu>
      </Sider>

      <Content
        :style="{
          marginLeft: '200px',
          display: 'flex',
          flexDirection: 'column',
      }"
      >
        <h1 style="margin: 28px">{{toolSet[curTool].name}}</h1>
        <div>
          <component :is="curTool" :option="toolSet[curTool].option"></component>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import decimal from "./views/decimal.vue";
import ascii from "./views/ascii.vue";
import mysql from "./views/mysql.vue";
import mybatis from "./views/mybatis.vue";
import toolSet from "./utils/config";

export default {
  name: "app",
  data: function() {
    return {
      curTool: Object.keys(toolSet)[0],
      toolSet
    };
  },
  mounted: function() {},
  components: {
    decimal,
    ascii,
    mysql,
    mybatis
  },
  methods: {
    select: function(name) {
      this.curTool = name;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

label {
  font-size: 16px;
}

.operate {
  div.ivu-card-body {
    height: calc(90vh - 250px);
  }
}

textarea {
  width: 100%;
  height: 100%;
  outline: none;
  display: inline-block;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: #c5c8ce;
    opacity: 1;
  }

  &:hover {
    border-color: #57a3f3;
  }
}
</style>
