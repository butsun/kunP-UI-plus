<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单号" prop="startChargeSeq">
              <el-input v-model="queryParams.startChargeSeq" placeholder="请输入订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商ID" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入运营商ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单状态" prop="startChargeSeqStat">
              <el-input v-model="queryParams.startChargeSeqStat" placeholder="请输入订单状态" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点id" prop="stationId">
              <el-input v-model="queryParams.stationId" placeholder="请输入站点id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="开始充电时间" style="width: 308px">
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
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kpSystem:chargeOrder:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kpSystem:chargeOrder:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kpSystem:chargeOrder:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kpSystem:chargeOrder:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="chargeOrderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="" align="center" prop="id" v-if="false" />
        <el-table-column label="订单号" align="center" prop="startChargeSeq" />
        <el-table-column label="运营商ID" align="center" prop="operatorId" />
        <el-table-column label="充电流水号" align="center" prop="tradeNo" />
        <el-table-column label="订单状态" align="center" prop="startChargeSeqStat">
          <template #default="scope">
            <dict-tag :options="kp_start_charge_seq_stat" :value="scope.row.startChargeSeqStat"/>
          </template>
        </el-table-column>
        <el-table-column label="站点id" align="center" prop="stationId" />
        <el-table-column label="充电枪号" align="center" prop="connectorId" />
        <el-table-column label="Soc" align="center" prop="soc" />
        <el-table-column label="开始充电时间" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最新采样时间" align="center" prop="endTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充电量" align="center" prop="totalPower" />
        <el-table-column label="电费" align="center" prop="elecMoney" />
        <el-table-column label="服务费" align="center" prop="serviceMoney" />
        <el-table-column label="优惠后电费" align="center" prop="finalElecMoney" />
        <el-table-column label="优惠后服务费" align="center" prop="finalServiceMoney" />
        <el-table-column label="总金额" align="center" prop="finalTotalMoney" />
        <el-table-column label="故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义" align="center" prop="failReason" />
        <el-table-column label="vin码" align="center" prop="carVin" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号" align="center" prop="plateNum" />
        <el-table-column label="手机号" align="center" prop="phoneNum" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kpSystem:chargeOrder:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kpSystem:chargeOrder:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电订单管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="chargeOrderFormRef" :model="form" :rules="rules" label-width="80px">
      </el-form>
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

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

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

const initFormData: ChargeOrderForm = {
}
const data = reactive<PageData<ChargeOrderForm, ChargeOrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    startChargeSeq: undefined,
    operatorId: undefined,
    startChargeSeqStat: undefined,
    stationId: undefined,
    params: {
      startTime: undefined,
    }
  },
  rules: {
  }
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
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  chargeOrderFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeStartTime.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: ChargeOrderVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加充电订单管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ChargeOrderVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getChargeOrder(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改充电订单管理";
}

/** 提交按钮 */
const submitForm = () => {
  chargeOrderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChargeOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addChargeOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ChargeOrderVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电订单管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delChargeOrder(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kpSystem/chargeOrder/export', {
    ...queryParams.value
  }, `chargeOrder_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
