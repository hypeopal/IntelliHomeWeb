<template>
  <div>
    <h2>View 1</h2>
    <p>这是 View 1 的内容。</p>
  </div>
  <div>
    <weather-chart/>
  </div>
</template>

<script>
import WeatherChart from "../components/WeatherChart.vue";

export default {
  name: "ViewPage1",
  components: {WeatherChart},
};
</script>
