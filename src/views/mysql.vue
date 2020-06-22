<template>
  <Layout style="margin: 5px 50px">
    <Row style="margin: 5px 0">
      <Upload type="drag" action accept=".java">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
          <p>拖拽或点击此处以上传</p>
        </div>
      </Upload>
    </Row>

    <Row :gutter="16" class="operate">
      <i-col span="8">
        <Card>
          <Tag size="large">Large Tag</Tag>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <Button :key="i" v-for="(v, k, i) of option" long>{{v}}</Button>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <textarea style="padding: 4px 7px; font-size: 16px;" />
        </Card>
      </i-col>
    </Row>
  </Layout>
</template>

<script>
export default {
  name: "mysql",
  props: ["option"],
  data: function() {
    return {};
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
</style>