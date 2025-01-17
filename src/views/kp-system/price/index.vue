<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="充电站ID" prop="stationId">
              <el-input v-model="queryParams.stationId" placeholder="请输入充电站ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="价格模版ID，0为默认价格" prop="priceCode">
              <el-input v-model="queryParams.priceCode" placeholder="请输入价格模版ID，0为默认价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="时段起始时间点 6位 HHmmss" prop="startTime">
              <el-date-picker clearable
                v-model="queryParams.startTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择时段起始时间点 6位 HHmmss"
              />
            </el-form-item>
            <el-form-item label="电价:XXXX.XXXX" prop="elecPrice">
              <el-input v-model="queryParams.elecPrice" placeholder="请输入电价:XXXX.XXXX" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="服务费单价:XXXX.XXXX" prop="servicePrice">
              <el-input v-model="queryParams.servicePrice" placeholder="请输入服务费单价:XXXX.XXXX" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kp-system:price:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kp-system:price:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kp-system:price:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kp-system:price:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="priceList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="自增id" align="center" prop="id" v-if="true" />
        <el-table-column label="充电站ID" align="center" prop="stationId" />
        <el-table-column label="价格模版ID，0为默认价格" align="center" prop="priceCode" />
        <el-table-column label="时段起始时间点 6位 HHmmss" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格类型:0、尖;1、峰;2、平;3、谷;" align="center" prop="priceType" />
        <el-table-column label="电价:XXXX.XXXX" align="center" prop="elecPrice" />
        <el-table-column label="服务费单价:XXXX.XXXX" align="center" prop="servicePrice" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kp-system:price:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kp-system:price:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改桩计费规则对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="priceFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="充电站ID" prop="stationId">
          <el-input v-model="form.stationId" placeholder="请输入充电站ID" />
        </el-form-item>
        <el-form-item label="价格模版ID，0为默认价格" prop="priceCode">
          <el-input v-model="form.priceCode" placeholder="请输入价格模版ID，0为默认价格" />
        </el-form-item>
        <el-form-item label="时段起始时间点 6位 HHmmss" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择时段起始时间点 6位 HHmmss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电价:XXXX.XXXX" prop="elecPrice">
          <el-input v-model="form.elecPrice" placeholder="请输入电价:XXXX.XXXX" />
        </el-form-item>
        <el-form-item label="服务费单价:XXXX.XXXX" prop="servicePrice">
          <el-input v-model="form.servicePrice" placeholder="请输入服务费单价:XXXX.XXXX" />
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

<script setup name="Price" lang="ts">
import { listPrice, getPrice, delPrice, addPrice, updatePrice } from '@/api/kp-system/price';
import { PriceVO, PriceQuery, PriceForm } from '@/api/kp-system/price/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const priceList = ref<PriceVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const priceFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: PriceForm = {
  id: undefined,
  stationId: undefined,
  priceCode: undefined,
  startTime: undefined,
  priceType: undefined,
  elecPrice: undefined,
  servicePrice: undefined,
  remark: undefined,
}
const data = reactive<PageData<PriceForm, PriceQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stationId: undefined,
    priceCode: undefined,
    startTime: undefined,
    priceType: undefined,
    elecPrice: undefined,
    servicePrice: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "自增id不能为空", trigger: "blur" }
    ],
    stationId: [
      { required: true, message: "充电站ID不能为空", trigger: "blur" }
    ],
    priceCode: [
      { required: true, message: "价格模版ID，0为默认价格不能为空", trigger: "blur" }
    ],
    startTime: [
      { required: true, message: "时段起始时间点 6位 HHmmss不能为空", trigger: "blur" }
    ],
    priceType: [
      { required: true, message: "价格类型:0、尖;1、峰;2、平;3、谷;不能为空", trigger: "change" }
    ],
    elecPrice: [
      { required: true, message: "电价:XXXX.XXXX不能为空", trigger: "blur" }
    ],
    servicePrice: [
      { required: true, message: "服务费单价:XXXX.XXXX不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询桩计费规则列表 */
const getList = async () => {
  loading.value = true;
  const res = await listPrice(queryParams.value);
  priceList.value = res.rows;
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
  priceFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: PriceVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加桩计费规则";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: PriceVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getPrice(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改桩计费规则";
}

/** 提交按钮 */
const submitForm = () => {
  priceFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updatePrice(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addPrice(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: PriceVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除桩计费规则编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delPrice(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kp-system/price/export', {
    ...queryParams.value
  }, `price_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
