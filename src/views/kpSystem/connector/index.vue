<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备号" prop="equipmentId">
              <el-input v-model="queryParams.equipmentId" placeholder="请输入设备号" clearable @keyup.enter="handleQuery" />
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
      <!-- <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kpSystem:connector:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kpSystem:connector:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kpSystem:connector:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kpSystem:connector:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template> -->

      <el-table v-loading="loading" :data="connectorList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column v-if="false" label="自增id" align="center" prop="id" />
        <el-table-column label="站点名称" align="center" prop="stationName" />
        <el-table-column label="归属运营商" align="center" prop="operatorName" />
        <el-table-column label="设备编号" align="center" prop="equipmentId" />
        <el-table-column label="枪号" align="center" prop="connectorNo" />
        <el-table-column label="枪名称" align="center" prop="connectorName" />
        <el-table-column label="额定电流" align="center" prop="currentValue" />
        <el-table-column label="额定功率" align="center" prop="power" />
        <el-table-column label="连网类型" align="center" prop="netType">
          <template #default="scope">
            <dict-tag :options="kp_net_type" :value="scope.row.equipmentType" />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="kp_connector_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="最后更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="详细" placement="top">
              <el-button v-hasPermi="['kpSystem:connector:query']" link type="primary" icon="View" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电枪管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="connectorFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="站点id" prop="stationId">
          <el-input v-model="form.stationId" placeholder="请输入站点id" />
        </el-form-item>
        <el-form-item label="运营商id" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入运营商id" />
        </el-form-item>
        <el-form-item label="设备号" prop="equipmentId">
          <el-input v-model="form.equipmentId" placeholder="请输入设备号" />
        </el-form-item>
        <el-form-item label="枪号" prop="connectorId">
          <el-input v-model="form.connectorId" placeholder="请输入枪号" />
        </el-form-item>
        <el-form-item label="枪名称" prop="connectorName">
          <el-input v-model="form.connectorName" placeholder="请输入枪名称" />
        </el-form-item>
        <el-form-item label="国标" prop="nationalStandard">
          <el-input v-model="form.nationalStandard" placeholder="请输入国标" />
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

<script setup name="Connector" lang="ts">
import { listConnector, getConnector, delConnector, addConnector, updateConnector } from '@/api/kpSystem/connector';
import { ConnectorVO, ConnectorQuery, ConnectorForm } from '@/api/kpSystem/connector/types';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_net_type, kp_equipment_type, kp_connector_status } = toRefs<any>(
  proxy?.useDict('kp_net_type', 'kp_equipment_type', 'kp_connector_status')
);

const connectorList = ref<ConnectorVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const connectorFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ConnectorForm = {
  stationId: undefined,
  operatorId: undefined,
  equipmentId: undefined,
  connectorId: undefined,
  connectorName: undefined,
  connectorType: undefined,
  nationalStandard: undefined,
  status: undefined
};
const data = reactive<PageData<ConnectorForm, ConnectorQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stationId: undefined,
    operatorId: undefined,
    equipmentId: undefined,
    connectorId: undefined,
    params: {}
  },
  rules: {
    stationId: [{ required: true, message: '站点id不能为空', trigger: 'blur' }],
    operatorId: [{ required: true, message: '运营商id不能为空', trigger: 'blur' }],
    equipmentId: [{ required: true, message: '设备号不能为空', trigger: 'blur' }],
    connectorId: [{ required: true, message: '枪号不能为空', trigger: 'blur' }],
    connectorName: [{ required: true, message: '枪名称不能为空', trigger: 'blur' }],
    connectorType: [{ required: true, message: '枪类型不能为空', trigger: 'change' }],
    nationalStandard: [{ required: true, message: '国标不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电枪管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listConnector(queryParams.value);
  connectorList.value = res.rows;
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
  connectorFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ConnectorVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加充电枪管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ConnectorVO) => {
  reset();
  // const _id = row?.id || ids.value[0];
  // const res = await getConnector(_id);
  // Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改充电枪管理';
};

/** 提交按钮 */
const submitForm = () => {
  connectorFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateConnector(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addConnector(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ConnectorVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电枪管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delConnector(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/connector/export',
    {
      ...queryParams.value
    },
    `connector_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
