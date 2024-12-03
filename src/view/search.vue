<script>
import userApi from "@/api/userApi";
import paperApi from "@/api/paperApi";
export default {
  name: "search",
  data(){
    return {
      userName: '',
      email: '',
      accessLevel: 0,
      papers: [
        {
          paper_id: 1,
          title: "深度学习在自然语言处理中的应用",
          abstract: "本文探讨了深度学习在自然语言处理中的最新进展。",
          year: "2022"
        },
        {
          paper_id: 2,
          title: "机器学习与大数据的未来趋势",
          abstract: "分析了大数据时代下机器学习的发展方向。",
          year: "2023"
        },
        {
          paper_id: 3,
          title: "数据隐私保护技术研究",
          abstract: "针对数据隐私问题，提出了一种新的加密算法。",
          year: "2021"
        }
      ],
      filteredPapers: [],
      query: '',
      showSwitchUser: false
    }
  },

  mounted() {
    // 通过 this.$route.query 获取传递的 email
    this.email = this.$route.query.email;
    userApi.getUserByEmail(this.email).then(response => {
      this.userName = response.name;
      this.accessLevel = response.access_level;
    }).catch(error => {
      console.error('获取用户信息失败:', error);
    });
  },
  methods: {
    // 处理搜索功能

    async searchPapers() {
      if (!this.query) {
        alert('请输入搜索关键字');
        return;
      }
      try {
        const responses = await paperApi.searchPapersByKeyword(this.query);
        for (let i = 0; i < responses.length; i++) {
          paperApi.getPaperByTitle(responses[i]).then(response => {
            console.log(response);
            this.filteredPapers.push(response);
          }).catch(error => {
            console.error('获取论文信息失败:', error);
          });
        }
      } catch (error) {
        console.error('搜索论文失败:', error);
      }
    },
    switchUser() {
      // 跳转到登录页面
      this.$router.push('/');
    }



    // async searchPapers() {
    //   if (!this.query) {
    //     alert('请输入搜索关键字');
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(`/api/papers/search`, {
    //       params: { keyword: this.query.toLowerCase() }
    //     });
    //     this.filteredPapers = response.data;
    //   } catch (error) {
    //     console.error('搜索论文失败:', error);
    //   }
    // },
  }

}

</script>

<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>论文检索与分类平台</title>
    <link rel="stylesheet">
  </head>
  <body>
  <!-- 顶部导航栏 -->
  <header>
    <nav class="navbar">
      <div class="navbar-brand">论文检索与分类平台</div>
      <div class="navbar-links" v-if="userName && email" @mouseover="showSwitchUser = true" @mouseleave="showSwitchUser = false">
      <span class="user-information">{{ userName }}</span> | <span class="user-information">{{ email }}</span> |   <span class="isVip">
    <!-- 根据 accessLevel 显示不同内容 -->
    <span v-if="accessLevel === 1">👑 VIP</span>
    <span v-else>Normal</span>
    </span>
      <button v-if="showSwitchUser" @click="switchUser" class="switch-user-btn">切换用户</button>
      </div>
    </nav>
  </header>

  <!-- 搜索栏及内容居中显示 -->
  <main class="main-content">
    <!-- 搜索栏 -->
    <section class="search-section">
      <input v-model="query" type="text" id="search-input" placeholder="请输入关键词..." />
      <button @click="searchPapers">搜索</button>
    </section>

    <!-- 论文展示区域 -->
    <section id="results-section">
      <h2>搜索结果</h2>
      <ul id="results">
        <li v-for="paper in filteredPapers" :key="paper"
            @click="$router.push({ name: 'paperView', params: { paperId : paper.paper_id }})">
          <h3>{{ paper.title }}</h3>
          <p><strong>摘要：</strong>{{ paper.abstract }}</p>
          <p><strong>发表年份：</strong>{{ paper.year }}</p>
        </li>
      </ul>
    </section>
  </main>

  <!-- 页脚 -->
  <footer>
    <p>&copy; 2024 论文检索与分类平台. 版权所有.</p>
  </footer>

  </body>
  </html>

</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#results li {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

#results li:hover {
  background-color: #dbf3e9;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #2f4f4f;
}

/* 顶部导航栏 */
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

/* 主体内容居中样式 */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 搜索栏样式 */
.search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.search-section input {
  width: 300px;
  padding: 12px;
  border: 2px solid #a5d6a7;
  border-radius: 8px 0 0 8px;
  outline: none;
  font-size: 1em;
  color: #2f4f4f;
}

.search-section button {
  padding: 12px;
  border: none;
  background-color: #aed581;
  color: #2f4f4f;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1em;
}

.search-section button:hover {
  background-color: #81c784;
}

/* 论文展示区域 */
#results-section {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

#results h3 {
  color: #558b2f;
  margin-bottom: 10px;
}

.paper-item h3 {
  font-size: 1.5em;
  color: #558b2f;
}

.paper-item p {
  color: #2e7d32;
  margin: 8px 0;
}

/* 页脚样式 */
footer {
  text-align: center;
  padding: 15px;
  background-color: rgba(46, 139, 87, 0.7);
  color: #ffffff;
  font-size: 0.9em;
}

.user-information {
  font-size: 1.0em;
  font-weight: bold;
  color: #205723;
}

.switch-user-btn {
  background-color: #4CAF50; /* 绿色背景 */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

.switch-user-btn:hover {
  background-color: #45a049; /* 悬停时的颜色 */
}

.navbar-links {
  position: relative;
}

.navbar-links .switch-user-btn {
  display: block;
  margin-top: 5px;
}


</style>