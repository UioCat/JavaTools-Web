<template>
  <el-header class="java-header">
    <div class="header-logo"></div>
    <div class="header-label">{{ appName }}</div>
    <el-dropdown class="header-avatar" v-if="showAvatar">
      <img class="avatar__image" :src="avatar" />
      <div class="avatar__label">{{ username }}</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onLogin()">登录</el-dropdown-item>
          <el-dropdown-item @click="onLogout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref } from "vue";
import { GetInfo } from "@/services/login";
import { useRoute, useRouter } from "vue-router";
import { authRoutes } from "@/router";

export default defineComponent({
  name: "Header",

  setup() {
    const onLogin = () => {
      router.push({ path: '/login' });
    };
    const router = useRouter();

    const onLogout = () => {
      localStorage.removeItem("token");
      router.push({ path: '/login' });
    };

    const showAvatar = computed(() => authRoutes.includes(useRoute().path));

    const avatar = ref("");
    const username = ref("");
    onBeforeMount(async () => {
      if (!showAvatar.value) {
        return;
      }
      const res = await GetInfo();
      const { info } = res.data;
      avatar.value = info.headImage ?? "/favicon.ico";
      username.value = info.username;
    });

    return {
      appName: computed(() => import.meta.env.VITE_APP_NAME),
      onLogin,
      onLogout,
      avatar,
      username,
      showAvatar,
    };
  },
});
</script>

<style lang="less" scoped>
.java-header {
  padding: 0;
  box-shadow: 2px 2px 5px 2px #e4e9ee;
  display: flex;
  position: relative;

  .header-logo {
    width: 1.4em;
    height: 100%;
  }

  .header-label {
    color: #2d8cf0;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: bolder;
    font-size: 1.4em;
  }

  .header-avatar {
    cursor: pointer;
    position: absolute;
    right: 2em;
    height: 100%;
    display: flex;
    align-items: center;

    ::v-deep(.el-tooltip__trigger) {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .avatar__image {
      height: 22px;
    }

    .avatar__label {
      font-weight: bolder;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
</style>
