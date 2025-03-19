<template>
  <div class="app-container home">
    <!-- 今日运营概况 -->
    <div class="overview-section">
      <div class="section-header compact">
        <div class="header-left">
          <span style="font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.4">今日运营概况</span>
        </div>
        <div class="header-right">
          <!-- <div class="date-display"> -->
            <span>{{ currentView === 'today' ? dashboardData.overview.dataTime : dashboardData.yesterday.dataTime }}</span>
          <!-- </div> -->
          <div class="refresh-button" @click="refreshData">
            <el-icon class="refresh-icon"><Refresh /></el-icon>
          </div>
          <div class="date-tabs">
            <span :class="{ active: currentView === 'today' }" @click="switchView('today')">今日</span>
            <span :class="{ active: currentView === 'yesterday' }" @click="switchView('yesterday')">昨日</span>
          </div>
        </div>
      </div>
      <span style="font-size: 12px; font-weight: 200; color: #1a1a1a; padding: 10px 10px 10px 10px">每日5:00点更新今日数据</span>
      <div class="stat-cards">
        <!-- 充电量卡片 -->
        <div class="stat-card">
          <div class="card-header">
            <div class="icon-wrapper orange">
              <el-icon>
                <DataLine />
              </el-icon>
            </div>
          </div>
          <div class="card-content">
            <div class="main-value">
              <div class="label section-title">充电量 (度)</div>
              <transition name="fade" mode="out-in">
                <div class="value" :key="currentView">
                  {{ formatNumber(currentView === 'today' ? dashboardData.overview.totalPower : dashboardData.yesterday.totalPower) }}
                </div>
              </transition>
            </div>
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
              <div class="label section-title">充电费用 (元)</div>
              <transition name="fade" mode="out-in">
                <div :key="currentView" class="value">
                  {{ formatNumber(currentView === 'today' ? dashboardData.overview.totalMoney : dashboardData.yesterday.totalMoney) }}
                </div>
              </transition>
            </div>
            <div class="income-right">
              <div class="fee-item">
                <div class="label section-title">服务费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ formatNumber(currentView === 'today' ? dashboardData.overview.totalServiceMoney : dashboardData.yesterday.totalServiceMoney) }}
                  </div>
                </transition>
              </div>
              <div class="fee-item">
                <div class="label section-title">电费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ formatNumber(currentView === 'today' ? dashboardData.overview.totalElecMoney : dashboardData.yesterday.totalElecMoney) }}
                  </div>
                </transition>
              </div>
            </div>
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
              <div class="label section-title">实际收入 (元)</div>
              <transition name="fade" mode="out-in">
                <div :key="currentView" class="value">
                  {{ formatNumber(currentView === 'today' ? dashboardData.overview.finalTotalMoney : dashboardData.yesterday.finalTotalMoney) }}
                </div>
              </transition>
            </div>
            <div class="income-right">
              <div class="fee-item">
                <div class="label section-title">服务费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ formatNumber(currentView === 'today' ? dashboardData.overview.finalServiceMoney : dashboardData.yesterday.finalServiceMoney) }}
                  </div>
                </transition>
              </div>
              <div class="fee-item">
                <div class="label section-title">电费 (元)</div>
                <transition name="fade" mode="out-in">
                  <div :key="currentView" class="value">
                    {{ formatNumber(currentView === 'today' ? dashboardData.overview.finalElecMoney : dashboardData.yesterday.finalElecMoney) }}
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
              <div class="label section-title">充电时长 (分钟)</div>
              <transition name="fade" mode="out-in">
                <div class="value" :key="currentView">
                  {{ formatNumber(Math.floor((currentView === 'today' ? dashboardData.overview.totalDuration : dashboardData.yesterday.totalDuration) / 60)) }}
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
              <div class="label section-title">服务次数</div>
              <transition name="fade" mode="out-in">
                <div class="value" :key="currentView">
                  {{ formatNumber(currentView === 'today' ? dashboardData.overview.servCount : dashboardData.yesterday.servCount) }}
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
              <div class="trend-stat-value">{{ formatNumber(dashboardData.trend.totalPower) }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">电费 (元)</div>
              <div class="trend-stat-value">{{ formatNumber(dashboardData.trend.totalElecMoney) }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">服务费 (元)</div>
              <div class="trend-stat-value">{{ formatNumber(dashboardData.trend.totalServMoney) }}</div>
            </div>
            <div class="trend-stat-card">
              <div class="trend-stat-label">服务次数 (次)</div>
              <div class="trend-stat-value">{{ formatNumber(dashboardData.trend.servCount) }}</div>
            </div>
          </div>
        </el-col>
        <!-- 右侧图表 -->
        <el-col :span="20">
          <div class="chart-wrapper trend-chart-wrapper">
            <div ref="trendChartRef" class="trend-chart"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Refresh } from '@element-plus/icons-vue';
import { getTodayData, getYesterdayData, getTrendData } from '@/api/kpSystem/dashboard';
import type { AggregateOrderVO } from '@/api/kpSystem/types';

// 图表容器引用
const chargingChartRef = ref<HTMLDivElement>();
const trendChartRef = ref<HTMLDivElement>();
const chargingInstant = ref<EChartsType | null>(null); // ECharts 实例
const trendInstant = ref<EChartsType | null>(null); // ECharts 实例

// 仪表盘数据
const currentView = ref('today');

// 刷新数据
const refreshData = () => {
  ElMessage.success('正在刷新数据...');
  initData();
};

const initData = () => {
  fetchTodayData();
  fetchTrendData();
};

const switchView = (view: 'today' | 'yesterday') => {
  currentView.value = view;
};

const initDateInfo: any = {
  dataTime: '',
  totalPower: 0, // 充电量
  totalElecMoney: 0, // 电费
  totalServiceMoney: 0, // 服务费
  finalTotalMoney: 0,
  finalElecMoney: 0,
  finalServiceMoney: 0,
  servCount: 0, // 服务次数
  totalMoney: 0, // 营收额
  totalDuration: 0 // 充电时长（分钟）
};

const dashboardData = reactive({
  overview: initDateInfo,
  yesterday: initDateInfo,
  charging: {
    today: new Array(48).fill(0),
    yesterday: new Array(48).fill(0)
  },
  powerDetails: {
    totalTopPower: 0, // 尖时电量
    totalPeakPower: 0, // 峰时电量
    totalFlatPower: 0, // 平时电量
    totalValleyPower: 0 // 谷时电量
  },
  trend: {
    schemaData: [], //30天曲线数据
    totalPower: 0, // 总充电量
    totalElecMoney: 0,
    totalServMoney: 0,
    servCount: 0
  }
});

// 初始化充电情况图表
const initChargingChart = () => {
  const charts = echarts.init(chargingChartRef.value);

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

  charts.setOption(option);
};

// 初始化近30天趋势图表
const initTrendChart = () => {
  const charts = echarts.init(trendChartRef.value);

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

    const dataTime = dashboardData.trend.schemaData.findLast((item) => item.dataTime == dateStr);
    if (dataTime) {
      dates.push(dataTime);
    } else {
      dates.push(defaultData);
    }
  }
  dashboardData.trend.schemaData = dates;

  const dataTime = dashboardData.trend.schemaData.map((item) => item.dataTime);
  const totalPower = dashboardData.trend.schemaData.map((item) => item.totalPower);
  const totalElecMoney = dashboardData.trend.schemaData.map((item) => item.totalElecMoney);
  const totalServiceMoney = dashboardData.trend.schemaData.map((item) => item.totalServiceMoney);
  const servCount = dashboardData.trend.schemaData.map((item) => item.servCount);

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
      show: true // 隐藏默认图例，使用自定义图例
      // top: '-10px'
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
        name: '电量/电费/服务费',
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
        name: '服务次数',
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

  charts.setOption(option);
};

