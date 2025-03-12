<template>
  <div class="app-container home">
    <!-- 今日运营概况 -->
    <div class="overview-section">
      <div class="section-header compact">
        <div class="header-left">
          <span style="font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.4">今日运营概况</span>
        </div>
        <div class="date-tabs">
          <span :class="{ active: currentView === 'today' }" @click="switchView('today')">今日</span>
          <span :class="{ active: currentView === 'yesterday' }" @click="switchView('yesterday')">昨日</span>
        </div>
      </div>
      <div class="stat-cards">
        <!-- 充电量卡片 -->
        <div class="stat-card">
          <div class="card-header">
            <div class="icon-wrapper orange">
              <el-icon>
                <DataLine />
              </el-icon>
            </div>
            <!-- <span class="detail-link">详情>></span> -->
          </div>
          <div class="card-content">
            <div class="label">充电量 (度)</div>
            <transition name="fade" mode="out-in">
              <div class="value" :key="currentView">{{ currentView === 'today' ? dashboardData.overview.chargeAmount : dashboardData.yesterday.chargeAmount }}</div>
            </transition>
          </div>
        </div>

        <!-- 收入卡片 -->
        <div class="stat-card wide">
          <div class="card-header">
            <div class="icon-wrapper cyan">
              <el-icon>
                <Wallet />
              </el-icon>
            </div>
          </div>
          <div class="card-content income-card">
            <div class="income-left">
              <div class="label section-title">收入 (元)</div>
              <transition name="fade" mode="out-in">
                <div :key="currentView" class="value">
                  {{ currentView === 'today' ? dashboardData.overview.revenueAmount : dashboardData.yesterday.revenueAmount}}
                </div>
              </transition>
            </div>
            <div class="income-right">
              <div class="fee-item">
                <div class="label">服务费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ currentView === 'today' ? dashboardData.overview.serviceFee : dashboardData.yesterday.serviceFee }}
                  </div>
                </transition>
              </div>
              <div class="fee-item">
                <div class="label">电费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ currentView === 'today' ? dashboardData.overview.electricityFee : dashboardData.yesterday.electricityFee }}
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- 充电时长卡片 -->
        <div class="stat-card">
          <div class="card-header">
            <div class="icon-wrapper purple">
              <el-icon>
                <Clock />
              </el-icon>
            </div>
          </div>
          <div class="card-content">
            <div class="main-value">
              <div class="label">充电时长 (分钟)</div>
              <transition name="fade" mode="out-in">
                <div class="value" :key="currentView">
                  {{ Math.floor((currentView === 'today' ? dashboardData.overview.chargeDuration : dashboardData.yesterday.chargeDuration) / 60) }}
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- 服务次数卡片 -->
        <div class="stat-card">
          <div class="card-header">
            <div class="icon-wrapper blue">
              <el-icon>
                <Operation />
              </el-icon>
            </div>
          </div>
          <div class="card-content">
            <div class="main-value">
              <div class="label">服务次数</div>
              <transition name="fade" mode="out-in">
                <div class="value" :key="currentView">
                  {{ currentView === 'today' ? dashboardData.overview.serviceCount : dashboardData.yesterday.serviceCount }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分时段充电情况 -->
    <div class="charging-section">
      <div class="section-header compact">
        <div class="header-left">
          <span style="font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.4">分时段充电情况</span>
          <!-- <el-icon class="info-icon">
            <InfoFilled />
          </el-icon> -->
        </div>
      </div>
      <el-row :gutter="16">
        <!-- 左侧电量列表 -->
        <el-col :span="4">
          <div class="charging-list">
            <!-- <div class="list-header">
              <span>电量统计</span>
              <span>今日</span>
            </div> -->
            <div class="list-item">
              <div class="label">尖时电量（度）</div>
              <div class="value">{{ dashboardData.powerDetails.totalTopPower }}</div>
            </div>
            <div class="list-item">
              <div class="label">峰时电量（度）</div>
              <div class="value">{{ dashboardData.powerDetails.totalPeakPower }}</div>
            </div>
            <div class="list-item">
              <div class="label">平时电量（度）</div>
              <div class="value">{{ dashboardData.powerDetails.totalFlatPower }}</div>
            </div>
            <div class="list-item">
              <div class="label">谷时电量（度）</div>
              <div class="value">{{ dashboardData.powerDetails.totalValleyPower }}</div>
            </div>
          </div>
        </el-col>
        <!-- 右侧图表 -->
        <el-col :span="20">
          <div class="chart-wrapper charging-chart-wrapper">
            <!-- <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color" style="background-color: #409eff"></div>
                <span class="legend-text">今天(度)</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background-color: #13c2c2"></div>
                <span class="legend-text">昨天(度)</span>
              </div>
            </div> -->
            <div ref="chargingChartRef" class="charging-chart"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 近30天充电趋势 -->
    <div class="trend-section">
      <div class="section-header compact">
        <div class="header-left">
          <span style="font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.4">近30天充电趋势</span>
        </div>
      </div>
      <el-row :gutter="16">
        <!-- 左侧统计数据 -->
        <el-col :span="4">
          <div class="trend-stats-container">
            <!-- <div class="trend-stat-title"><span class="trend-period">近30天</span></div> -->
            <div class="trend-stat-card">
              <div class="trend-stat-label">充电量 (度)</div>
              <div class="trend-stat-value">{{ dashboardData.trend.chargeAmount }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">电费 (元)</div>
              <div class="trend-stat-value">{{ dashboardData.trend.electricityFee }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">服务费 (元)</div>
              <div class="trend-stat-value">{{ dashboardData.trend.serviceFee }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">服务次数 (次)</div>
              <div class="trend-stat-value">{{ dashboardData.trend.serviceCount }}</div>
            </div>
          </div>
        </el-col>
        <!-- 右侧图表 -->
        <el-col :span="20">
          <div class="chart-wrapper trend-chart-wrapper">
            <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color" style="background-color: #409eff"></div>
                <span class="legend-text">充电量</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background-color: #67c23a"></div>
                <span class="legend-text">电费</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background-color: #8c44ff"></div>
                <span class="legend-text">服务费</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background-color: #ff9300"></div>
                <span class="legend-text">服务次数</span>
              </div>
            </div>
            <div ref="trendChartRef" class="trend-chart"></div>
            <div class="chart-axis-label right">度</div>
            <div class="chart-axis-label bottom">日期</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTooltip } from 'element-plus';
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import * as echarts from 'echarts';
import { Promotion, Money, Timer, Service, InfoFilled } from '@element-plus/icons-vue';
import { getTodayData, getYesterdayData, getTrendData } from '@/api/kpSystem/dashboard';
import type { AggregateOrderVO } from '@/api/kpSystem/types';

// 图表容器引用
const chargingChartRef = ref<HTMLElement>();
const trendChartRef = ref<HTMLElement>();

// 数据加载状态
const todayDataLoaded = ref(false);
const yesterdayDataLoaded = ref(false);
const trendDataLoaded = ref(false);

// 组件挂载状态
const isMounted = ref(true);

// 仪表盘数据
const currentView = ref('today');

const switchView = (view: 'today' | 'yesterday') => {
  currentView.value = view;
};

const dashboardData = reactive({
  overview: {
    chargeAmount: 0, // 充电量
    electricityFee: 0, // 电费
    serviceFee: 0, // 服务费
    serviceCount: 0, // 服务次数
    revenueAmount: 0, // 营收额
    chargeDuration: 0 // 充电时长（分钟）
  },
  yesterday: {
    chargeAmount: 0, // 充电量
    electricityFee: 0, // 电费
    serviceFee: 0, // 服务费
    serviceCount: 0, // 服务次数
    revenueAmount: 0, // 营收额
    chargeDuration: 0 // 充电时长（分钟）
  },
  powerDetails: {
    totalTopPower: 0, // 尖时电量
    totalPeakPower: 0, // 峰时电量
    totalFlatPower: 0, // 平时电量
    totalValleyPower: 0 // 谷时电量
  },
  charging: {
    today: new Array(48).fill(0),
    yesterday: new Array(48).fill(0)
  },
  trend: {
    dates: [], //30天曲线数据
    chargeAmount: 0, // 总充电量
    electricityFee: 0, // 总电费
    serviceFee: 0, // 总服务费
    serviceCount: 0 //总服务次数
  }
});

// 初始化充电情况图表
const initChargingChart = () => {
  // // 检查组件是否还挂载以及DOM引用是否存在
  // if (!isMounted.value || !chargingChartRef.value) {
  //   console.error('图表DOM引用不存在或组件已卸载');
  //   return;
  // }
  // // 检查DOM元素是否已从文档中移除
  // if (!document.body.contains(chargingChartRef.value)) {
  //   console.error('图表DOM元素已从文档中移除');
  //   return;
  // }
  // // 初始化图表前先检查DOM是否实际存在
  // if (!chargingChartRef.value.offsetWidth) {
  //   console.error('图表DOM元素大小异常:', chargingChartRef.value?.offsetWidth, chargingChartRef.value?.offsetHeight);
  //   // 尝试稍后重新初始化，但仅在组件仍然挂载时
  //   if (isMounted.value) {
  //     setTimeout(() => {
  //       if (isMounted.value) {
  //         initChargingChart();
  //       }
  //     }, 500);
  //   }
  //   return;
  // }
  const chart = echarts.init(chargingChartRef.value);

  // 生成时间点
  const timePoints = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i.toString().padStart(2, '0');
      const minute = (j * 30).toString().padStart(2, '0');
      timePoints.push(`${hour}:${minute}`);
    }
  }

  // 图表配置
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const time = timePoints[dataIndex];
        let tooltipText = `<div style="font-weight: bold; margin-bottom: 8px;">${time}</div>`;
        params.forEach((param) => {
          const marker = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${param.color};"></span>`;
          tooltipText += `<div style="margin: 3px 0;">${marker}${param.seriesName}: ${param.value} 度</div>`;
        });
        return tooltipText;
      }
    },
    legend: {
      data: ['今天(度)', '昨天(度)'],
      right: '0',
      top: '0',
      itemGap: 24,
      textStyle: {
        color: '#8C8C8C',
        fontSize: 12
      },
      itemStyle: {
        borderWidth: 0
      }
    },
    grid: {
      top: '40px',
      left: '2%',
      right: '2%',
      bottom: '10px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timePoints,
      axisLabel: {
        interval: 3,
        color: '#8C8C8C',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#D9D9D9'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '充电量(度)',
      nameTextStyle: {
        color: '#8C8C8C',
        fontSize: 12,
        padding: [0, 0, 0, 40],
        lineHeight: 16
      },
      axisLabel: {
        color: '#8C8C8C',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#F0F0F0'
        }
      }
    },
    series: [
      {
        name: '今天(度)',
        type: 'line',
        data: dashboardData.charging.today,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#1890FF',
          width: 2
        },
        itemStyle: {
          color: '#1890FF',
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(24, 144, 255, 0.1)'
              },
              {
                offset: 1,
                color: 'rgba(24, 144, 255, 0)'
              }
            ]
          }
        }
      },
      {
        name: '昨天(度)',
        type: 'line',
        data: dashboardData.charging.yesterday,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#13c2c2',
          width: 2
        },
        itemStyle: {
          color: '#13c2c2',
          borderWidth: 2
        }
      }
    ]
  };

  chart.setOption(option);

  // 图表内部的resize处理
  const chartResizeHandler = () => {
    if (chart && !chart.isDisposed()) {
      chart.resize();
    }
  };
  window.addEventListener('resize', chartResizeHandler);

  // 将此处理程序添加到全局处理程序
  if (typeof resizeHandler === 'function') {
    const originalResizeHandler = resizeHandler;
    resizeHandler = () => {
      if (!isMounted.value) return;
      originalResizeHandler();
      chartResizeHandler();
    };
  }

  // 返回清理函数，在组件卸载或图表重新创建时调用
  return () => {
    window.removeEventListener('resize', chartResizeHandler);
    if (chart && !chart.isDisposed()) {
      chart.dispose();
    }
  };
};

