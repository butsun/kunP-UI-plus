<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备编号" prop="equipmentNo">
              <!-- <el-input v-model="queryParams.equipmentId" placeholder="请输入设备编号" clearable @keyup.enter="handleQuery" /> -->
              <el-select v-model="queryParams.equipmentNo" filterable placeholder="请选择设备" style="width: 240px">
                <el-option v-for="item in equipmentoptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="订单号" prop="startChargeSeq">
              <el-input v-model="queryParams.startChargeSeq" placeholder="请输入订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单时间" style="width: 308px">
              <el-date-picker
                v-model="dateRangeStartTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <!-- <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeOrder:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col> -->
          <!-- <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeOrder:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col> -->
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeOrder:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeOrder:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="chargeOrderList" @selection-change="handleSelectionChange" @expand-change="handleExpandChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="" align="center" prop="id" />
        <el-table-column label="订单号" align="center" prop="startChargeSeq" width="80" :cell-style="{ whiteSpace: 'nowrap' }" />
        <el-table-column label="站点" align="center" prop="stationName" />
        <el-table-column label="运营商" align="center" prop="operatorName" />
        <el-table-column label="充电金额" align="center" prop="totalMoney" />
        <el-table-column label="优惠金额" align="center" prop="activityMoney" />
        <el-table-column label="最终金额" align="center" prop="finalTotalMoney" />
        <el-table-column label="开始充电时间" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束充电时间" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" prop="startChargeSeqStat">
          <template #default="scope">
            <dict-tag :options="kp_start_charge_seq_stat" :value="scope.row.startChargeSeqStat" />
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template #default="scope">
            <div class="order-detail">
              <!-- 订单详情 -->
              <div class="header">
                <div class="detail-title">订单详情</div>
              </div>
              <div class="detail-container">
                <div class="order-status">
                  <dict-tag :options="kp_start_charge_seq_stat" :value="scope.row.startChargeSeqStat" />
                </div>
                <div m="4">
                  <div>
                    <p m="t-0 b-2"><span>订单编号:</span> {{ scope.row.startChargeSeq }}</p>
                    <p m="t-0 b-2"><span>充电凭证:</span> {{ scope.row.voucherNo }}</p>
                    <p m="t-0 b-2" style="display: flex">
                      <span style="margin-right: 8px">启动方式: </span> <dict-tag :options="kp_start_charge_seq_stat" :value="scope.row.startType" />
                    </p>
                    <p m="t-0 b-2"><span>充电量: </span> {{ scope.row.totalPower }}</p>
                  </div>
                  <div class="flex">
                    <p m="t-0 b-2"><span>开始充电时间: </span> {{ scope.row.startTime }}</p>
                    <p m="t-0 b-2"><span>结束充电:</span> {{ scope.row.endTime }}</p>
                  </div>
                  <p m="t-0 b-2"><span>充电结束原因:</span> {{ scope.row.stopReason }}</p>
                </div>
              </div>

              <!-- 设备信息 -->
              <div class="header">
                <div class="detail-title">设备信息</div>
              </div>
              <div class="detail-container">
                <div m="4">
                  <div class="flex">
                    <p m="t-0 b-2"><span>充电设备: </span> {{ scope.row.equipmentId }}</p>
                    <p m="t-0 b-2"><span>站点: </span> {{ scope.row.stationName }}</p>
                    <p m="t-0 b-2"><span>运营商:</span> {{ scope.row.operatorName }}</p>
                  </div>
                  <div class="flex">
                    <p m="t-0 b-2"><span>枪口编号: </span>{{ scope.row.connectorNo }}</p>
                  </div>
                  <div class="flex">
                    <p m="t-0 b-2"><span>电流:</span> {{ scope.row.gun_current }}</p>
                    <p m="t-0 b-2"><span>电压:</span>{{ scope.row.gun_voltage }}</p>
                    <p m="t-0 b-2"><span>soc:</span>{{ scope.row.soc }}</p>
                  </div>
                </div>
              </div>

              <!-- 费用信息 -->
              <div class="header">
                <div class="detail-title">费用信息</div>
              </div>
              <div class="detail-container">
                <div m="4">
                  <div class="flex">
                    <p m="t-0 b-2"><span>电费（元）:</span> {{ scope.row.elecMoney }}</p>
                    <p m="t-0 b-2"><span>优惠后电费（元）:</span> {{ scope.row.finalElecMoney }}</p>
                  </div>
                  <div class="flex">
                    <p m="t-0 b-2"><span>服务费（元）:</span> {{ scope.row.serviceMoney }}</p>
                    <p m="t-0 b-2"><span>优惠后服务费（元）:</span> {{ scope.row.finalServiceMoney }}</p>
                  </div>
                  <div class="flex">
                    <p m="t-0 b-2"></p>
                    <p m="t-0 b-2" class="money"><span>总金额（元）:</span> {{ scope.row.finalTotalMoney }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-else class="loading-text">加载中...</div> -->
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button v-hasPermi="['kpSystem:chargeOrder:edit']" link type="primary" icon="View" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-hasPermi="['kpSystem:chargeOrder:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column> -->
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电订单管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body>
      <el-row>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-dark">订单编号:{{ form.startChargeSeq }}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-dark">订单时间:{{ form.createTime }}</div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple-dark">订单编号:kooriookami</div>
        </el-col>
        <el-col :span="8"> <div class="grid-content ep-bg-purple-dark">订单时间:18100000000</div></el-col>
        <el-col :span="8"> <div class="grid-content ep-bg-purple-dark">订单时间:18100000000</div></el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="ChargeOrder" lang="ts">
import { listChargeOrder, getChargeOrder, delChargeOrder, addChargeOrder, updateChargeOrder } from '@/api/kpSystem/chargeOrder';
import { ChargeOrderVO, ChargeOrderQuery, ChargeOrderForm } from '@/api/kpSystem/chargeOrder/types';
import { equipmentLike, stationLike, operatorLike } from '@/api/common';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_start_charge_seq_stat } = toRefs<any>(proxy?.useDict('kp_start_charge_seq_stat'));

