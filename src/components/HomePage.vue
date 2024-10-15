<template>
  <div class="home">
    <h2>Welcome to the Home Page</h2>
    <p>This is the main dashboard after successful login.</p>
  </div>
  <button @click="handleLogout">登出</button>
</template>

<script>
export default {
  name: 'HomePage',

  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
