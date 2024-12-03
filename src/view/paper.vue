<script>
import paperApi from '@/api/paperApi';
import userApi from '../api/userApi';

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
          title: "ddd"
        },
        {
          id: 2,
          title: "fff"
        },
        {
          id: 3,
          title: "444"
        }
      ],
      userId: 0,
      paper : {},
      citers : [],
      citees : [],
      similarPapers : [],
      sameCategoryPapers : [],
      accessLevel: 0,
    }
  },
  async mounted() {
    // 在页面初始化时自动调用该方法
    const paperId = this.$route.params.paperId;
    this.paper = await paperApi.getPaperById(paperId);
    //this.citees = await paperApi.getCitees(paperId);
    const citees = await paperApi.getCitees(paperId);
    for (let i = 0; i < citees.length; i++) {
      const res = await paperApi.getPaperById(citees[i].cited_paper_id);
      //console.log(res);
      this.citees.push(res);
    }
    this.userId = sessionStorage.getItem('user_id');
    const res = await paperApi.getSimilar(paperId);
    const papers = res.similar_papers;
    for (let i = 0; i < papers.length; i++) {
      if (papers[i] === this.paper.title) {
        continue;
      }
      const paper = await paperApi.getPaperByTitle(papers[i]);
      this.similarPapers.push(paper);
    }
    console.log(this.paper.category);
    this.sameCategoryPapers = await paperApi.getSameCategory(this.paper.category);
    this.sameCategoryPapers = this.sameCategoryPapers.filter(p => p.paper_id !== this.paper.paper_id);
    console.log(this.sameCategoryPapers);
    this.accessLevel = parseInt(sessionStorage.getItem('access_level'));
    console.log(this.accessLevel);
  },
  methods: {
    async upgradeUser() {
      try {
        // 这里调用 userApi.updateUser 函数
        if (parseInt(this.accessLevel) === 1) {
          alert('用户已经是 VIP 用户，无需升级');
          return;
        }
        
        const response = await userApi.updateUser(this.userId, null, null, null, 1);
        
        if (response.id == this.userId) {
          alert('用户升级成功');
          sessionStorage.setItem('access_level', response.access_level);
          this.accessLevel = response.access_level;
        } else {
          alert('用户升级失败');
        }
      } catch (error) {
        console.error('升级失败:', error);
        alert('出现错误，无法升级用户');
      }
    },
    forceReload(paperId) {
      window.location.href = `/paperView/${paperId}`;
    }
  },
}
</script>

<template>
  <div :key="$route.params.paper_id"></div>
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
        
        <!-- 根据 access_level 显示内容 -->
        <div class="navbar-actions">
          <!-- 如果 access_level 为 0，显示升级按钮 -->
          <button 
            v-if="accessLevel === 0" 
            @click="upgradeUser" 
            class="upgrade-btn">
            升级用户
          </button>

          <!-- 如果 access_level 为 1，显示皇冠 emoji -->
          <span v-else-if="accessLevel === 1" class="vip-crown">
            👑 VIP
          </span>
        </div>
      </nav>
    </header>

  <main style="display: flex; justify-content: space-between; flex-grow: 1;">
    <!-- 左栏，占页面宽度的70% -->
    <div style="flex: 0 0 70%; padding-right: 20px;">
      <div class="title-div">
        <h1 class="title">{{ this.paper.title }}</h1>
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
      <!-- 添加 @click 事件，触发刷新 -->
          <router-link 
          :to="'/paperView/' + paper.paper_id"
          :key="paper.paper_id"
          @click.native="forceReload(paper.paper_id)"
          >
            <p>{{ paper.title }}</p>
          </router-link>
        </div>
      </section>

      <!-- 相似论文列表 -->
      <section class="section" v-if="this.accessLevel === 1">
        <h3>相似论文列表</h3>
        <div v-for="paper in similarPapers" :key="paper.title" class="section div">
          <router-link 
          :to="'/paperView/' + paper.paper_id"
          :key="paper.paper_id"
          @click.native="forceReload(paper.paper_id)"
          >
            <p>{{ paper.title }}</p>
          </router-link>
        </div>
      </section>

      <!-- 同类论文列表 -->
      <section class="section" v-if="this.accessLevel === 1">
        <h3>同类论文列表</h3>
        <div v-for="paper in sameCategoryPapers" :key="paper.title" class="section div">
          <router-link 
          :to="'/paperView/' + paper.paper_id"
          :key="paper.paper_id"
          @click.native="forceReload(paper.paper_id)"
          >
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

.upgrade-btn {
  padding: 10px 20px;
  background-color: #28a745; /* 绿色背景 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.upgrade-btn:hover {
  background-color: #218838; /* 深绿色 */
}

.upgrade-btn:focus {
  outline: none;
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