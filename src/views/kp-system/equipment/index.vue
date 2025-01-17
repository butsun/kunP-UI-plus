<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号" prop="equipmentId">
              <el-input v-model="queryParams.equipmentId" placeholder="请输入设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="桩编号" prop="pileNo">
              <el-input v-model="queryParams.pileNo" placeholder="请输入桩编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="关联充电站ID，运营商自定义的唯一编码 小于等于20字符" prop="stationId">
              <el-input v-model="queryParams.stationId" placeholder="请输入关联充电站ID，运营商自定义的唯一编码 小于等于20字符" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="价格模版ID" prop="priceCode">
              <el-input v-model="queryParams.priceCode" placeholder="请输入价格模版ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备生产商组织机构代码" prop="manufacturerId">
              <el-input v-model="queryParams.manufacturerId" placeholder="请输入设备生产商组织机构代码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备生产商名称" prop="manufacturerName">
              <el-input v-model="queryParams.manufacturerName" placeholder="请输入设备生产商名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备型号" prop="equipmentModel">
              <el-input v-model="queryParams.equipmentModel" placeholder="请输入设备型号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备生产日期" prop="productionDate">
              <el-date-picker clearable
                v-model="queryParams.productionDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择设备生产日期"
              />
            </el-form-item>
            <el-form-item label="充电设备经度" prop="equipmentLng">
              <el-input v-model="queryParams.equipmentLng" placeholder="请输入充电设备经度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电设备纬度" prop="equipmentLat">
              <el-input v-model="queryParams.equipmentLat" placeholder="请输入充电设备纬度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电设备总功率kW 保留小数点后1位" prop="power">
              <el-input v-model="queryParams.power" placeholder="请输入充电设备总功率kW 保留小数点后1位" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电桩最大允许输出功率 30%-100% 1Bin表示1%" prop="maxPower">
              <el-input v-model="queryParams.maxPower" placeholder="请输入充电桩最大允许输出功率 30%-100% 1Bin表示1%" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否启用 0 正常工作 1停止使用锁定" prop="isWorking">
              <el-input v-model="queryParams.isWorking" placeholder="请输入是否启用 0 正常工作 1停止使用锁定" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最近对时时间" prop="syncTm">
              <el-date-picker clearable
                v-model="queryParams.syncTm"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择最近对时时间"
              />
            </el-form-item>
            <el-form-item label="充电设备名称" prop="equipmentName">
              <el-input v-model="queryParams.equipmentName" placeholder="请输入充电设备名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="0移动 2电信 3联通 4其他" prop="mOperator">
              <el-input v-model="queryParams.mOperator" placeholder="请输入0移动 2电信 3联通 4其他" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最近上线时间" prop="onlineTm">
              <el-date-picker clearable
                v-model="queryParams.onlineTm"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择最近上线时间"
              />
            </el-form-item>
            <el-form-item label="连接主机IP" prop="servIp">
              <el-input v-model="queryParams.servIp" placeholder="请输入连接主机IP" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kp-system:equipment:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kp-system:equipment:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kp-system:equipment:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kp-system:equipment:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="equipmentList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="" align="center" prop="id" v-if="true" />
        <el-table-column label="设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号" align="center" prop="equipmentId" />
        <el-table-column label="桩编号" align="center" prop="pileNo" />
        <el-table-column label="关联充电站ID，运营商自定义的唯一编码 小于等于20字符" align="center" prop="stationId" />
        <el-table-column label="价格模版ID" align="center" prop="priceCode" />
        <el-table-column label="设备生产商组织机构代码" align="center" prop="manufacturerId" />
        <el-table-column label="设备生产商名称" align="center" prop="manufacturerName" />
        <el-table-column label="设备型号" align="center" prop="equipmentModel" />
        <el-table-column label="设备生产日期" align="center" prop="productionDate" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.productionDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="1直流设备 2交流设备 3交直流一体设备 4无线设备 5其他" align="center" prop="equipmentType" />
        <el-table-column label="充电设备经度" align="center" prop="equipmentLng" />
        <el-table-column label="充电设备纬度" align="center" prop="equipmentLat" />
        <el-table-column label="充电设备总功率kW 保留小数点后1位" align="center" prop="power" />
        <el-table-column label="充电桩最大允许输出功率 30%-100% 1Bin表示1%" align="center" prop="maxPower" />
        <el-table-column label="是否启用 0 正常工作 1停止使用锁定" align="center" prop="isWorking" />
        <el-table-column label="最近对时时间" align="center" prop="syncTm" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.syncTm, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充电设备名称" align="center" prop="equipmentName" />
        <el-table-column label="0、sim卡 1、LAN 2、WAN 3其他" align="center" prop="netType" />
        <el-table-column label="0移动 2电信 3联通 4其他" align="center" prop="mOperator" />
        <el-table-column label="最近上线时间" align="center" prop="onlineTm" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.onlineTm, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="连接主机IP" align="center" prop="servIp" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kp-system:equipment:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kp-system:equipment:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电桩管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="equipmentFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号" prop="equipmentId">
          <el-input v-model="form.equipmentId" placeholder="请输入设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号" />
        </el-form-item>
        <el-form-item label="桩编号" prop="pileNo">
          <el-input v-model="form.pileNo" placeholder="请输入桩编号" />
        </el-form-item>
        <el-form-item label="关联充电站ID，运营商自定义的唯一编码 小于等于20字符" prop="stationId">
          <el-input v-model="form.stationId" placeholder="请输入关联充电站ID，运营商自定义的唯一编码 小于等于20字符" />
        </el-form-item>
        <el-form-item label="价格模版ID" prop="priceCode">
          <el-input v-model="form.priceCode" placeholder="请输入价格模版ID" />
        </el-form-item>
        <el-form-item label="设备生产商组织机构代码" prop="manufacturerId">
          <el-input v-model="form.manufacturerId" placeholder="请输入设备生产商组织机构代码" />
        </el-form-item>
        <el-form-item label="设备生产商名称" prop="manufacturerName">
          <el-input v-model="form.manufacturerName" placeholder="请输入设备生产商名称" />
        </el-form-item>
        <el-form-item label="设备型号" prop="equipmentModel">
          <el-input v-model="form.equipmentModel" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="设备生产日期" prop="productionDate">
          <el-date-picker clearable
            v-model="form.productionDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择设备生产日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="充电设备经度" prop="equipmentLng">
          <el-input v-model="form.equipmentLng" placeholder="请输入充电设备经度" />
        </el-form-item>
        <el-form-item label="充电设备纬度" prop="equipmentLat">
          <el-input v-model="form.equipmentLat" placeholder="请输入充电设备纬度" />
        </el-form-item>
        <el-form-item label="充电设备总功率kW 保留小数点后1位" prop="power">
          <el-input v-model="form.power" placeholder="请输入充电设备总功率kW 保留小数点后1位" />
        </el-form-item>
        <el-form-item label="充电桩最大允许输出功率 30%-100% 1Bin表示1%" prop="maxPower">
          <el-input v-model="form.maxPower" placeholder="请输入充电桩最大允许输出功率 30%-100% 1Bin表示1%" />
        </el-form-item>
        <el-form-item label="是否启用 0 正常工作 1停止使用锁定" prop="isWorking">
          <el-input v-model="form.isWorking" placeholder="请输入是否启用 0 正常工作 1停止使用锁定" />
        </el-form-item>
        <el-form-item label="最近对时时间" prop="syncTm">
          <el-date-picker clearable
            v-model="form.syncTm"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最近对时时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="充电设备名称" prop="equipmentName">
          <el-input v-model="form.equipmentName" placeholder="请输入充电设备名称" />
        </el-form-item>
        <el-form-item label="0移动 2电信 3联通 4其他" prop="mOperator">
          <el-input v-model="form.mOperator" placeholder="请输入0移动 2电信 3联通 4其他" />
        </el-form-item>
        <el-form-item label="最近上线时间" prop="onlineTm">
          <el-date-picker clearable
            v-model="form.onlineTm"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最近上线时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="连接主机IP" prop="servIp">
          <el-input v-model="form.servIp" placeholder="请输入连接主机IP" />
        </el-form-item>
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