// 获取今日数据
const fetchTodayData = async () => {
  const res = await getTodayData();
  if (res.code === 200) {
    const data = res.data as AggregateOrderVO;
    // 更新概览数据
    dashboardData.overview = data;

    // 更新电量详情数据
    dashboardData.powerDetails = {
      totalTopPower: data.totalTopPower || 0,
      totalPeakPower: data.totalPeakPower || 0,
      totalFlatPower: data.totalFlatPower || 0,
      totalValleyPower: data.totalValleyPower || 0
    };

    // 处理半小时统计数据
    // 解析 totalPowerInfo JSON 字符串
    const processedData = JSON.parse(data.totalPowerInfo);

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
    dashboardData.charging.today = hourlyData;
    fetchYesterdayData();
  } else {
    ElMessage.error(res.msg || '获取今日数据失败');
  }
};

// 获取昨日数据
const fetchYesterdayData = async () => {
  const res = await getYesterdayData();

  if (res.code === 200) {
    const data = res.data as AggregateOrderVO;
    // 更新昨日数据
    dashboardData.yesterday = data;

    // 处理半小时统计数据
    if (data.totalPowerInfo) {
      // 解析 totalPowerInfo JSON 字符串
      const processedData = JSON.parse(data.totalPowerInfo);
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
      dashboardData.charging.yesterday = hourlyData;
    }
    initChargingChart();
  } else {
    ElMessage.error(res.msg || '获取昨日数据失败');
  }
};