const chargeOrderList = ref<ChargeOrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeStartTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const chargeOrderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: any = {};
const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    startChargeSeq: undefined,
    operatorId: undefined,
    startChargeSeqStat: undefined,
    stationId: undefined,
    equipmentNo: undefined,
    params: {
      startTime: undefined
    }
  },
  rules: {}
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电订单管理列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeStartTime.value, 'StartTime');
  const res = await listChargeOrder(queryParams.value);
  chargeOrderList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  chargeOrderFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeStartTime.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: ChargeOrderVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加充电订单管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ChargeOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getChargeOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改充电订单管理';
};

/** 提交按钮 */
const submitForm = () => {
  chargeOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChargeOrder(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addChargeOrder(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ChargeOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电订单管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delChargeOrder(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/chargeOrder/export',
    {
      ...queryParams.value
    },
    `chargeOrder_${new Date().getTime()}.xlsx`
  );
};
/** 模糊查询充电设备管理列表 */
const equipmentoptions = ref([]);
const equipmentLists = async () => {
  loading.value = true;
  const res = await equipmentLike();
  equipmentoptions.value = res.rows.map((item: any) => ({
    label: item.equipmentNo,
    value: item.equipmentNo,
    name: item.equipmentNo
  }));
  console.log('res.rows', equipmentoptions.value);
  loading.value = false;
};
onMounted(() => {
  getList();
  equipmentLists();
});

// 处理展开行事件
const handleExpandChange = async (row, expandedRows) => {
  if (expandedRows.includes(row)) {
    try {
      // 调用接口获取详情（假设接口为 getOrderDetails）
      // const response = await fetch(`/api/order/${row.id}`);
      const data = await getChargeOrder(row.id);
      console.log('data>>>>>>>>', data);
      // const data = await response.json();
      // 更新当前行数据
      row = data;
      row.detailsLoaded = true;
    } catch (error) {
      ElMessage.error('加载详情失败');
      console.error('接口错误:', error);
    }
  }
};
</script>
<style lang="scss" scoped>
.order-detail {
  padding: 24px;
  // max-width: 800px;
  margin: 0 auto;
}
.detail-container {
  position: relative;
  p {
    width: 350px;
  }
  .detail-title {
    font-weight: bolder;
    font-size: 40px !important;
  }
  .b-2 {
    font-weight: bolder;
  }
  span {
    color: gray;
  }
  .order-status {
    position: absolute;
    right: 10px;
    z-index: 1;
    font-size: 12px;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .money {
    font-weight: bolder;
    color: red;
  }
}
</style>
