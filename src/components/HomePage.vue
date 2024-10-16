<template>
  <div class="container">
    <header class="status-bar">
      <div class="user-info">
        用户：{{ currentUser }}
      </div>
      <div class="date-info">
        当前时间：{{ currentDate }}
      </div>
    </header>

    <div class="content-wrapper">
      <aside class="sidebar">
        <ul>
          <li>
            <router-link to="/home/view1">View 1</router-link>
          </li>
          <li>
            <router-link to="/home/view2">View 2</router-link>
          </li>
        </ul>
      </aside>
      <main class="main-content">
        <router-view/>
      </main>
    </div>
  </div>
  <button @click="handleLogout">登出</button>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      currentUser: '',
      currentDate: ''
    };
  },
  created() {
    this.currentUser = localStorage.getItem('username');
    this.updateDate();
    setInterval(this.updateDate, 1000);
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
    updateDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const hh = String(today.getHours()).padStart(2, '0');
      const min = String(today.getMinutes()).padStart(2, '0');
      const ss = String(today.getSeconds()).padStart(2, '0');
      this.currentDate = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }
  }
};
</script>

<style scoped>
@import "../css/home.css";
</style>