<template>
  <div class="container">
    <header class="status-bar">
      <div class="logo" style="cursor: pointer" @click="goToHomePage">
        Intelli Home
      </div>
      <div class="date-info">
        当前天气：
        <img :src="require(`qweather-icons/icons/${weatherIcon}.svg`)" alt="icon"/>
         {{ weather }} | 当前时间：{{ currentDate }}
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
          <li>
            <router-link to="/home/view3">View 3</router-link>
          </li>
        </ul>
        <div class="user-info-section">
          <hr class="menu-divider" />
          <ul class="menu-options">
            <li><router-link class="menu-selector" to="/profile">个人中心</router-link></li>
            <li><router-link class="menu-selector" to="/settings">设置</router-link></li>
          </ul>
          <div class="user-info">
            用户：{{ currentUser }}
          </div>
        </div>
      </aside>
      <main class="main-content">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
//import {getCityId, getWeatherNow} from "@/js/GetWeather";

export default {
  name: 'HomePage',
  data() {
    return {
      currentUser: '',
      currentDate: '',
      weather: '晴 25°C',
      weatherIcon: '100',
    };
  },
  async created() {
    // const cityId = await getCityId('成都');
    // const weatherNow = await getWeatherNow(cityId);
    // this.weather = `${weatherNow.weather} ${weatherNow.temp}°C`;
    // this.weatherIcon = `${weatherNow.icon}`;
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
    goToHomePage() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
@import "../css/home.css";
</style>