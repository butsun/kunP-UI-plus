<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="活动简称" prop="activityName">
              <el-input v-model="queryParams.activityName" placeholder="请输入活动简称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商ID" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入运营商ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点id" prop="stationId">
              <el-input v-model="queryParams.stationId" placeholder="请输入站点id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="服务费折扣" prop="disService">
              <el-input v-model="queryParams.disService" placeholder="请输入服务费折扣" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电费折扣" prop="disElectricity">
              <el-input v-model="queryParams.disElectricity" placeholder="请输入充电费折扣" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kpSystem:discountActivity:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kpSystem:discountActivity:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kpSystem:discountActivity:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kpSystem:discountActivity:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="discountActivityList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="" align="center" prop="id" v-if="true" />
        <el-table-column label="活动简称" align="center" prop="activityName" />
        <el-table-column label="运营商ID" align="center" prop="operatorId" />
        <el-table-column label="站点id" align="center" prop="stationId" />
        <el-table-column label="服务费折扣" align="center" prop="disService" />
        <el-table-column label="充电费折扣" align="center" prop="disElectricity" />
        <el-table-column label="禁用" align="center" prop="disableFlag">
          <template #default="scope">
            <dict-tag :options="kp_disable_flag" :value="scope.row.disableFlag"/>
          </template>
        </el-table-column>
        <el-table-column label="活动类型" align="center" prop="activityType">
          <template #default="scope">
            <dict-tag :options="kp_activity_type" :value="scope.row.activityType"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kpSystem:discountActivity:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kpSystem:discountActivity:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电优惠管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="discountActivityFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动简称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动简称" />
        </el-form-item>
        <el-form-item label="运营商ID" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入运营商ID" />
        </el-form-item>
        <el-form-item label="站点id" prop="stationId">
          <el-input v-model="form.stationId" placeholder="请输入站点id" />
        </el-form-item>
        <el-form-item label="服务费折扣" prop="disService">
          <el-input v-model="form.disService" placeholder="请输入服务费折扣" />
        </el-form-item>
        <el-form-item label="充电费折扣" prop="disElectricity">
          <el-input v-model="form.disElectricity" placeholder="请输入充电费折扣" />
        </el-form-item>
        <el-form-item label="禁用" prop="disableFlag">
          <el-input v-model="form.disableFlag" placeholder="请输入禁用" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-select v-model="form.activityType" placeholder="请选择活动类型">
            <el-option
                v-for="dict in kp_activity_type"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
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

<script setup name="DiscountActivity" lang="ts">
import { listDiscountActivity, getDiscountActivity, delDiscountActivity, addDiscountActivity, updateDiscountActivity } from '@/api/kpSystem/discountActivity';
import { DiscountActivityVO, DiscountActivityQuery, DiscountActivityForm } from '@/api/kpSystem/discountActivity/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_activity_type } = toRefs<any>(proxy?.useDict('kp_activity_type'));

const discountActivityList = ref<DiscountActivityVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const discountActivityFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DiscountActivityForm = {
  id: undefined,
  activityName: undefined,
  operatorId: undefined,
  stationId: undefined,
  disService: undefined,
  disElectricity: undefined,
  disableFlag: undefined,
  activityType: undefined,
  remark: undefined,
}
const data = reactive<PageData<DiscountActivityForm, DiscountActivityQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    activityName: undefined,
    operatorId: undefined,
    stationId: undefined,
    disService: undefined,
    disElectricity: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    activityName: [
      { required: true, message: "活动简称不能为空", trigger: "blur" }
    ],
    operatorId: [
      { required: true, message: "运营商ID不能为空", trigger: "blur" }
    ],
    disService: [
      { required: true, message: "服务费折扣不能为空", trigger: "blur" }
    ],
    disElectricity: [
      { required: true, message: "充电费折扣不能为空", trigger: "blur" }
    ],
    activityType: [
      { required: true, message: "活动类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电优惠管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDiscountActivity(queryParams.value);
  discountActivityList.value = res.rows;
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
  discountActivityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DiscountActivityVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加充电优惠管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DiscountActivityVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDiscountActivity(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改充电优惠管理";
}

/** 提交按钮 */
const submitForm = () => {
  discountActivityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDiscountActivity(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDiscountActivity(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DiscountActivityVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电优惠管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDiscountActivity(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kpSystem/discountActivity/export', {
    ...queryParams.value
  }, `discountActivity_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
