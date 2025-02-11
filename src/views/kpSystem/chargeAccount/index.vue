<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="账户类型" prop="accoutType">
              <el-select v-model="queryParams.accoutType" placeholder="请选择账户类型" clearable>
                <el-option v-for="dict in kp_accout_type" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-button v-hasPermi="['kpSystem:chargeAccount:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeAccount:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeAccount:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:chargeAccount:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>
      <!-- 账户编号、账户昵称、账户类型、归属运营商、状态、注册时间、账户余额 -->
      <el-table v-loading="loading" :data="chargeAccountList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="false" label="账户编号" align="center" prop="id" />
        <!-- <el-table-column label="账户编号" align="center" prop="mobile" /> -->
        <el-table-column label="昵称" align="center" prop="nickName" />
        <el-table-column label="账户类型" align="center" prop="accoutType" width="120" show-overflow-tooltip>
          <template #default="scope">
            <dict-tag :options="kp_accout_type" :value="scope.row.accoutType" />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="disableFlag">
          <template #default="scope">
            <dict-tag :options="kp_disable_flag" :value="scope.row.disableFlag" />
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center" prop="registerTime" width="180" />
        <el-table-column label="账户余额 " align="center" prop="balance" width="180" />
        <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:chargeAccount:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                v-hasPermi="['kpSystem:chargeAccount:remove']"
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电账户对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="chargeAccountFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option v-for="dict in kp_user_sex" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户类型" prop="accoutType">
          <el-select v-model="form.accoutType" placeholder="请选择账户类型">
            <el-option v-for="dict in kp_accout_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属运营商" prop="operatorId">
          <el-select v-model="form.operatorId" placeholder="请选择运营商" clearable filterable @change="handleQuery">
            <el-option v-for="item in operatorList" :key="item.id" :label="item.operatorName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="禁用" prop="disableFlag">
          <!-- <el-input v-model="form.disableFlag" placeholder="请输入禁用" /> -->
          <el-select v-model="form.disableFlag" placeholder="请选择禁用类型">
            <el-option v-for="dict in kp_disable_flag" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
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

<script setup name="ChargeAccount" lang="ts">
import { listChargeAccount, getChargeAccount, delChargeAccount, addChargeAccount, updateChargeAccount } from '@/api/kpSystem/chargeAccount';
import { ChargeAccountVO, ChargeAccountQuery, ChargeAccountForm } from '@/api/kpSystem/chargeAccount/types';
import { listOperator } from '@/api/kpSystem/operator';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_user_sex, kp_accout_type, kp_disable_flag } = toRefs<any>(proxy?.useDict('kp_user_sex', 'kp_accout_type', 'kp_disable_flag'));

const chargeAccountList = ref<ChargeAccountVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeRegisterTime = ref<[DateModelType, DateModelType]>(['', '']);
const dateRangeLastVisitTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const chargeAccountFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: any = {
  mobile: undefined,
  nickName: undefined,
  sex: undefined,
  accoutType: undefined,
  disableFlag: undefined,
  remark: undefined,
  balance: undefined,
  operatorId: undefined
};
const data = reactive({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    mobile: undefined,
    nickName: undefined,
    accoutType: undefined,
    disableFlag: undefined,
    params: {}
  },
  rules: {
    mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
    nickName: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电账户列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeRegisterTime.value, 'RegisterTime');
  proxy?.addDateRange(queryParams.value, dateRangeLastVisitTime.value, 'LastVisitTime');
  const res = await listChargeAccount(queryParams.value);
  chargeAccountList.value = res.rows;
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
  chargeAccountFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeRegisterTime.value = ['', ''];
  dateRangeLastVisitTime.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: ChargeAccountVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加充电账户';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ChargeAccountVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getChargeAccount(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改充电账户';
};

/** 提交按钮 */
const submitForm = () => {
  chargeAccountFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChargeAccount(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addChargeAccount(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ChargeAccountVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电账户编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delChargeAccount(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/chargeAccount/export',
    {
      ...queryParams.value
    },
    `chargeAccount_${new Date().getTime()}.xlsx`
  );
};
const operatorList = ref([]);
const getOperatorList = async () => {
  try {
    const res = await listOperator();
    if (res.code === 200) {
      operatorList.value = res.rows || [];
    }
  } catch (error) {
    console.error('获取运营商列表失败:', error);
  }
};
onMounted(() => {
  getList();
  getOperatorList();
});
</script>
