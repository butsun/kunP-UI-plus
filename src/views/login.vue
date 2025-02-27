<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">ALKAID DUBHE CIOUD</h3>
      <el-form-item v-if="tenantEnabled" prop="tenantId">
        <el-input v-model="loginForm.tenantName" filterable placeholder="请输入公司名称或公司ID" style="width: 100%">
          <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code">
        <el-input v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">记住密码</el-checkbox>
      <!-- <el-form-item style="float: right">
        <el-button circle title="微信登录" @click="doSocialLogin('wechat')">
          <svg-icon icon-class="wechat" />
        </el-button>
        <el-button circle title="MaxKey登录" @click="doSocialLogin('maxkey')">
          <svg-icon icon-class="maxkey" />
        </el-button>
        <el-button circle title="TopIam登录" @click="doSocialLogin('topiam')">
          <svg-icon icon-class="topiam" />
        </el-button>
        <el-button circle title="Gitee登录" @click="doSocialLogin('gitee')">
          <svg-icon icon-class="gitee" />
        </el-button>
        <el-button circle title="Github登录" @click="doSocialLogin('github')">
          <svg-icon icon-class="github" />
        </el-button>
      </el-form-item> -->
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div v-if="register" style="float: right">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright 2025 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCodeImg, getTenantList, getTenantByName } from '@/api/login';
import { authBinding } from '@/api/system/social/auth';
import { useUserStore } from '@/store/modules/user';
import { LoginData, TenantVO } from '@/api/types';
import { to } from 'await-to-js';
import { HttpStatus } from '@/enums/RespEnum';

const userStore = useUserStore();
const router = useRouter();

const loginForm = ref<LoginData>({
  tenantId: '',
  tenantName: '', // 
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: ''
} as LoginData);

const loginRules: ElFormRules = {
  tenantName: [{ required: true, trigger: 'blur', message: '' }],
  username: [{ required: true, trigger: 'blur', message: '' }],
  password: [{ required: true, trigger: 'blur', message: '' }],
  code: [{ required: true, trigger: 'change', message: '' }]
};

const codeUrl = ref('');
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 租户开关
const tenantEnabled = ref(true);

// 注册
const register = ref(false);
const redirect = ref('/');
const loginRef = ref<ElFormInstance>();
// 租户列表
const tenantList = ref<TenantVO[]>([]);

watch(
  () => router.currentRoute.value,
  (newRoute: any) => {
    redirect.value = newRoute.query && decodeURIComponent(newRoute.query.redirect);
  },
  { immediate: true }
);

const handleLogin = () => {
  loginRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      loading.value = true;
         
      try {
        // 租户名称查询
        if (tenantEnabled.value && loginForm.value.tenantName) {
          // 判断是否为六位数字
          if (/^\d{6}$/.test(loginForm.value.tenantName)) {
            // 如果是六位数字，直接作为租户ID使用
            loginForm.value.tenantId = loginForm.value.tenantName;
          } else {
            // 如果不是六位数字，则作为租户名称查询
            const response = await getTenantByName(loginForm.value.tenantName);
            
            if (response.code === HttpStatus.SUCCESS && response.data) {
              // 查询是否成功
              loginForm.value.tenantId = response.data.tenantId;
            } else {
              // 查询失败
              ElMessage.error('对不起, 您的公司不存在，请联系管理员');
              loading.value = false;
              return;
            }
          }
        }
        
        // 记住密码
        if (loginForm.value.rememberMe) {
          localStorage.setItem('tenantName', String(loginForm.value.tenantName)); // 
          localStorage.setItem('username', String(loginForm.value.username));
          localStorage.setItem('password', String(loginForm.value.password));
          localStorage.setItem('rememberMe', String(loginForm.value.rememberMe));
        } else {
          localStorage.removeItem('tenantName');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        
        // 执行登录
        const [err] = await to(userStore.login(loginForm.value));
        if (!err) {
          const redirectUrl = redirect.value || '/';
          await router.push(redirectUrl);
        } else {
          // 验证码获取
          if (captchaEnabled.value) {
            await getCode();
          }
        }
      } catch (error) {
        console.error('', error);
        ElMessage.error('');
      } finally {
        loading.value = false;
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

/**
 * 
 */
const getCode = async () => {
  const res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
};

const getLoginData = () => {
  const tenantName = localStorage.getItem('tenantName');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const rememberMe = localStorage.getItem('rememberMe');
  loginForm.value = {
    tenantName: tenantName === null ? String(loginForm.value.tenantName) : tenantName,
    username: username === null ? String(loginForm.value.username) : username,
    password: password === null ? String(loginForm.value.password) : String(password),
    rememberMe: rememberMe === null ? false : Boolean(rememberMe)
  } as LoginData;
};

/**
 * 
 */
const initTenantList = async () => {
  const { data } = await getTenantList();
  tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled;
  if (tenantEnabled.value) {
    tenantList.value = data.voList;
    if (tenantList.value != null && tenantList.value.length !== 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId;
    }
  }
};

/**
 * 
 * @param type
 */
const doSocialLogin = (type: string) => {
  authBinding(type, loginForm.value.tenantId).then((res: any) => {
    if (res.code === HttpStatus.SUCCESS) {
      // 
      window.location.href = res.data;
    } else {
      ElMessage.error(res.msg);
    }
  });
};

onMounted(() => {
  getCode();
  // initTenantList();
  getLoginData();
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login.jpg');
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #222;
  font-weight: bold;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.1),
    -4px -4px 10px rgba(255, 255, 255, 0.5);

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
