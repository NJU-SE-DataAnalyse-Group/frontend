<script>
export default {
  name: "paper",
  data() {
    return {
      title: "机器学习与大数据的未来趋势",
      abstract: "机器学习与大数据的未来趋势机器学习与大数据的未来趋势机器学习与大数据的未来趋势机器学习与大数据的未来趋势机器学习与大数据的未来趋" +
          "势机器学习与大数据的未来趋势机器学习与大数据的未来趋势机器学习与大数据的未来趋势",
      papers: [
        {
          id: 1,
          title: "dddddddddddddddd"
        },
        {
          id: 2,
          title: "fff"
        },
        {
          id: 3,
          title: "44444444444444444444444444444444444444444444"
        }
      ],
      paper : {},
      citers : [],
      citees : [],
    }
  },
  mounted() {
    // 在页面初始化时自动调用该方法
    const paperId = this.$route.params.id;
    this.paper = this.getPaperById(paperId);
    this.citers = this.getListsOfCiters(paperId);
    this.citees = this.getListsOfCitees(paperId);
  },
  methods: {

    async getPaperById(paperId) {
      try {
        const response = await axios.get(`http://localhost:3000/paper/${paperId}`);
        return response.data; // 返回论文数据
      } catch (error) {
        console.error(`Failed to find paper by ID: ${error.message}`);
      }
    },


    // 获取引用该论文的所有论文
    async getListsOfCiters(paperId) {
       try {
        const response = await axios.get(`http://localhost:3000/paper/${paperId}/citers`);
        return response.data;
      } catch (error) {
        console.error(`Failed to find cites for paper: ${error.message}`);
        throw error;
      }
    },

    // 获取该论文引用的所有论文
    async getListsOfCitees(paperId) {
      try {
        const response = await axios.get(`http://localhost:3000/paper/${paperId}/citees`);
        return response.data; // 返回该论文引用的论文列表
      } catch (error) {
        console.error(`Failed to find cited papers for paper: ${error.message}`);
        throw error;
      }
    },

    // 获取相似论文
    // async searchPapers() {
    //   if (!this.query) {
    //     alert('请输入搜索关键字');
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(`http://localhost:3000/paper/search?`, {
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
      <div class="navbar-links">
        <button @click="gotoLogin">登录</button>
        <button onclick="alert('请注册')">注册</button>
      </div>
    </nav>
  </header>

  <main style="display: flex; justify-content: space-between; flex-grow: 1;">
    <!-- 左栏，占页面宽度的70% -->
    <div style="flex: 0 0 70%; padding-right: 20px;">
      <div class="title-div">
        <h1 class="title">{{ this.paper.paper_id }}</h1>
      </div>
      <div class="abstract-div">
        <p class="abstract"><strong>摘要：</strong>{{ this.paper.abstract }}</p>
      </div>
    </div>

    <!-- 右栏，包含引用论文、相似论文、同类论文等，宽度占页面的30% -->
    <div style="flex: 0 0 30%; padding-left: 20px;">
      <!-- 引用论文列表 -->
      <section class="section">
        <h3>引用论文列表</h3>
        <div v-for="paper in citees" :key="paper.title" class="section div">
          <router-link :to="'/paperView/' + paper.paper_id">
            <p>{{ paper.title }}</p>
          </router-link>
        </div>
      </section>

      <!-- 相似论文列表 -->
      <section class="section">
        <h3>相似论文列表</h3>
        <div v-for="paper in papers" :key="paper.title" class="section div">
          <router-link :to="'/paperView/' + paper.id">
            <p>{{ paper.title }}</p>
          </router-link>
        </div>
      </section>

      <!-- 同类论文列表 -->
      <section class="section">
        <h3>同类论文列表</h3>
        <div v-for="paper in papers" :key="paper.title" class="section div">
          <router-link :to="'/paperView/' + paper.id">
            <p>{{ paper.title }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </main>

  <!-- 页脚 -->
  <footer>
    <p>&copy; 2024 论文检索与分类平台. 版权所有.</p>
  </footer>

  </body>
  </html>
</template>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  display: flex;
  //flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.title-div {
  width: 100%;
  text-align:center;
  max-width: 1100px;
  margin: 0 auto;
  padding-right: 30px;
}

.title {
  font-size: xxx-large;
  margin-left: 30px;
  margin-top: 30px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.abstract-div {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding-right: 20px
}

.abstract {
  font-size: x-large;
  margin-left: 30px;
  margin-top: 30px ;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.section h3 {
  margin-top: 30px;
  font-size: xx-large;
}

.section div {
  width: 90%;
  max-width: 400px;
  background-color: rgba(96, 185, 139, 0.7);
  margin-top: 10px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.section div p {
  font-size: x-large;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.section div a {
  color: green;
  text-decoration: none;
}


.section div a:hover {
  color: #ffffff;
}

/* 页脚样式 */
footer {
  text-align: center;
  padding: 15px;
  background-color: rgba(46, 139, 87, 0.7);
  color: #ffffff;
  font-size: 0.9em;
}

</style>