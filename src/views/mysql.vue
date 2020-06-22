<template>
  <Layout style="margin: 3px 50px">
    <Row style="margin: 5px 0">
      <Card>
        <textarea style="padding: 4px 7px; font-size: 15px; height: 22vh" class="code" />
      </Card>
    </Row>

    <Row :gutter="16" class="operate">
      <i-col span="8">
        <Card>
          <Check :item="fields" />
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
import Check from "../components/Check";

export default {
  name: "mysql",
  props: ["option"],
  components: { Check },
  data: function() {
    return {
      fields: ["Label", "Tag"]
    };
  },
  methods: {
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
</style>