// 初始化近30天趋势图表
const initTrendChart = () => {
  if (!trendChartRef.value) return;
  const chart = echarts.init(trendChartRef.value);
  const colors = ['#1890FF', '#13c2c2', '#722ED1', '#FA8C16'];

  const dates = [];
  const now = new Date();
  for (let i = 30; i > 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // 创建默认值对象
    const defaultData = {
      dataTime: dateStr.slice(5),
      totalPower: 0,
      totalElecMoney: 0,
      totalServiceMoney: 0,
      servCount: 0
    };

    const dataTime = dashboardData.trend.dates.findLast((item) => item.dataTime == dateStr);
    if (dataTime) {
      dates.push(dataTime);
    } else {
      dates.push(defaultData);
    }
  }
  dashboardData.trend.dates = dates;

  const dataTime = dashboardData.trend.dates.map((item) => item.dataTime);
  const totalPower = dashboardData.trend.dates.map((item) => item.totalPower);
  const totalElecMoney = dashboardData.trend.dates.map((item) => item.totalElecMoney);
  const totalServiceMoney = dashboardData.trend.dates.map((item) => item.totalServiceMoney);
  const servCount = dashboardData.trend.dates.map((item) => item.servCount);

  // 图表配置
  const option = {
    color: ['#409eff', '#67c23a', '#8c44ff', '#ff9300'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((item) => {
          if (item.seriesName === '服务次数') {
            result += `${item.marker}${item.seriesName}：${item.value} 次<br/>`;
          } else if (item.seriesName === '充电量') {
            result += `${item.marker}${item.seriesName}：${item.value} 度<br/>`;
          } else {
            result += `${item.marker}${item.seriesName}：${item.value} 元<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['充电量', '电费', '服务费', '服务次数'],
      show: false // 隐藏默认图例，使用自定义图例
    },
    grid: {
      top: '40px',
      left: '2%',
      right: '2%',
      bottom: '10px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dataTime,
      axisLabel: {
        interval: 2,
        color: '#909399',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#DCDFE6'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '',
        position: 'left',
        axisLabel: {
          color: '#909399',
          fontSize: 12,
          formatter: '{value}'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#EBEEF5',
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: '',
        position: 'right',
        axisLabel: {
          color: '#909399',
          fontSize: 12,
          formatter: '{value}'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '充电量',
        type: 'bar',
        barWidth: '6px',
        data: totalPower,
        itemStyle: {
          color: '#409eff',
          borderRadius: [2, 2, 0, 0]
        }
      },
      {
        name: '电费',
        type: 'bar',
        barWidth: '6px',
        data: totalElecMoney,
        itemStyle: {
          color: '#67c23a',
          borderRadius: [2, 2, 0, 0]
        }
      },
      {
        name: '服务费',
        type: 'bar',
        barWidth: '6px',
        data: totalServiceMoney,
        itemStyle: {
          color: '#8c44ff',
          borderRadius: [2, 2, 0, 0]
        }
      },
      {
        name: '服务次数',
        type: 'line',
        yAxisIndex: 1,
        data: servCount,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#ff9300',
          borderWidth: 2,
          borderColor: '#fff'
        },
        lineStyle: {
          color: '#ff9300',
          width: 2
        }
      }
    ]
  };

  chart.setOption(option);

  // 图表内部的resize处理
  const chartResizeHandler = () => {
    if (chart && !chart.isDisposed()) {
      chart.resize();
    }
  };
  window.addEventListener('resize', chartResizeHandler);

  // 将此处理程序添加到全局处理程序
  if (typeof resizeHandler === 'function') {
    const originalResizeHandler = resizeHandler;
    resizeHandler = () => {
      if (!isMounted.value) return;
      originalResizeHandler();
      chartResizeHandler();
    };
  }

  // 返回清理函数，在组件卸载或图表重新创建时调用
  return () => {
    window.removeEventListener('resize', chartResizeHandler);
    if (chart && !chart.isDisposed()) {
      chart.dispose();
    }
  };
};

// 图表清理函数
let disposeChargingChart: (() => void) | null = null;
let disposeTrendChart: (() => void) | null = null;

// 全局resize事件处理函数
let resizeHandler = () => {
  // 仅在组件挂载状态下处理resize
  if (!isMounted.value) return;
};

// 初始化方法
onMounted(() => {
  console.log('组件挂载完成，开始获取数据...');
  isMounted.value = true;
  loadAllData();
  // 添加resize事件监听
  window.addEventListener('resize', resizeHandler);
});

// 添加activated钩子，处理keep-alive情况
onActivated(() => {
  console.log('组件被重新激活，检查数据是否需要刷新');
  if (isMounted.value) {
    loadAllData();
  }
});

// 监听路由变化
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();
onBeforeRouteUpdate((to, from) => {
  console.log('检测到路由变化，重新加载数据');
  if (to.path === '/' && isMounted.value) {
    loadAllData();
  }
});

// 统一的数据加载函数
const loadAllData = () => {
  console.log('开始加载所有数据...');
  // 重置状态
  todayDataLoaded.value = false;
  yesterdayDataLoaded.value = false;
  trendDataLoaded.value = false;
  // 请求数据
  fetchTodayData();
  fetchYesterdayData();
  fetchTrendData();
};

// 组件卸载时清理资源
onUnmounted(() => {
  console.log('组件卸载，清理资源...');
  isMounted.value = false;

  // 清理图表实例
  if (disposeChargingChart) {
    disposeChargingChart();
    disposeChargingChart = null;
  }

  if (disposeTrendChart) {
    disposeTrendChart();
    disposeTrendChart = null;
  }

  // 移除事件监听器
  window.removeEventListener('resize', resizeHandler);
});

// 获取今日数据
const fetchTodayData = async () => {
  todayDataLoaded.value = false;
  try {
    const res = await getTodayData();
    if (res.code === 200) {
      const data = res.data as AggregateOrderVO;
      // 更新概览数据
      dashboardData.overview = {
        chargeAmount: data?.totalPower,
        electricityFee: data?.totalElecMoney,
        serviceFee: data?.totalServiceMoney,
        serviceCount: data?.servCount,
        revenueAmount: data?.totalMoney,
        chargeDuration: data?.totalDuration
      };

      // 更新电量详情数据
      dashboardData.powerDetails = {
        totalTopPower: data.totalTopPower || 0,
        totalPeakPower: data.totalPeakPower || 0,
        totalFlatPower: data.totalFlatPower || 0,
        totalValleyPower: data.totalValleyPower || 0
      };

      // 处理半小时统计数据
      console.log('今日数据获取成功:', data);
      console.log('totalPowerInfo:', typeof data.totalPowerInfo, data.totalPowerInfo);
      if (data.totalPowerInfo) {
        try {
          // 解析 totalPowerInfo JSON 字符串
          const powerInfoData = JSON.parse(data.totalPowerInfo);
          console.log('解析后的今日电量数据:', powerInfoData);
          // 如果是字符串，再次解析一次(有时服务端返回多层JSON字符串)
          let processedData = powerInfoData;
          if (typeof processedData === 'string') {
            try {
              processedData = JSON.parse(processedData);
              console.log('再次解析后的数据:', processedData);
            } catch (e) {
              console.error('再次解析失败', e);
            }
          }

          // 如果数据是JSON对象但没有具体的时间点属性，尝试取其中的data属性
          if (processedData && typeof processedData === 'object' && !processedData['00:00'] && processedData.data) {
            processedData = processedData.data;
            console.log('从对象中提取data属性:', processedData);
          }

          // 创建一个包含48个半小时的数组
          const hourlyData = new Array(48).fill(0);

          // 遍历时间点并填充数据
          let index = 0;
          for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const timeKey = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              if (processedData[timeKey] !== undefined) {
                hourlyData[index] = powerInfoData[timeKey];
              }
              index++;
            }
          }
          console.log('处理后的今日电量数据数组:', hourlyData);
          dashboardData.charging.today = hourlyData;
        } catch (error) {
          console.error('解析 totalPowerInfo 出错', error);
          // 如果解析失败，使用随机数据
          const totalPower = data.totalPower || 0;
          dashboardData.charging.today = generateHalfHourDistribution(totalPower);
        }
      } else {
        // 如果没有相关数据，根据总量生成模拟数据
        const totalPower = data.totalPower || 0;
        dashboardData.charging.today = generateHalfHourDistribution(totalPower);
      }

      // 响应式更新状态
      todayDataLoaded.value = true;
      console.log('今日数据加载完成，设置 todayDataLoaded =', todayDataLoaded.value);

      // 在两个数据都加载完成后初始化图表
      if (todayDataLoaded.value && yesterdayDataLoaded.value && isMounted.value) {
        console.log('两天数据都已加载，开始初始化图表');
        setTimeout(() => {
          if (isMounted.value) {
            // 再次检查组件是否仍然挂载
            // 清理之前的图表实例
            if (disposeChargingChart) {
              disposeChargingChart();
            }
            // 初始化并保存清理函数
            disposeChargingChart = initChargingChart();
          }
        }, 100); // 使用setTimeout确保DOM已更新
      } else {
        console.log('等待昨日数据加载完成...');
      }
    } else {
      ElMessage.error(res.msg || '获取今日数据失败');
    }
  } catch (error) {
    console.error('获取今日数据出错', error);
    ElMessage.error('获取今日数据出错');
  }
};

// 获取昨日数据
const fetchYesterdayData = async () => {
  yesterdayDataLoaded.value = false;
  try {
    const res = await getYesterdayData();

    if (res.code === 200) {
      const data = res.data as AggregateOrderVO;

      // 更新昨日数据
      dashboardData.yesterday.chargeAmount = data?.totalPower;
      dashboardData.yesterday.electricityFee = data?.totalElecMoney;
      dashboardData.yesterday.serviceFee = data?.totalServiceMoney;
      dashboardData.yesterday.serviceCount = data?.servCount;
      dashboardData.yesterday.revenueAmount = data?.totalMoney;
      dashboardData.yesterday.chargeDuration = data?.totalDuration;

      // 处理半小时统计数据
      if (data.totalPowerInfo) {
        try {
          // 解析 totalPowerInfo JSON 字符串
          const powerInfoData = JSON.parse(data.totalPowerInfo);
          console.log('解析后的昨日电量数据:', powerInfoData);
          // 如果是字符串，再次解析一次(有时服务端返回多层JSON字符串)
          let processedData = powerInfoData;
          if (typeof processedData === 'string') {
            try {
              processedData = JSON.parse(processedData);
              console.log('再次解析后的昨日数据:', processedData);
            } catch (e) {
              console.error('再次解析失败', e);
            }
          }

          // 如果数据是JSON对象但没有具体的时间点属性，尝试取其中的data属性
          if (processedData && typeof processedData === 'object' && !processedData['00:00'] && processedData.data) {
            processedData = processedData.data;
            console.log('从对象中提取昨日data属性:', processedData);
          }

          // 创建一个包含48个半小时的数组
          const hourlyData = new Array(48).fill(0);

          // 遍历时间点并填充数据
          let index = 0;
          for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const timeKey = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              if (processedData[timeKey] !== undefined) {
                hourlyData[index] = processedData[timeKey];
              }
              index++;
            }
          }
          console.log('处理后的昨日电量数据数组:', hourlyData);
          dashboardData.charging.yesterday = hourlyData;
        } catch (error) {
          console.error('解析 totalPowerInfo 出错', error);
          // 如果解析失败，使用随机数据
          const totalPower = data.totalPower || 0;
          dashboardData.charging.yesterday = generateHalfHourDistribution(totalPower);
        }
      } else if ((data as any).chargingByHalfHour) {
        // 使用已有的半小时数据
        dashboardData.charging.yesterday = (data as any).chargingByHalfHour;
      } else {
        // 如果没有相关数据，根据总量生成模拟数据
        const totalPower = data.totalPower || 0;
        dashboardData.charging.yesterday = generateHalfHourDistribution(totalPower);
      }

      // 响应式更新状态
      yesterdayDataLoaded.value = true;
      console.log('昨日数据加载完成，设置 yesterdayDataLoaded =', yesterdayDataLoaded.value);

      // 在两个数据都加载完成后初始化图表
      if (todayDataLoaded.value && yesterdayDataLoaded.value) {
        console.log('两天数据都已加载，开始初始化图表');
        setTimeout(() => {
          initChargingChart();
        }, 100); // 使用setTimeout确保DOM已更新
      } else {
        console.log('等待今日数据加载完成...');
      }
    } else {
      ElMessage.error(res.msg || '获取昨日数据失败');
    }
  } catch (error) {
    console.error('获取昨日数据出错', error);
    ElMessage.error('获取昨日数据出错');
  }
};

// 生成半小时充电量的随机分布
// 根据给定的总量，生成一天48个半小时的数据分布
// 考虑常规充电规律，早晨和晚上显示峰值
// 如果后端接口提供了具体分布，应使用真实数据代替此函数生成的数据
const generateHalfHourDistribution = (totalPower) => {
  // 初始化数组保存48个点（一天的半小时数）
  const distribution = new Array(48).fill(0);

  if (totalPower <= 0) return distribution;

  // 定义几个峰值时段（早上7-9点，下午18-20点）
  const peakMorningStart = 14; // 7:00
  const peakMorningEnd = 18; // 9:00
  const peakEveningStart = 36; // 18:00
  const peakEveningEnd = 40; // 20:00

  // 生成各时段的比例
  for (let i = 0; i < 48; i++) {
    // 早晨峰值
    if (i >= peakMorningStart && i <= peakMorningEnd) {
      distribution[i] = Math.random() * 0.5 + 1.5; // 1.5-2.0的权重
    }
    // 晚上峰值
    else if (i >= peakEveningStart && i <= peakEveningEnd) {
      distribution[i] = Math.random() * 0.7 + 1.8; // 1.8-2.5的权重
    }
    // 夜间低谷（00:00-06:00）
    else if (i < 12) {
      distribution[i] = Math.random() * 0.2; // 0-0.2的权重
    }
    // 其他时段
    else {
      distribution[i] = Math.random() * 0.5 + 0.5; // 0.5-1.0的权重
    }
  }

  // 计算权重总和
  const weightSum = distribution.reduce((sum, val) => sum + val, 0);

  // 根据权重分配总量
  return distribution.map((weight) => {
    return parseFloat(((weight / weightSum) * totalPower).toFixed(3));
  });
};

// 获取趋势数据
const fetchTrendData = async () => {
  trendDataLoaded.value = false;
  try {
    const res = await getTrendData();
    if (res.code === 200) {
      const data = res.data;
      dashboardData.trend = {
        dates: data.schemaData,
        chargeAmount: data.totalPower,
        electricityFee: data.totalElecMoney,
        serviceFee: data.totalServMoney,
        serviceCount: data.servCount
      };
      initTrendChart();
    } else {
      ElMessage.error(res.msg || '获取趋势数据失败');
    }
  } catch (error) {
    console.error('获取趋势数据出错', error);
    ElMessage.error('获取趋势数据出错');
  }
};

onMounted(() => {
  fetchTodayData();
  fetchYesterdayData();
  fetchTrendData();
});
</script>

<style scoped lang="scss">
.home {
  padding: 20px;
  background-color: #f8f9fa;

  .overview-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .chart-wrapper {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 16px;
      height: 320px;
      display: flex;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.02);
      position: relative;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      &.compact {
        margin-bottom: 16px;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;

        .title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .section-title {
          font-size: 18px !important;
          font-weight: 600 !important;
          color: #1a1a1a !important;
          line-height: 1.4 !important;
          display: inline-block !important;
          position: relative !important;
        }

        .info-icon {
          color: #8c8c8c;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .date-tabs {
        display: flex;
        gap: 2px;
        background: #f0f2f5;
        padding: 3px;
        border-radius: 8px;

        span {
          padding: 8px 18px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          color: #595959;
          transition: all 0.3s;
          font-weight: 500;

          &:hover {
            color: #262626;
          }

          &.active {
            background-color: #fff;
            color: #1a1a1a;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          }
        }
      }
    }

    .stat-cards {
      display: grid;
      grid-template-columns: 1fr 1.5fr repeat(2, 1fr);
      gap: 12px;

      .stat-card {
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: all 0.3s ease;

        &.wide {
          grid-column: span 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .icon-wrapper {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;

            &.orange {
              background-color: rgba(250, 140, 22, 0.1);
              color: #fa8c16;
            }

            &.cyan {
              background-color: rgba(6, 48, 48, 0.1);
              color: #063030;
            }

            &.purple {
              background-color: rgba(114, 46, 209, 0.1);
              color: #722ed1;
            }

            &.blue {
              background-color: rgba(24, 144, 255, 0.1);
              color: #1890ff;
            }
          }

          .detail-link {
            color: #1890ff;
            font-size: 12px;
            cursor: pointer;
          }
        }

        .card-content {
          padding-top: 2px;
          display: flex;
          flex-direction: column;
          height: 80px;

          .label {
            color: #8c8c8c;
            font-size: 12px;
            margin-bottom: 12px;
          }

          .value {
            color: #1a1a1a;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.1;
            margin-top: auto;
          }

          .main-value {
            margin-bottom: 6px;
            display: flex;
            flex-direction: column;
            height: 100%;
            
            &.compact {
              margin-bottom: 4px;
            }

            .label {
              color: #8c8c8c;
              font-size: 14px;
              margin-bottom: 8px;
            }

            .value {
              color: #1a1a1a;
              font-size: 32px;
              font-weight: 700;
              line-height: 1.2;
              margin-top: auto;
              margin-bottom: auto;
            }
          }

          // 新的收入卡片样式
          &.income-card {
            display: flex;
            flex-direction: row;
            padding: 0;
            height: auto;
            
            .income-left {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              padding: 20px 16px;
              width: 100%;
              height: 100%;
              
              .label {
                color: #8c8c8c;
                font-size: 14px;
                margin-bottom: 10px;
                
                &.section-title {
                  font-weight: 600;
                  color: #1a1a1a;
                }
              }
              
              .value {
                color: #1a1a1a;
                font-size: 36px;
                font-weight: 700;
                line-height: 1.2;
              }
            }
            
            .income-right {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              width: 100%;
              padding: 5px 16px;
              height: 100%;
              border-left: 1px solid #f0f0f0;
              
              .fee-item {
                margin-bottom: 15px;
                
                &:last-child {
                  margin-bottom: 0;
                }
                
                .label {
                  color: #8c8c8c;
                  font-size: 14px;
                  margin-bottom: 6px;
                }
                
                .value {
                  font-size: 24px;
                  font-weight: 600;
                  color: #262626;
                }
              }
            }
          }
          
          .sub-values {
            .value-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 6px 0;
              border-top: 1px solid #f5f5f5;

              &:last-child {
                margin-bottom: 0;
              }

              .label {
                color: #8c8c8c;
                font-size: 14px;
                margin-bottom: 0;
              }

              .value {
                color: #262626;
                font-size: 16px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  .charging-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .tip-text {
      font-size: 13px;
      color: #8c8c8c;
      margin-top: 6px;
      font-style: italic;
    }
    .chart-wrapper {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 16px;
      height: 320px;
      display: flex;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.02);
      position: relative;
    }
    
    .charging-chart-wrapper {
      flex-direction: column;
      padding-top: 32px;
      background-color: #ffffff;
    }

    .chart-legend {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 10px;
      padding: 0 10px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-text {
      font-size: 13px;
      color: #606266;
    }

    .chart-axis-label {
      position: absolute;
      color: #909399;
      font-size: 12px;

      &.right {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.bottom {
        bottom: 5px;
        right: 10px;
      }
    }

    .charging-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;

      .list-header {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .list-item {
        background: #fff;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;

        .label {
          font-size: 13px;
          color: #606266;
          margin-bottom: 6px;
        }

        .value {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
        }
      }
    }

    .charging-chart,
    .trend-chart {
      min-height: 260px;
      height: 100%;
      width: 100%;
    }
  }

  .trend-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    
    .chart-wrapper {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 16px;
      height: 320px;
      display: flex;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.02);
      position: relative;
    }

    .stat-list {
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
      
      &.compact {
        .list-header, .stat-item {
          padding: 8px 12px;
        }
      }

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        color: #262626;
        font-size: 14px;
        font-weight: 600;
      }

      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        border-bottom: 1px solid #f0f0f0;

        &.no-border,
        &:last-child {
          border-bottom: none;
        }

        .label {
          color: #606266;
          font-size: 14px;
        }

        .value {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
        }
      }
    }
    .trend-chart {
      min-height: 260px;
      height: 100%;
      width: 100%;
    }

    .trend-chart-wrapper {
      flex-direction: column;
      padding-top: 10px;
      background-color: #ffffff;
    }

    .chart-legend {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 10px;
      padding: 0 10px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-text {
      font-size: 13px;
      color: #606266;
    }

    .chart-axis-label {
      position: absolute;
      color: #909399;
      font-size: 12px;

      &.right {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.bottom {
        bottom: 5px;
        right: 10px;
      }
    }

    .trend-stats-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;
    }

    .trend-stat-title {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .trend-period {
      font-size: 13px;
      color: #606266;
      font-weight: normal;
    }

    .trend-stat-card {
      background: #fff;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    }

    .trend-stat-label {
      font-size: 13px;
      color: #606266;
      margin-bottom: 6px;
    }

    .trend-stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }
}
/* 添加过渡动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: 
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
