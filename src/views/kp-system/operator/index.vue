<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="运营商ID" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入运营商ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="机构全称" prop="operatorName">
              <el-input v-model="queryParams.operatorName" placeholder="请输入机构全称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商电话1" prop="operatorTel1">
              <el-input v-model="queryParams.operatorTel1" placeholder="请输入运营商电话1" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商电话2" prop="operatorTel2">
              <el-input v-model="queryParams.operatorTel2" placeholder="请输入运营商电话2" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商注册地址" prop="operatorRegAddress">
              <el-input v-model="queryParams.operatorRegAddress" placeholder="请输入运营商注册地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="备注信息" prop="operatorNote">
              <el-input v-model="queryParams.operatorNote" placeholder="请输入备注信息" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商国标接口http请求前缀，以/结尾" prop="host">
              <el-input v-model="queryParams.host" placeholder="请输入运营商国标接口http请求前缀，以/结尾" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商密钥0-F字符组成,可采用32H、48H、64H" prop="operatorSecret">
              <el-input v-model="queryParams.operatorSecret" placeholder="请输入运营商密钥0-F字符组成,可采用32H、48H、64H" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="消息密钥" prop="dataSecret">
              <el-input v-model="queryParams.dataSecret" placeholder="请输入消息密钥" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="消息密钥初始化向量 固定16位 用户AES加密过程的混合加密" prop="dataSecretIv">
              <el-input v-model="queryParams.dataSecretIv" placeholder="请输入消息密钥初始化向量 固定16位 用户AES加密过程的混合加密" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥" prop="sigSecret">
              <el-input v-model="queryParams.sigSecret" placeholder="请输入签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台我方组织机构编码" prop="myOperatorId">
              <el-input v-model="queryParams.myOperatorId" placeholder="请输入用户平台我方组织机构编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台密钥" prop="userOperatorSecret">
              <el-input v-model="queryParams.userOperatorSecret" placeholder="请输入用户平台密钥" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台消息密钥" prop="userDataSecret">
              <el-input v-model="queryParams.userDataSecret" placeholder="请输入用户平台消息密钥" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台消息密钥初始化向量" prop="userDataSecretIv">
              <el-input v-model="queryParams.userDataSecretIv" placeholder="请输入用户平台消息密钥初始化向量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台签名密钥" prop="userSigSecret">
              <el-input v-model="queryParams.userSigSecret" placeholder="请输入用户平台签名密钥" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kp-system:operator:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kp-system:operator:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kp-system:operator:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kp-system:operator:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="operatorList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="" align="center" prop="id" v-if="true" />
        <el-table-column label="运营商ID" align="center" prop="operatorId" />
        <el-table-column label="机构全称" align="center" prop="operatorName" />
        <el-table-column label="运营商电话1" align="center" prop="operatorTel1" />
        <el-table-column label="运营商电话2" align="center" prop="operatorTel2" />
        <el-table-column label="运营商注册地址" align="center" prop="operatorRegAddress" />
        <el-table-column label="备注信息" align="center" prop="operatorNote" />
        <el-table-column label="运营商国标接口http请求前缀，以/结尾" align="center" prop="host" />
        <el-table-column label="运营商密钥0-F字符组成,可采用32H、48H、64H" align="center" prop="operatorSecret" />
        <el-table-column label="消息密钥" align="center" prop="dataSecret" />
        <el-table-column label="消息密钥初始化向量 固定16位 用户AES加密过程的混合加密" align="center" prop="dataSecretIv" />
        <el-table-column label="签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥" align="center" prop="sigSecret" />
        <el-table-column label="用户平台我方组织机构编码" align="center" prop="myOperatorId" />
        <el-table-column label="用户平台密钥" align="center" prop="userOperatorSecret" />
        <el-table-column label="用户平台消息密钥" align="center" prop="userDataSecret" />
        <el-table-column label="用户平台消息密钥初始化向量" align="center" prop="userDataSecretIv" />
        <el-table-column label="用户平台签名密钥" align="center" prop="userSigSecret" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kp-system:operator:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kp-system:operator:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改基础运营商管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="operatorFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运营商ID" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入运营商ID" />
        </el-form-item>
        <el-form-item label="机构全称" prop="operatorName">
          <el-input v-model="form.operatorName" placeholder="请输入机构全称" />
        </el-form-item>
        <el-form-item label="运营商电话1" prop="operatorTel1">
          <el-input v-model="form.operatorTel1" placeholder="请输入运营商电话1" />
        </el-form-item>
        <el-form-item label="运营商电话2" prop="operatorTel2">
          <el-input v-model="form.operatorTel2" placeholder="请输入运营商电话2" />
        </el-form-item>
        <el-form-item label="运营商注册地址" prop="operatorRegAddress">
          <el-input v-model="form.operatorRegAddress" placeholder="请输入运营商注册地址" />
        </el-form-item>
        <el-form-item label="备注信息" prop="operatorNote">
          <el-input v-model="form.operatorNote" placeholder="请输入备注信息" />
        </el-form-item>
        <el-form-item label="运营商国标接口http请求前缀，以/结尾" prop="host">
          <el-input v-model="form.host" placeholder="请输入运营商国标接口http请求前缀，以/结尾" />
        </el-form-item>
        <el-form-item label="运营商密钥0-F字符组成,可采用32H、48H、64H" prop="operatorSecret">
          <el-input v-model="form.operatorSecret" placeholder="请输入运营商密钥0-F字符组成,可采用32H、48H、64H" />
        </el-form-item>
        <el-form-item label="消息密钥" prop="dataSecret">
          <el-input v-model="form.dataSecret" placeholder="请输入消息密钥" />
        </el-form-item>
        <el-form-item label="消息密钥初始化向量 固定16位 用户AES加密过程的混合加密" prop="dataSecretIv">
          <el-input v-model="form.dataSecretIv" placeholder="请输入消息密钥初始化向量 固定16位 用户AES加密过程的混合加密" />
        </el-form-item>
        <el-form-item label="签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥" prop="sigSecret">
          <el-input v-model="form.sigSecret" placeholder="请输入签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥" />
        </el-form-item>
        <el-form-item label="用户平台我方组织机构编码" prop="myOperatorId">
          <el-input v-model="form.myOperatorId" placeholder="请输入用户平台我方组织机构编码" />
        </el-form-item>
        <el-form-item label="用户平台密钥" prop="userOperatorSecret">
          <el-input v-model="form.userOperatorSecret" placeholder="请输入用户平台密钥" />
        </el-form-item>
        <el-form-item label="用户平台消息密钥" prop="userDataSecret">
          <el-input v-model="form.userDataSecret" placeholder="请输入用户平台消息密钥" />
        </el-form-item>
        <el-form-item label="用户平台消息密钥初始化向量" prop="userDataSecretIv">
          <el-input v-model="form.userDataSecretIv" placeholder="请输入用户平台消息密钥初始化向量" />
        </el-form-item>
        <el-form-item label="用户平台签名密钥" prop="userSigSecret">
          <el-input v-model="form.userSigSecret" placeholder="请输入用户平台签名密钥" />
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

