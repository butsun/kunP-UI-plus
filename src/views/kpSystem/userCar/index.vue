<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="车牌号" prop="plateNo">
              <el-input v-model="queryParams.plateNo" placeholder="请输入车牌号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="vin码" prop="carVin">
              <el-input v-model="queryParams.carVin" placeholder="请输入vin码" clearable @keyup.enter="handleQuery" />
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
            <el-button v-hasPermi="['kpSystem:userCar:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:userCar:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:userCar:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:userCar:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="userCarList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column v-if="true" label="车辆ID" align="center" prop="id" /> -->
        <el-table-column label="归属账户" align="center" prop="accountName" width="120" show-overflow-tooltip />
        <el-table-column label="车牌号" align="center" prop="plateNo" width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <a
              style="
                display: flex;
                align-items: center;
                white-space: nowrap;
                width: 100px;
                text-decoration: underline;
                cursor: pointer;
                color: var(--el-color-primary);
              "
              @click="copyText(row.plateNo)"
            >
              {{ row.plateNo }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="vin码" align="center" prop="carVin" width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <a
              style="
                display: flex;
                align-items: center;
                white-space: nowrap;
                width: 100px;
                text-decoration: underline;
                cursor: pointer;
                color: var(--el-color-primary);
              "
              @click="copyText(row.carVin)"
            >
              {{ row.carVin }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="品牌" align="center" prop="carModel" />
        <el-table-column label="类型" align="center" prop="useCharacter">
          <template #default="scope">
            <dict-tag :options="kp_use_character" :value="scope.row.useCharacter" />
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" min-width="120" show-overflow-tooltip />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:userCar:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-hasPermi="['kpSystem:userCar:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改车辆管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="userCarFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="归属账户" prop="accountId">
          <el-select v-model="form.accountId" placeholder="请选择运营商" clearable filterable @change="handleQuery">
            <el-option v-for="item in accountList" :key="item.id" :label="item.nickName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNo">
          <el-input v-model="form.plateNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="vin码" prop="carVin">
          <!-- <el-input v-model="form.carVin" placeholder="请输入vin码" /> -->
          <el-select v-model="form.carVin" placeholder="请选择vin码" clearable filterable @change="handleQuery">
            <el-option v-for="item in vinList" :key="item.id" :label="item.voucherNumber" :value="item.voucherNumber" />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="carModel">
          <el-input v-model="form.carModel" placeholder="请输入品牌" />
        </el-form-item>
        <el-form-item label="类型" prop="useCharacter">
          <!-- <el-input v-model="form.useCharacter" placeholder="请输入使用性质: 默认 0:运营;、1:非运营;" /> -->
          <el-select v-model="form.useCharacter" placeholder="请选择类型" clearable filterable @change="handleQuery">
            <el-option v-for="item in kp_use_character" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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

<script setup name="UserCar" lang="ts">
import { listUserCar, getUserCar, delUserCar, addUserCar, updateUserCar } from '@/api/kpSystem/userCar';
import { UserCarVO, UserCarQuery, UserCarForm } from '@/api/kpSystem/userCar/types';
import { listChargeVoucher } from '@/api/kpSystem/chargeVoucher';
import { listChargeAccount } from '@/api/kpSystem/chargeAccount';
import { copyText } from '@/utils/index';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_use_character } = toRefs<any>(proxy?.useDict('kp_use_character'));

const userCarList = ref<UserCarVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const userCarFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: UserCarForm = {
  id: undefined,
  accountId: undefined,
  plateNo: undefined,
  carVin: undefined,
  carModel: undefined,
  useCharacter: undefined,
  remark: undefined
};
const data = reactive<PageData<UserCarForm, UserCarQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    accountId: undefined,
    plateNo: undefined,
    carVin: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '车辆ID不能为空', trigger: 'blur' }],
    accountId: [{ required: true, message: '归属账户不能为空', trigger: 'blur' }],
    plateNo: [{ required: true, message: '车牌号不能为空', trigger: 'blur' }],
    carVin: [{ required: true, message: 'vin码不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询车辆管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listUserCar(queryParams.value);
  userCarList.value = res.rows;
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
  userCarFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: UserCarVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加车辆管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: UserCarVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getUserCar(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改车辆管理';
};

/** 提交按钮 */
const submitForm = () => {
  userCarFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateUserCar(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addUserCar(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: UserCarVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除车辆管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delUserCar(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/userCar/export',
    {
      ...queryParams.value
    },
    `userCar_${new Date().getTime()}.xlsx`
  );
};
const vinList = ref<OperatorVO[]>([]);

const getVinList = async () => {
  try {
    const res = await listChargeVoucher();
    if (res.code === 200) {
      vinList.value = res.rows || [];
    }
  } catch (error) {
    console.error('获取运营商列表失败:', error);
  }
};
const accountList = ref([]);
const getAccountList = async () => {
  try {
    const res = await listChargeAccount();
    if (res.code === 200) {
      accountList.value = res.rows || [];
    }
  } catch (error) {
    console.error('获取运营商列表失败:', error);
  }
};
onMounted(() => {
  getList();
  getVinList();
  getAccountList();
});
</script>