// 获取趋势数据
const fetchTrendData = async () => {
  const res = await getTrendData();
  const data = res.data;
  dashboardData.trend = data;
  initTrendChart();
};

// 格式化数值，去除0值的小数点
const formatNumber = (value: number) => {
  // 如果值为0或接近0，则返回整数0
  if (Math.abs(value) < 0.0001) {
    return 0;
  }
  // 否则返回原值
  return value;
};

onMounted(() => {
  initData();
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
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .date-display {
        font-size: 18px;
        color: #606266;
        background-color: #f5f7fa;
        padding: 6px 12px;
        border-radius: 8px;
      }

      .refresh-button {
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        background-color: #f5f7fa;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        &:hover {
          background-color: #ecf5ff;
          color: #409eff;
        }

        .refresh-icon {
          font-size: 16px;
        }
      }

      .info-icon {
        color: #8c8c8c;
        font-size: 16px;
        cursor: pointer;
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
      grid-template-columns: 0.5fr 1fr 1fr 0.5fr 0.5fr;
      gap: 12px;

      .stat-card {
        background: #fafbfc;
        border-radius: 12px;
        padding: 10px;
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
            font-size: 14px;
            margin-bottom: 8px;

            &.section-title {
              font-weight: 600;
              color: #1a1a1a;
            }
          }

          .value {
            color: #1a1a1a;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.1;
            margin-top: auto;
            height: 40px;
            display: flex;
            align-items: center;
          }

          .main-value {
            // margin-bottom: 6px;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            padding: 20px 16px;

            &.compact {
              margin-bottom: 4px;
            }

            .label {
              color: #8c8c8c;
              font-size: 14px;
              margin-bottom: 8px;

              &.section-title {
                font-weight: 600;
                color: #1a1a1a;
              }
            }

            .value {
              color: #1a1a1a;
              font-size: 32px;
              font-weight: 700;
              line-height: 1.2;
              margin-top: auto;
              margin-bottom: auto;
              height: 40px;
              display: flex;
              align-items: center;
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
                color: #1a1a1a;
                font-size: 14px;
                margin-bottom: 8px;

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
                height: 40px;
                display: flex;
                align-items: center;
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
                  color: #1a1a1a;
                  font-size: 14px;
                  margin-bottom: 8px;
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
      background-color: #fff;
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
        background: #fafbfc;
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
      background: #fff;
      border-radius: 10px;
      padding: 16px;
      height: 320px;
      display: flex;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.02);
      position: relative;
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
      background: #fafbfc;
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
