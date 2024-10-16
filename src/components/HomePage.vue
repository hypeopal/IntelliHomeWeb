<template>
  <div class="container">
    <aside class="sidebar">
      <h3>导航</h3>
      <ul>
        <li><router-link to="/home/view1">View 1</router-link></li>
        <li><router-link to="/home/view2">View 2</router-link></li>
      </ul>
    </aside>

    <main class="main-content">
      <!-- 显示对应的路由视图 -->
      <router-view />
    </main>
  </div>
  <button @click="handleLogout">登出</button>
</template>

<script>
export default {
  name: 'HomePage',

  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import "../css/home.css";
</style>