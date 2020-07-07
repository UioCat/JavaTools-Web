<template>
  <div id="app">
    <Layout
      :style="{
        boxShadow: '0px -3px 10px #2776bb',
        zIndex: '9999',
        position: 'relative'
      }"
    >
      <Header
        :style="{
        backgroundColor: '#ffffff',
        fontSize: '18px',
        fontWeight: '500'
        }"
      >
        <a href="/">
          <Icon type="md-hammer" />UIO 的工具箱
        </a>
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
        <Menu :active-name="curTool" width="auto" style="height: 100vh" @on-select="select">
          <MenuItem v-for="(value, name, key) of toolSet" :key="key" :name="name">{{value.name}}</MenuItem>
        </Menu>
      </Sider>

      <Content
        :style="{
          left: '200px',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: 'calc(100% - 64px)',
          width: 'calc(100% - 200px)'
      }"
      >
        <h1 style="margin: 25px">{{toolSet[curTool].name}}</h1>
        <div>
          <component :is="curTool" :option="toolSet[curTool].option"></component>
        </div>
        <p
          :style="{
            bottom: '12px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
        }"
        >
          <span>工信部备案号 浙 ICP 备 20005026 号</span>
          <br />
          <span>联网备案号 33060202000774</span>
        </p>
      </Content>
    </Layout>
  </div>
</template>

<script>
import decimal from "./views/decimal";
import ascii from "./views/ascii";
import mysql from "./views/mysql";
import mybatis from "./views/mybatis";
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
  height: 100vh;
  background-color: #f5f7f9;

  a {
    color: unset;
  }
}

label {
  font-size: 16px;
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
