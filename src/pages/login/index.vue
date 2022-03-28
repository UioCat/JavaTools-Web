<template>
  <div class="main-container">
    <div class="bg"></div>
    <div class="login-wrapper">
      <div :class="classType">
        <!-- 登录 -->
        <div class="container__form container--signup">
          <el-form
            class="form"
            ref="loginRef"
            :rules="loginRules"
            :model="loginInput"
            :hide-required-asterisk="true"
            status-icon
          >
            <h2 class="form__title" style="margin-top: 5rem">登录</h2>
            <el-form-item prop="loginAccount">
              <el-input
                v-model="loginAccount"
                placeholder="账号"
                size="large"
                @keyup.enter="submit(loginRef)"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input
                v-model="loginPassword"
                placeholder="密码"
                type="password"
                size="large"
                @keyup.enter="submit(loginRef)"
                clearable
              >
              </el-input>
            </el-form-item>
            <div class="btn comfirm-btn" @click="submit(loginRef)">登录</div>
          </el-form>
        </div>

        <!-- 注册 -->
        <div class="container__form container--signin">
          <el-form
            class="form"
            ref="registerRef"
            :rules="registerRules"
            :model="registerInput"
            :hide-required-asterisk="true"
            status-icon
          >
            <h2 class="form__title">注册</h2>
            <el-form-item prop="registerUserName">
              <el-input
                v-model="registerUserName"
                size="large"
                placeholder="用户名"
                @keyup.enter="submit(registerRef)"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="registerAccount">
              <el-input
                v-model="registerAccount"
                size="large"
                placeholder="账号"
                @keyup.enter="submit(registerRef)"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="registerPassword">
              <el-input
                v-model="registerPassword"
                type="password"
                size="large"
                placeholder="密码"
                @keyup.enter="submit(registerRef)"
                clearable
              >
              </el-input>
            </el-form-item>
            <div class="btn comfirm-btn" @click="submit(registerRef)">注册</div>
          </el-form>
        </div>

        <!-- 切换登录注册 -->
        <div class="container__overlay">
          <div class="overlay">
            <div
              :class="{
                overlay__panel: true,
                'overlay--left': type,
                'overlay--right': !type,
              }"
            >
              <div
                class="btn"
                @click="changeType(type ? registerRef : loginRef)"
              >
                {{ type ? "注册" : "登录" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Login, Register } from "@/services/login";
import useStore from "@/stores";

export default defineComponent({
  name: "login",

  setup() {
    const router = useRouter();
    const type = ref(true);
    const loginRef = ref<InstanceType<typeof ElForm>>();
    const registerRef = ref<InstanceType<typeof ElForm>>();

    const classType = computed(() => ({
      container: true,
      "right-panel-active": type.value,
    }));

    // 登录验证
    const loginRules = reactive({
      loginAccount: [
        {
          required: true,
          trigger: "blur",
          message: "请输入账号",
        },
      ],
      loginPassword: [
        {
          required: true,
          trigger: "blur",
          message: "请输入密码",
        },
      ],
    });

    // 注册验证
    const registerRules = reactive({
      registerUserName: [
        {
          required: true,
          trigger: "blur",
          message: "请输入用户名",
        },
      ],
      registerAccount: [
        {
          required: true,
          trigger: "blur",
          message: "请输入账号",
        },
      ],
      registerPassword: [
        {
          required: true,
          trigger: "blur",
          message: "请输入密码",
        },
      ],
    });

    // 登录相关数据
    const loginInput = reactive({
      loginAccount: "",
      loginPassword: "",
    });

    // 注册相关数据
    const registerInput = reactive({
      registerUserName: "",
      registerAccount: "",
      registerPassword: "",
    });

    /**
     * 切换登录注册并清空表单
     */
    const changeType = (formEl: InstanceType<typeof ElForm> | undefined) => {
      type.value = !type.value;
      if (!formEl) {
        return;
      }
      formEl.resetFields();
    };

    /**
     * 登录
     */
    const login = async () => {
      const res: any = await Login({
        account: loginInput.loginAccount,
        password: loginInput.loginPassword,
      });
      const { code, info } = res.data;
      if (code === 200) {
        useStore().INIT_TOKEN(info);
        router.push("/");
      }
    };

    /**
     * 注册
     */
    const register = async () => {
      const res: any = await Register({
        username: registerInput.registerUserName,
        account: registerInput.registerAccount,
        password: registerInput.registerPassword,
      });
      const { code } = res.data;
      if (code === 200) {
        console.log(1);
      }
    };

    /**
     * 验证、提交表单
     */
    const submit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      // eslint-disable-next-line no-useless-return
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          if (type.value) {
            login();
          } else {
            register().then(() => {
              loginInput.loginAccount = registerInput.registerAccount;
              loginInput.loginPassword = registerInput.registerPassword;
              login();
            });
          }
        }
      });
    };
    return {
      type,
      loginRef,
      registerRef,
      classType,
      loginRules,
      registerRules,
      loginInput,
      registerInput,
      changeType,
      ...toRefs(loginInput),
      ...toRefs(registerInput),
      login,
      register,
      submit,
    };
  },
});
</script>

