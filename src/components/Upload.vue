<template>
  <div>
    <input type="file" />
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
      <p>{{curFile}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  data: function() {
    return {
      curFile: "拖拽或点击此处以上传"
    };
  },
  methods: {
    onchange: function() {}
  }
};
</script>

<style scoped lang="less">
</style>
