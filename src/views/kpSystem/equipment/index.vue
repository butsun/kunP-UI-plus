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
            <el-form-item label="站点名称" prop="stationId">
              <el-select v-model="queryParams.stationId" filterable placeholder="请选择站点" style="width: 240px">
                <el-option v-for="item in stationOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
            <el-button v-hasPermi="['kpSystem:equipment:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:equipment:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:equipment:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:equipment:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="equipmentList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="" align="center" prop="id" />
        <el-table-column label="设备编号" align="center" prop="equipmentNo" />
        <el-table-column label="站点名称" align="center" prop="stationName" />
        <el-table-column label="归属运营商" align="center" prop="operatorName" />
        <el-table-column label="设备类型" align="center" prop="equipmentType">
          <template #default="scope">
            <dict-tag :options="kp_equipment_type" :value="scope.row.equipmentType" />
          </template>
        </el-table-column>
        <el-table-column label="额定电流" align="center" prop="currentValue" />
        <el-table-column label="额定功率" align="center" prop="power" />
        <el-table-column label="是否上线" align="center" prop="equipmentType">
          <template #default="scope">
            <dict-tag :options="kp_is_working" :value="scope.row.isWorking" />
          </template>
        </el-table-column>
        <el-table-column label="连网类型" align="center" prop="netType">
          <template #default="scope">
            <dict-tag :options="kp_net_type" :value="scope.row.netType" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="最近上线时间" align="center" prop="onlineTm" width="180" />
        <!-- <template #default="scope">
            <span>{{ parseTime(scope.row.onlineTm, '{y}-{m}-{d}') }}</span>
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详情" placement="top">
              <el-button v-hasPermi="['kpSystem:equipment:query']" link type="primary" icon="View" @click="handleView(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:equipment:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-hasPermi="['kpSystem:equipment:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电设备管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="equipmentFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编号" prop="equipmentNo">
          <el-input v-model="form.equipmentNo" placeholder="请输入设备编号" />
          <!-- <el-select v-model="queryParams.equipmentId" filterable placeholder="请选择设备">
            <el-option v-for="item in equipmentoptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select> -->
        </el-form-item>
        <el-form-item label="站点" prop="stationId">
          <el-select v-model="form.stationId" filterable placeholder="请选择站点">
            <el-option v-for="item in stationOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="枪数" prop="gunSum">
          <el-input v-model="form.gunSum" placeholder="请输入枪数" disabled />
          <!-- <el-input-number v-model="form.gunSum" :min="1" @change="handleChange" d/> -->
        </el-form-item>
        <el-form-item label="运营商" prop="operatorId">
          <!-- <el-input v-model="form.manufacturerName" placeholder="请输入设备生产商名称" /> -->
          <el-select v-model="form.operatorId" filterable placeholder="请选择运营商">
            <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="equipmentType">
          <el-select v-model="form.equipmentType" placeholder="请选择设备类型">
            <el-option v-for="dict in kp_equipment_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="额定电流" prop="currentValue">
          <el-input v-model="form.currentValue" placeholder="请输入额定电流" />
        </el-form-item>
        <el-form-item label="额定功率" prop="power">
          <el-input v-model="form.power" placeholder="请输入额定功率" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog v-model="dialog.visible1" title="设备详情" width="500px" append-to-body>
      <el-form ref="equipmentFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编号:"> {{ form.equipmentNo }}</el-form-item>
        <el-form-item label="站点:">{{ form.stationName }} </el-form-item>
        <el-form-item label="枪数:">{{ form.gunSum }} </el-form-item>
        <el-form-item label="运营商:"> {{ form.operatorName }} </el-form-item>
        <el-form-item label="设备类型:">
          <dict-tag :options="kp_equipment_type" :value="form.equipmentType" />
        </el-form-item>
        <el-form-item label="额定电流:">{{ form.currentValue }} </el-form-item>
        <el-form-item label="额定功率:">{{ form.power }} </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="cancel">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Equipment" lang="ts">
import { listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment } from '@/api/kpSystem/equipment';
import { equipmentLike, stationLike, operatorLike } from '@/api/common';
import { EquipmentVO, EquipmentQuery, EquipmentForm } from '@/api/kpSystem/equipment/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_net_type, kp_equipment_type, kp_is_working } = toRefs<any>(proxy?.useDict('kp_net_type', 'kp_equipment_type', 'kp_is_working'));

const equipmentList = ref<EquipmentVO[]>([]);
const equipmentoptions = ref([]);
const stationOptions = ref([]);
const operatorOptions = ref([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const equipmentFormRef = ref<ElFormInstance>();

const dialog = reactive<any>({
  visible: false,
  visible1: false,
  title: ''
});

const initFormData: any = {
  equipmentNo: undefined,
  stationId: undefined,
  manufacturerName: undefined,
  equipmentModel: undefined,
  voltageUpperLimits: undefined,
  voltageLowerLimits: undefined,
  currentValue: undefined,
  power: undefined,
  equipmentType: undefined,
  parkNo: undefined,
  isWorking: undefined,
  equipmentName: undefined,
  operatorId: undefined
};
const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    equipmentNo: undefined,
    stationId: undefined,
    operatorId: undefined,
    equipmentModel: undefined,
    equipmentName: undefined,
    params: {}
  },
  rules: {
    equipmentNo: [{ required: true, message: '设备编号不能为空', trigger: 'blur' }],
    stationId: [{ required: true, message: '站点id不能为空', trigger: 'blur' }],
    gunSum: [{ required: true, message: '枪号不能为空', trigger: 'blur' }],
    operatorId: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
    currentValue: [{ required: true, message: '额定电流不能为空', trigger: 'blur' }],
    power: [{ required: true, message: '额定功率不能为空', trigger: 'blur' }],
    equipmentType: [{ required: true, message: '设备类型不能为空', trigger: 'change' }]
  }
});
const handleChange = (value: number) => {
  form.value.gunSum = value;
};
const { queryParams, form, rules } = toRefs(data);

/** 查询充电设备管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listEquipment(queryParams.value);
  equipmentList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};
/** 模糊查询充电设备管理列表 */
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
/** 模糊查询站点列表 */
const stationLists = async () => {
  loading.value = true;
  const res = await stationLike();
  stationOptions.value = res.rows.map((item: any) => ({
    label: item.stationName,
    value: item.id,
    name: item.stationName
  }));
  loading.value = false;
};
/** 模糊查询供应商列表 */
const operatorLists = async () => {
  loading.value = true;
  const res = await operatorLike();
  operatorOptions.value = res.rows.map((item: any) => ({
    label: item.operatorName,
    value: item.id,
    name: item.operatorName
  }));
  loading.value = false;
};
/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
  dialog.visible1 = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  equipmentFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: EquipmentVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加充电设备管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: EquipmentVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getEquipment(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改充电设备管理';
};

/** 提交按钮 */
const submitForm = () => {
  equipmentFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateEquipment(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addEquipment(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      dialog.visible1 = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: EquipmentVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电设备管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delEquipment(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/equipment/export',
    {
      ...queryParams.value
    },
    `equipment_${new Date().getTime()}.xlsx`
  );
};
/** 详细按钮操作 */
const handleView = (row: any) => {
  dialog.visible1 = true;
  form.value = row;
};
onMounted(() => {
  getList();
  equipmentLists();
  stationLists();
  operatorLists();
});
</script>
