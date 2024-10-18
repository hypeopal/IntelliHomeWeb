<template>
  <div class="container">
    <header class="status-bar">
      <div class="user-info" @click="toggleMenu">
         用户：{{ currentUser }}
        <ul v-if="isMenuVisible" class="dropdown-menu">
          <li><router-link class="menu-selector" to="/profile">个人中心</router-link></li>
          <li><router-link class="menu-selector" to="/settings">设置</router-link></li>
        </ul>
      </div>
      <div class="date-info">
        今日天气：{{ weather }} | 当前时间：{{ currentDate }}
        <button @click="handleLogout" class="logout-button">登出</button>
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
</template>

<script>
//import {getCityId, getWeatherToday} from "@/js/GetWeather";

export default {
  name: 'HomePage',
  data() {
    return {
      currentUser: '',
      currentDate: '',
      isMenuVisible: false,
      weather: '晴 25°C',
    };
  },
  async created() {
    // const cityId = await getCityId('成都');
    // const weatherToday = await getWeatherToday(cityId);
    // this.weather = `${weatherToday.weather} ${weatherToday.temp[0]}-${weatherToday.temp[1]}°C`;
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
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    }
  }
};
</script>

<style scoped>
@import "../css/home.css";
</style>