<style lang="less" scoped>
.main-container {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(120deg, #a7cdf1, #c5ddf6, #e3eefa, #ffffff);
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300vw;
    min-height: 300vw;
    animation-name: rotate;
    background-image: linear-gradient(
      69deg,
      #1783f4,
      #679ff6,
      #92bcf7,
      #b6daf7
    );
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:before {
    bottom: 30vh;
    border-radius: 45%;
    animation-duration: 10s;
  }

  &:after {
    bottom: 24vh;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  font-size: 16px;

  .container {
    position: relative;
    height: 420px;
    width: 100%;
    max-width: 758px;
    min-width: 530px;
    background-color: #fff;
    border-radius: 0.7em;
    box-shadow: 0 0.9rem 1.5rem rgba(0, 0, 0, 0.25),
      0 0.5rem 0.5rem rgba(0, 0, 0, 0.22);
    overflow: hidden;

    .container--signup,
    .container--signin {
      width: 50%;
    }

    .container__form {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;

    .form__title {
      margin: 4rem 0 1.25rem;
      letter-spacing: 0.5rem;
    }
  }
}

.container.right-panel-active {
  .container--signup {
    position: absolute;
    transform: translateX(100%);
    opacity: 1;
    z-index: 2;
  }
  .container--signin {
    transform: translateX(100%);
    opacity: 0;
  }
}

.container {
  .container--signup {
    opacity: 0;
  }
  .container--signin {
    opacity: 1;
  }
}

.container__overlay {
  height: 100%;
  left: 50%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
  width: 50%;
  animation: show 6s;
  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    width: 200%;

    .overlay__panel {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 50%;
      position: absolute;
      top: 0;
      text-align: center;
      overflow: hidden;
    }
  }
}

.container.right-panel-active {
  .container__overlay {
    position: absolute;
    left: 50%;
    width: 50%;
    overflow: hidden;
    z-index: 100;
    transform: translateX(-100%);
    .overlay {
      transform: translateX(50%);
    }
  }
  .overlay--left {
    transform: translateX(0);
    background-image: linear-gradient(
      120deg,
      #f3e7e926 10%,
      #e3eeff 50%,
      #e3eeff 100%
    );
  }
}

.container {
  .container__overlay {
    position: absolute;
    left: 50%;
    width: 50%;
    overflow: hidden;

    .overlay--left {
      transform: translateX(0);
    }

    .overlay--right {
      right: 0;
      transform: translateX(0);
      background-image: linear-gradient(
        120deg,
        #f3e7e926 10%,
        #e3eeff 50%,
        #e3eeff 100%
      );
    }
  }
}

.btn {
  border-radius: 20px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.3rem;
  padding: 0.9rem 4rem;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  transition: transform 80ms ease-in;
  white-space: nowrap;
  text-align: center;
  &:hover {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.02);
  }
}
@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>
