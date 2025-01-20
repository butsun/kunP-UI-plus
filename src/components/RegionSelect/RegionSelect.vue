<template>
  <div class="region-select">
    <el-form-item :label="label" :prop="prop" class="region-form-item">
      <el-select
        v-model="selectedProvince"
        :placeholder="provincePlaceholder"
        clearable
        @change="handleProvinceChange"
        @clear="handleProvinceClear"
        class="region-select__item"
      >
        <el-option
          v-for="item in provinceList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="selectedCity"
        :placeholder="cityPlaceholder"
        clearable
        :disabled="!selectedProvince"
        @change="handleCityChange"
        @clear="handleCityClear"
        class="region-select__item"
      >
        <el-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getAreaChildList } from '@/api/system/region';

interface RegionOption {
  label: string;  // 显示名称
  value: string;  // ID
  name: string;   // 实际名称
}

// 定义组件属性
const props = defineProps({
  // 表单标签
  label: {
    type: String,
    default: '地区'
  },
  // 表单字段名
  prop: {
    type: [String, Array],
    default: ''
  },
  // 省份下拉框占位符
  provincePlaceholder: {
    type: String,
    default: '请选择省份'
  },
  // 城市下拉框占位符
  cityPlaceholder: {
    type: String,
    default: '请选择城市'
  },
  // 省份值
  province: {
    type: String,
    default: ''
  },
  // 城市值
  city: {
    type: String,
    default: ''
  }
});

// 定义组件事件
const emit = defineEmits(['update:province', 'update:city', 'change']);

// 数据
const selectedProvince = ref('');
const selectedCity = ref('');
const provinceList = ref<RegionOption[]>([]);
const cityList = ref<RegionOption[]>([]);

// 获取省份列表
const getProvinceList = async () => {
  try {
    const res = await getAreaChildList(0);
    if (res.code === 200 && res.data) {
      provinceList.value = res.data.map((item: any) => ({
        label: item.name,
        value: item.id,
        name: item.name
      }));
    }
  } catch (error) {
    console.error('获取省份列表失败:', error);
  }
};

// 获取城市列表
const getCityList = async (provinceId: string) => {
  try {
    const res = await getAreaChildList(provinceId);
    if (res.code === 200 && res.data) {
      cityList.value = res.data.map((item: any) => ({
        label: item.name,
        value: item.id,
        name: item.name
      }));
    }
  } catch (error) {
    console.error('获取城市列表失败:', error);
  }
};

// 处理省份变化
const handleProvinceChange = (value: string) => {
  selectedProvince.value = value;
  selectedCity.value = '';
  cityList.value = [];
  
  const province = provinceList.value.find(p => p.value === value);
  emit('update:province', province?.name || '');
  emit('update:city', '');
  emit('change', { 
    province: province?.name || '', 
    city: '',
    provinceId: value,
    cityId: ''
  });
  
  if (value) {
    getCityList(value);
  }
};

// 处理城市变化
const handleCityChange = (value: string) => {
  selectedCity.value = value;
  const province = provinceList.value.find(p => p.value === selectedProvince.value);
  const city = cityList.value.find(c => c.value === value);
  
  emit('update:city', city?.name || '');
  emit('change', { 
    province: province?.name || '', 
    city: city?.name || '',
    provinceId: selectedProvince.value,
    cityId: value
  });
};

// 处理省份清空
const handleProvinceClear = () => {
  selectedProvince.value = '';
  selectedCity.value = '';
  cityList.value = [];
  emit('update:province', '');
  emit('update:city', '');
  emit('change', { 
    province: '', 
    city: '',
    provinceId: '',
    cityId: ''
  });
};

// 处理城市清空
const handleCityClear = () => {
  selectedCity.value = '';
  const province = provinceList.value.find(p => p.value === selectedProvince.value);
  
  emit('update:city', '');
  emit('change', { 
    province: province?.name || '', 
    city: '',
    provinceId: selectedProvince.value,
    cityId: ''
  });
};

// 监听props变化
watch(() => props.province, (newVal) => {
  if (newVal) {
    const province = provinceList.value.find(p => p.name === newVal);
    if (province) {
      selectedProvince.value = province.value;
      getCityList(province.value);
    }
  } else {
    selectedProvince.value = '';
  }
}, { immediate: true });

watch(() => props.city, (newVal) => {
  if (newVal) {
    const city = cityList.value.find(c => c.name === newVal);
    if (city) {
      selectedCity.value = city.value;
    }
  } else {
    selectedCity.value = '';
  }
}, { immediate: true });

// 组件挂载时获取省份列表
onMounted(() => {
  getProvinceList();
});
</script>

<style lang="scss" scoped>
.region-select {
  .region-select__item {
    width: 180px;
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.region-form-item {
  :deep(.el-form-item__content) {
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>