<script setup name="Equipment" lang="ts">
import { listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment } from '@/api/kp-system/equipment';
import { EquipmentVO, EquipmentQuery, EquipmentForm } from '@/api/kp-system/equipment/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const equipmentList = ref<EquipmentVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const equipmentFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: EquipmentForm = {
  id: undefined,
  equipmentId: undefined,
  pileNo: undefined,
  stationId: undefined,
  priceCode: undefined,
  manufacturerId: undefined,
  manufacturerName: undefined,
  equipmentModel: undefined,
  productionDate: undefined,
  equipmentType: undefined,
  equipmentLng: undefined,
  equipmentLat: undefined,
  power: undefined,
  maxPower: undefined,
  isWorking: undefined,
  syncTm: undefined,
  equipmentName: undefined,
  netType: undefined,
  mOperator: undefined,
  onlineTm: undefined,
  servIp: undefined,
}
const data = reactive<PageData<EquipmentForm, EquipmentQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    equipmentId: undefined,
    pileNo: undefined,
    stationId: undefined,
    priceCode: undefined,
    manufacturerId: undefined,
    manufacturerName: undefined,
    equipmentModel: undefined,
    productionDate: undefined,
    equipmentType: undefined,
    equipmentLng: undefined,
    equipmentLat: undefined,
    power: undefined,
    maxPower: undefined,
    isWorking: undefined,
    syncTm: undefined,
    equipmentName: undefined,
    netType: undefined,
    mOperator: undefined,
    onlineTm: undefined,
    servIp: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    equipmentId: [
      { required: true, message: "设备唯一编码，对同一运营商保证唯一；9组织机构+14桩编号不能为空", trigger: "blur" }
    ],
    pileNo: [
      { required: true, message: "桩编号不能为空", trigger: "blur" }
    ],
    stationId: [
      { required: true, message: "关联充电站ID，运营商自定义的唯一编码 小于等于20字符不能为空", trigger: "blur" }
    ],
    priceCode: [
      { required: true, message: "价格模版ID不能为空", trigger: "blur" }
    ],
    manufacturerId: [
      { required: true, message: "设备生产商组织机构代码不能为空", trigger: "blur" }
    ],
    manufacturerName: [
      { required: true, message: "设备生产商名称不能为空", trigger: "blur" }
    ],
    equipmentModel: [
      { required: true, message: "设备型号不能为空", trigger: "blur" }
    ],
    productionDate: [
      { required: true, message: "设备生产日期不能为空", trigger: "blur" }
    ],
    equipmentType: [
      { required: true, message: "1直流设备 2交流设备 3交直流一体设备 4无线设备 5其他不能为空", trigger: "change" }
    ],
    equipmentLng: [
      { required: true, message: "充电设备经度不能为空", trigger: "blur" }
    ],
    equipmentLat: [
      { required: true, message: "充电设备纬度不能为空", trigger: "blur" }
    ],
    power: [
      { required: true, message: "充电设备总功率kW 保留小数点后1位不能为空", trigger: "blur" }
    ],
    maxPower: [
      { required: true, message: "充电桩最大允许输出功率 30%-100% 1Bin表示1%不能为空", trigger: "blur" }
    ],
    isWorking: [
      { required: true, message: "是否启用 0 正常工作 1停止使用锁定不能为空", trigger: "blur" }
    ],
    syncTm: [
      { required: true, message: "最近对时时间不能为空", trigger: "blur" }
    ],
    equipmentName: [
      { required: true, message: "充电设备名称不能为空", trigger: "blur" }
    ],
    netType: [
      { required: true, message: "0、sim卡 1、LAN 2、WAN 3其他不能为空", trigger: "change" }
    ],
    mOperator: [
      { required: true, message: "0移动 2电信 3联通 4其他不能为空", trigger: "blur" }
    ],
    onlineTm: [
      { required: true, message: "最近上线时间不能为空", trigger: "blur" }
    ],
    servIp: [
      { required: true, message: "连接主机IP不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电桩管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listEquipment(queryParams.value);
  equipmentList.value = res.rows;
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
  equipmentFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: EquipmentVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加充电桩管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: EquipmentVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getEquipment(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改充电桩管理";
}

/** 提交按钮 */
const submitForm = () => {
  equipmentFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateEquipment(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addEquipment(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: EquipmentVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电桩管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delEquipment(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kp-system/equipment/export', {
    ...queryParams.value
  }, `equipment_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
