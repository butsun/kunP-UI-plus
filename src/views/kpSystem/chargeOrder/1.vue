<template>
  <el-table :data="tableData" @expand-change="handleExpandChange">
    <el-table-column type="expand">
      <template #default="scope">
        <div v-if="scope.row.detailsLoaded" class="order-detail">
          <!-- 订单详情 -->
          <div class="header">
            <div class="detail-title" :style="`font-size: var(--el-font-size-large)`">订单详情</div>
          </div>
          <div class="detail-container">
            <div class="order-status">
              <dict-tag :options="kp_start_charge_seq_stat" :value="scope.row.form.startChargeSeqStat" />
            </div>
            <div m="4">
              <div>
                <p m="t-0 b-2">订单编号: {{ scope.row.form.startChargeSeq }}</p>
                <p m="t-0 b-2">充电凭证:{{ scope.row.form.voucherNo }}</p>
                <p m="t-0 b-2">启动方式: {{ scope.row.form.startType }}</p>
                <p m="t-0 b-2">充电量: {{ scope.row.form.totalPower }}</p>
              </div>
              <div class="flex">
                <p m="t-0 b-2">开始充电时间: {{ scope.row.form.startTime }}</p>
                <p m="t-0 b-2">结束充电: {{ scope.row.form.endTime }}</p>
              </div>
              <p m="t-0 b-2">充电结束原因: {{ scope.row.form.stopReason }}</p>
            </div>
          </div>

          <!-- 设备信息 -->
          <div class="header">
            <div class="detail-title" :style="`font-size: var(--el-font-size-large)`">设备信息</div>
          </div>
          <div class="detail-container">
            <div m="4">
              <div class="flex">
                <p m="t-0 b-2">充电设备: {{ scope.row.form.equipmentNo }}</p>
                <p m="t-0 b-2">站点: {{ scope.row.form.stationName }}</p>
                <p m="t-0 b-2">运营商: {{ scope.row.form.operatorName }}</p>
              </div>
              <div class="flex">
                <p m="t-0 b-2">枪口编号: {{ scope.row.form.connectorNo }}</p>
              </div>
              <div class="flex">
                <p m="t-0 b-2">电流:{{ scope.row.form.current }}</p>
                <p m="t-0 b-2">电压:{{ scope.row.form.voltage }}</p>
                <p m="t-0 b-2">soc:{{ scope.row.form.soc }}</p>
              </div>
            </div>
          </div>

          <!-- 费用信息 -->
          <div class="header">
            <div class="detail-title" :style="`font-size: var(--el-font-size-large)`">费用信息</div>
          </div>
          <div class="detail-container">
            <div m="4">
              <div class="flex">
                <p m="t-0 b-2">电费（元）: {{ scope.row.form.elecMoney }}</p>
                <p m="t-0 b-2">优惠后电费（元）: {{ scope.row.form.finalElecMoney }}</p>
              </div>
              <div class="flex">
                <p m="t-0 b-2">服务费（元）: {{ scope.row.form.serviceMoney }}</p>
                <p m="t-0 b-2">优惠后服务费（元）: {{ scope.row.form.finalServiceMoney }}</p>
              </div>
              <div class="flex">
                <p m="t-0 b-2"></p>
                <p m="t-0 b-2" class="money">总金额（元）: {{ scope.row.form.finalTotalMoney }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="loading-text">加载中...</div>
      </template>
    </el-table-column>
    <!-- 其他列 -->
  </el-table>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 表格数据（响应式）
const tableData = ref([
  { id: 1, name: '订单1', detailsLoaded: false, form: {} },
  { id: 2, name: '订单2', detailsLoaded: false, form: {} }
]);

// 字典数据（假设通过 props 传入）
const kp_start_charge_seq_stat = ref([]);

// 处理展开行事件
const handleExpandChange = async (row, expandedRows) => {
  if (expandedRows.includes(row) && !row.detailsLoaded) {
    try {
      // 调用接口获取详情（假设接口为 getOrderDetails）
      const response = await fetch(`/api/order/${row.id}`);
      const data = await response.json();

      // 更新当前行数据
      row.form = data;
      row.detailsLoaded = true;
    } catch (error) {
      ElMessage.error('加载详情失败');
      console.error('接口错误:', error);
    }
  }
};
</script>

<style scoped>
.order-detail {
  padding: 16px;
}
.detail-title {
  font-weight: bold;
}
.flex {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.loading-text {
  padding: 16px;
  text-align: center;
  color: #666;
}
</style>
