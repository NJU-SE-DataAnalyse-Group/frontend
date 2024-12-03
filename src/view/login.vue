<template>
  <body>
    <header>
      <nav class="navbar">
        <div class="navbar-brand">论文检索与分类平台</div>
      </nav>
    </header>

    <main class="main-content">
      <section v-if="showLogin" class="login-section">
        <h2>登录</h2>
        <form @submit.prevent="loginUser">
          <input v-model="user_name" type="text" placeholder="请输入用户名..." required />
          <input v-model="email" type="email" placeholder="请输入邮箱..." required />
          <input v-model="password" type="password" placeholder="请输入密码..." required />
          <button type="submit">登录</button>
        </form>
        <p>还没有账号？<a href="#" @click="toggleForm">立即注册</a></p>
      </section>

      <section v-if="!showLogin" class="login-section">
        <h2>注册</h2>
        <form @submit.prevent="registerUser">
          <input v-model="user_name" type="text" placeholder="请输入用户名..." required />
          <input v-model="email" type="email" placeholder="请输入邮箱..." required />
          <input v-model="password" type="password" placeholder="请输入密码..." required />
          <button type="submit">注册</button>
        </form>
        <p class="text-link">
          已有账号？
          <a class="text-link a" href="#" @click="toggleForm">立即登录</a>
        </p>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 论文检索与分类平台. 版权所有.</p>
    </footer>
  </body>
</template>

<script>
import userApi from "@/api/userApi";

export default {
  name: "Login",
  data() {
    return {
      showLogin: true, // 控制登录和注册切换
      user_name: '',
      email: '',
      password: '',
      errorMessage: '',
      // 其他数据可以根据需求扩展
    };
  },
  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin; // 切换登录和注册表单
    },
    async loginUser() {
      this.errorMessage = '';
      try {
        const response = await userApi.login(this.user_name, this.email, this.password);
        console.log(response);
        sessionStorage.setItem('access_level', response.access_level);
        console.log(response.id);
        sessionStorage.setItem('user_id', response.id);
        this.$router.push({ name: 'search', query: { email: this.email } });
      } catch (error) {
        this.errorMessage = error.message || '登录失败，请重试';
        alert('登录失败，请重试');
      }
    },
    async registerUser() {
      this.errorMessage = '';
      try {
        //访问权限为 0, vip 为1（？）
        const access_level = 0;
        await userApi.createUser(this.user_name, this.email, this.password,  access_level);
        alert('注册成功！');
        this.toggleForm();
      } catch (error) {
        this.errorMessage = error.message || '注册失败，请重试'; // 显示错误信息
        alert('注册失败，请重试');
      }
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

header {
  background-color: rgba(46, 139, 87, 0.7);
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 1.8em;
  font-weight: bold;
  color: #ffffff;
}

.navbar-links button {
  background-color: #f7ffed;
  color: #2f4f4f;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

.navbar-links button:hover {
  background-color: #b3e5ab;
  transform: scale(1.05);
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 20px;
}

.login-section {
  max-width: 400px;
}

.login-section input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid #a5d6a7;
  border-radius: 8px;
  outline: none;
  font-size: 1em;
  color: #2f4f4f;
}

.login-section button {
  padding: 10px 20px;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  margin-bottom: 15px;
}

.login-section a {
  color: #00796b;
}

footer {
  text-align: center;
  padding: 15px;
  background-color: rgba(46, 139, 87, 0.7);
  color: #ffffff;
  font-size: 0.9em;
  margin-top: auto;
}
</style>

