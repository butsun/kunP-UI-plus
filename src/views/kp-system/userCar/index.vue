<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="归属账户ID" prop="accountId">
              <el-input v-model="queryParams.accountId" placeholder="请输入归属账户ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="车牌号" prop="plateNo">
              <el-input v-model="queryParams.plateNo" placeholder="请输入车牌号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="车辆vin码" prop="carVin">
              <el-input v-model="queryParams.carVin" placeholder="请输入车辆vin码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌型号" prop="carModel">
              <el-input v-model="queryParams.carModel" placeholder="请输入品牌型号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="车辆所有人" prop="owner">
              <el-input v-model="queryParams.owner" placeholder="请输入车辆所有人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="使用性质:运营、非运营" prop="useCharacter">
              <el-input v-model="queryParams.useCharacter" placeholder="请输入使用性质:运营、非运营" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="注册日期" prop="registerDate">
              <el-date-picker clearable
                v-model="queryParams.registerDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择注册日期"
              />
            </el-form-item>
            <el-form-item label="发证日期" prop="issueDate">
              <el-date-picker clearable
                v-model="queryParams.issueDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择发证日期"
              />
            </el-form-item>
            <el-form-item label="行驶证图片json串" prop="licenseImgs">
              <el-input v-model="queryParams.licenseImgs" placeholder="请输入行驶证图片json串" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核" prop="checkState">
              <el-input v-model="queryParams.checkState" placeholder="请输入审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过" prop="authState">
              <el-input v-model="queryParams.authState" placeholder="请输入认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kp-system:userCar:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kp-system:userCar:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kp-system:userCar:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kp-system:userCar:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="userCarList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="车辆ID" align="center" prop="id" v-if="true" />
        <el-table-column label="归属账户ID" align="center" prop="accountId" />
        <el-table-column label="车牌号" align="center" prop="plateNo" />
        <el-table-column label="车辆vin码" align="center" prop="carVin" />
        <el-table-column label="品牌型号" align="center" prop="carModel" />
        <el-table-column label="车辆所有人" align="center" prop="owner" />
        <el-table-column label="使用性质:运营、非运营" align="center" prop="useCharacter" />
        <el-table-column label="注册日期" align="center" prop="registerDate" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.registerDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发证日期" align="center" prop="issueDate" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.issueDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行驶证图片json串" align="center" prop="licenseImgs" />
        <el-table-column label="审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核" align="center" prop="checkState" />
        <el-table-column label="认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过" align="center" prop="authState" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kp-system:userCar:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kp-system:userCar:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改车辆管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="userCarFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="归属账户ID" prop="accountId">
          <el-input v-model="form.accountId" placeholder="请输入归属账户ID" />
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNo">
          <el-input v-model="form.plateNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车辆vin码" prop="carVin">
          <el-input v-model="form.carVin" placeholder="请输入车辆vin码" />
        </el-form-item>
        <el-form-item label="品牌型号" prop="carModel">
          <el-input v-model="form.carModel" placeholder="请输入品牌型号" />
        </el-form-item>
        <el-form-item label="车辆所有人" prop="owner">
          <el-input v-model="form.owner" placeholder="请输入车辆所有人" />
        </el-form-item>
        <el-form-item label="使用性质:运营、非运营" prop="useCharacter">
          <el-input v-model="form.useCharacter" placeholder="请输入使用性质:运营、非运营" />
        </el-form-item>
        <el-form-item label="注册日期" prop="registerDate">
          <el-date-picker clearable
            v-model="form.registerDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择注册日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发证日期" prop="issueDate">
          <el-date-picker clearable
            v-model="form.issueDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发证日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="行驶证图片json串" prop="licenseImgs">
            <el-input v-model="form.licenseImgs" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核" prop="checkState">
          <el-input v-model="form.checkState" placeholder="请输入审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核" />
        </el-form-item>
        <el-form-item label="认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过" prop="authState">
          <el-input v-model="form.authState" placeholder="请输入认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过" />
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
import { listUserCar, getUserCar, delUserCar, addUserCar, updateUserCar } from '@/api/kp-system/userCar';
import { UserCarVO, UserCarQuery, UserCarForm } from '@/api/kp-system/userCar/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

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
  owner: undefined,
  useCharacter: undefined,
  registerDate: undefined,
  issueDate: undefined,
  licenseImgs: undefined,
  checkState: undefined,
  authState: undefined,
  remark: undefined,
}
const data = reactive<PageData<UserCarForm, UserCarQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    accountId: undefined,
    plateNo: undefined,
    carVin: undefined,
    carModel: undefined,
    owner: undefined,
    useCharacter: undefined,
    registerDate: undefined,
    issueDate: undefined,
    licenseImgs: undefined,
    checkState: undefined,
    authState: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "车辆ID不能为空", trigger: "blur" }
    ],
    accountId: [
      { required: true, message: "归属账户ID不能为空", trigger: "blur" }
    ],
    plateNo: [
      { required: true, message: "车牌号不能为空", trigger: "blur" }
    ],
    carVin: [
      { required: true, message: "车辆vin码不能为空", trigger: "blur" }
    ],
    carModel: [
      { required: true, message: "品牌型号不能为空", trigger: "blur" }
    ],
    owner: [
      { required: true, message: "车辆所有人不能为空", trigger: "blur" }
    ],
    useCharacter: [
      { required: true, message: "使用性质:运营、非运营不能为空", trigger: "blur" }
    ],
    registerDate: [
      { required: true, message: "注册日期不能为空", trigger: "blur" }
    ],
    issueDate: [
      { required: true, message: "发证日期不能为空", trigger: "blur" }
    ],
    licenseImgs: [
      { required: true, message: "行驶证图片json串不能为空", trigger: "blur" }
    ],
    checkState: [
      { required: true, message: "审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核不能为空", trigger: "blur" }
    ],
    authState: [
      { required: true, message: "认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
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
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  userCarFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: UserCarVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加车辆管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: UserCarVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getUserCar(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改车辆管理";
}

/** 提交按钮 */
const submitForm = () => {
  userCarFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateUserCar(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addUserCar(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: UserCarVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除车辆管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delUserCar(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kp-system/userCar/export', {
    ...queryParams.value
  }, `userCar_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
