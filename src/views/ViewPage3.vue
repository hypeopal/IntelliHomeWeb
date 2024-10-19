<template>
  <div class="app-container">
    <h1 class="title">Smart Home Devices</h1>

    <!-- 横向排列的菜单选择 -->
    <div class="selectors">
      <!-- 菜单选择 House -->
      <div class="select-container">
        <label for="house-select">Select House:</label>
        <select id="house-select" v-model="selectedHouseId" @change="onHouseChange">
          <option v-for="house in houses" :key="house.house_id" :value="house.house_id">
            {{ house.house_name }}
          </option>
        </select>
      </div>

      <!-- 菜单选择 Area -->
      <div class="select-container" v-if="selectedHouse && selectedHouse.areas_devices.length > 0">
        <label for="area-select">Select Area:</label>
        <select id="area-select" v-model="selectedAreaId" @change="onAreaChange">
          <option v-for="area in selectedHouse.areas_devices" :key="area.area_id" :value="area.area_id">
            {{ area.area_name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 设备列表展示 -->
    <div class="devices-section" v-if="selectedArea && selectedArea.devices.length > 0">
      <h2>Devices in {{ selectedArea.area_name }}:</h2>
      <div class="devices-container">
        <div class="device-item" v-for="device in selectedArea.devices" :key="device.device_id">
          <h3>{{ device.device_name }}</h3>
          <p><strong>MAC:</strong> {{ device.efuse_mac }}</p>
          <p><strong>Model:</strong> {{ device.chip_model }}</p>
          <p><strong>Type:</strong> {{ device.device_type.type_name }}</p>
        </div>
      </div>
    </div>

    <!-- 提示无设备 -->
    <div class="no-devices" v-if="selectedArea && selectedArea.devices.length === 0">
      <p>No devices found in this area.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {serverAddress} from "../../global";

export default {
  data() {
    return {
      houses: [],  // 保存从后端获取的houses数据
      selectedHouseId: null,  // 选中的house_id
      selectedAreaId: null,  // 选中的area_id
    };
  },
  computed: {
    selectedHouse() {
      return this.houses.find(house => house.house_id === this.selectedHouseId);
    },
    selectedArea() {
      return this.selectedHouse
          ? this.selectedHouse.areas_devices.find(area => area.area_id === this.selectedAreaId)
          : null;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(serverAddress + '/api/posts');
        this.houses = response.data.data.houses_devices;
        if (this.houses.length > 0) {
          this.selectedHouseId = this.houses[0].house_id;
          if (this.selectedHouse.areas_devices.length > 0) {
            this.selectedAreaId = this.selectedHouse.areas_devices[0].area_id;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    onHouseChange() {
      if (this.selectedHouse.areas_devices.length > 0) {
        this.selectedAreaId = this.selectedHouse.areas_devices[0].area_id;
      } else {
        this.selectedAreaId = null;
      }
    },
    onAreaChange() {

    }
  }
};
</script>

<style scoped>
@import "../css/list.css";
</style>