<script setup name="Operator" lang="ts">
import { listOperator, getOperator, delOperator, addOperator, updateOperator } from '@/api/kp-system/operator';
import { OperatorVO, OperatorQuery, OperatorForm } from '@/api/kp-system/operator/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const operatorList = ref<OperatorVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const operatorFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OperatorForm = {
  id: undefined,
  operatorId: undefined,
  operatorName: undefined,
  operatorTel1: undefined,
  operatorTel2: undefined,
  operatorRegAddress: undefined,
  operatorNote: undefined,
  host: undefined,
  operatorSecret: undefined,
  dataSecret: undefined,
  dataSecretIv: undefined,
  sigSecret: undefined,
  myOperatorId: undefined,
  userOperatorSecret: undefined,
  userDataSecret: undefined,
  userDataSecretIv: undefined,
  userSigSecret: undefined,
}
const data = reactive<PageData<OperatorForm, OperatorQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    operatorId: undefined,
    operatorName: undefined,
    operatorTel1: undefined,
    operatorTel2: undefined,
    operatorRegAddress: undefined,
    operatorNote: undefined,
    host: undefined,
    operatorSecret: undefined,
    dataSecret: undefined,
    dataSecretIv: undefined,
    sigSecret: undefined,
    myOperatorId: undefined,
    userOperatorSecret: undefined,
    userDataSecret: undefined,
    userDataSecretIv: undefined,
    userSigSecret: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    operatorId: [
      { required: true, message: "运营商ID不能为空", trigger: "blur" }
    ],
    operatorName: [
      { required: true, message: "机构全称不能为空", trigger: "blur" }
    ],
    operatorTel1: [
      { required: true, message: "运营商电话1不能为空", trigger: "blur" }
    ],
    operatorTel2: [
      { required: true, message: "运营商电话2不能为空", trigger: "blur" }
    ],
    operatorRegAddress: [
      { required: true, message: "运营商注册地址不能为空", trigger: "blur" }
    ],
    operatorNote: [
      { required: true, message: "备注信息不能为空", trigger: "blur" }
    ],
    host: [
      { required: true, message: "运营商国标接口http请求前缀，以/结尾不能为空", trigger: "blur" }
    ],
    operatorSecret: [
      { required: true, message: "运营商密钥0-F字符组成,可采用32H、48H、64H不能为空", trigger: "blur" }
    ],
    dataSecret: [
      { required: true, message: "消息密钥不能为空", trigger: "blur" }
    ],
    dataSecretIv: [
      { required: true, message: "消息密钥初始化向量 固定16位 用户AES加密过程的混合加密不能为空", trigger: "blur" }
    ],
    sigSecret: [
      { required: true, message: "签名密钥0-F字符组成,可采用32H、48H、64H 为签名的加密密钥不能为空", trigger: "blur" }
    ],
    myOperatorId: [
      { required: true, message: "用户平台我方组织机构编码不能为空", trigger: "blur" }
    ],
    userOperatorSecret: [
      { required: true, message: "用户平台密钥不能为空", trigger: "blur" }
    ],
    userDataSecret: [
      { required: true, message: "用户平台消息密钥不能为空", trigger: "blur" }
    ],
    userDataSecretIv: [
      { required: true, message: "用户平台消息密钥初始化向量不能为空", trigger: "blur" }
    ],
    userSigSecret: [
      { required: true, message: "用户平台签名密钥不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询基础运营商管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOperator(queryParams.value);
  operatorList.value = res.rows;
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
  operatorFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OperatorVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加基础运营商管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OperatorVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getOperator(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改基础运营商管理";
}

/** 提交按钮 */
const submitForm = () => {
  operatorFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOperator(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOperator(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OperatorVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除基础运营商管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delOperator(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kp-system/operator/export', {
    ...queryParams.value
  }, `operator_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
