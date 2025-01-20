<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="凭证编号" prop="voucherNumber">
              <el-input v-model="queryParams.voucherNumber" placeholder="请输入凭证编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="归属运营商" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入归属运营商" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁用" prop="disableFlag">
              <el-input v-model="queryParams.disableFlag" placeholder="请输入禁用" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kpSystem:chargeVoucher:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kpSystem:chargeVoucher:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kpSystem:chargeVoucher:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kpSystem:chargeVoucher:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="chargeVoucherList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="自增id" align="center" prop="id" v-if="false" />
        <el-table-column label="凭证编号" align="center" prop="voucherNumber" />
        <el-table-column label="归属运营商" align="center" prop="operatorId" />
        <el-table-column label="凭证类型" align="center" prop="voucherType">
          <template #default="scope">
            <dict-tag :options="kp_voucher_type" :value="scope.row.voucherType"/>
          </template>
        </el-table-column>
        <el-table-column label="归属账户" align="center" prop="accountId" />
        <el-table-column label="禁用" align="center" prop="disableFlag">
          <template #default="scope">
            <dict-tag :options="kp_disable_flag" :value="scope.row.disableFlag"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
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
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kpSystem:chargeVoucher:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kpSystem:chargeVoucher:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电凭证管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="chargeVoucherFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="凭证编号" prop="voucherNumber">
          <el-input v-model="form.voucherNumber" placeholder="请输入凭证编号" />
        </el-form-item>
        <el-form-item label="归属运营商" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入归属运营商" />
        </el-form-item>
        <el-form-item label="凭证类型" prop="voucherType">
          <el-select v-model="form.voucherType" placeholder="请选择凭证类型">
            <el-option
                v-for="dict in kp_voucher_type"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属账户" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入归属账户" />
        </el-form-item>
        <el-form-item label="禁用" prop="disableFlag">
          <el-input v-model="form.disableFlag" placeholder="请输入禁用" />
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

<script setup name="ChargeVoucher" lang="ts">
import { listChargeVoucher, getChargeVoucher, delChargeVoucher, addChargeVoucher, updateChargeVoucher } from '@/api/kpSystem/chargeVoucher';
import { ChargeVoucherVO, ChargeVoucherQuery, ChargeVoucherForm } from '@/api/kpSystem/chargeVoucher/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_voucher_type } = toRefs<any>(proxy?.useDict('kp_voucher_type'));

const chargeVoucherList = ref<ChargeVoucherVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const chargeVoucherFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ChargeVoucherForm = {
  voucherNumber: undefined,
  operatorId: undefined,
  voucherType: undefined,
  accountId: undefined,
  disableFlag: undefined,
  remark: undefined,
}
const data = reactive<PageData<ChargeVoucherForm, ChargeVoucherQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    voucherNumber: undefined,
    operatorId: undefined,
    disableFlag: undefined,
    params: {
    }
  },
  rules: {
    voucherNumber: [
      { required: true, message: "凭证编号不能为空", trigger: "blur" }
    ],
    operatorId: [
      { required: true, message: "归属运营商不能为空", trigger: "blur" }
    ],
    voucherType: [
      { required: true, message: "凭证类型不能为空", trigger: "change" }
    ],
    accountId: [
      { required: true, message: "归属账户不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电凭证管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listChargeVoucher(queryParams.value);
  chargeVoucherList.value = res.rows;
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
  chargeVoucherFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ChargeVoucherVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加充电凭证管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ChargeVoucherVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getChargeVoucher(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改充电凭证管理";
}

/** 提交按钮 */
const submitForm = () => {
  chargeVoucherFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChargeVoucher(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addChargeVoucher(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ChargeVoucherVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电凭证管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delChargeVoucher(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kpSystem/chargeVoucher/export', {
    ...queryParams.value
  }, `chargeVoucher_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
