<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="运营商" prop="operatorId">
              <el-select v-model="queryParams.operatorId" filterable clearable placeholder="请选择运营商">
                <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-button v-hasPermi="['kpSystem:discountActivity:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:discountActivity:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['kpSystem:discountActivity:remove']"
              type="danger"
              plain
              icon="Delete"
              :disabled="multiple"
              @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:discountActivity:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="discountActivityList" @selection-change="handleSelectionChange">
        <!-- 2. 列表栏保留   活动名称、站点名称、服务费折扣、充电费折扣、状态、备注 -->
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="活动名称" align="center" prop="activityName" />
        <el-table-column label="运营商" align="center" prop="operatorName" />
        <el-table-column label="服务费折扣(%)" align="center" prop="disService" />
        <el-table-column label="充电费折扣(%)" align="center" prop="disElectricity" />
        <el-table-column label="禁用类型" align="center" prop="disableFlag">
          <template #default="scope">
            <dict-tag :options="kp_disable_flag" :value="scope.row.disableFlag" />
          </template>
        </el-table-column>
        <el-table-column label="活动类型" align="center" prop="activityType">
          <template #default="scope">
            <dict-tag :options="kp_activity_type" :value="scope.row.activityType" />
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:discountActivity:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                v-hasPermi="['kpSystem:discountActivity:remove']"
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
    <!-- 添加或修改充电优惠管理对话框 -->
    <!-- 2. 列表栏保留   活动名称、站点名称、服务费折扣、充电费折扣、状态、备注 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="discountActivityFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="运营商" prop="operatorId">
          <!-- <el-input v-model="form.operatorId" placeholder="请输入运营商ID" /> -->
          <el-select v-model="form.operatorId" filterable placeholder="请选择供应商">
            <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="站点" prop="stationId">
          <el-select v-model="form.stationId" filterable placeholder="请输入选择站点">
            <el-option v-for="item in stationOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务费折扣" prop="disService">
          <el-input v-model="form.disService" placeholder="请输入服务费折扣">
            <template #suffix>
              <el-icon class="el-input__icon">%</el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="充电费折扣" prop="disElectricity">
          <el-input v-model="form.disElectricity" placeholder="请输入充电费折扣">
            <template #suffix>
              <el-icon class="el-input__icon">%</el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="禁用类型" prop="disableFlag">
          <!-- <el-input v-model="form.disableFlag" placeholder="请输入状态" /> -->
          <el-select v-model="form.disableFlag" placeholder="请选择禁用类型">
            <el-option v-for="dict in kp_disable_flag" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-select v-model="form.activityType" placeholder="请选择活动类型">
            <el-option v-for="dict in kp_activity_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
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
import {
  listDiscountActivity,
  getDiscountActivity,
  delDiscountActivity,
  addDiscountActivity,
  updateDiscountActivity
} from '@/api/kpSystem/discountActivity';
import { stationLike, operatorLike } from '@/api/common';
import { DiscountActivityVO, DiscountActivityQuery, DiscountActivityForm } from '@/api/kpSystem/discountActivity/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_activity_type, kp_disable_flag } = toRefs<any>(proxy?.useDict('kp_activity_type', 'kp_disable_flag'));

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
  remark: undefined
};
const data = reactive<PageData<DiscountActivityForm, DiscountActivityQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    activityName: undefined,
    operatorId: undefined,
    disService: undefined,
    disElectricity: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '不能为空', trigger: 'blur' }],
    activityName: [{ required: true, message: '活动简称不能为空', trigger: 'blur' }],
    operatorId: [{ required: true, message: '运营商ID不能为空', trigger: 'blur' }],
    disService: [{ required: true, message: '服务费折扣不能为空', trigger: 'blur' }],
    disElectricity: [{ required: true, message: '充电费折扣不能为空', trigger: 'blur' }],
    activityType: [{ required: true, message: '活动类型不能为空', trigger: 'change' }]
  }
});

const { queryParams, form, rules } = toRefs(data);
const stationOptions = ref([]);
const operatorOptions = ref([]);
/** 查询充电优惠管理列表 */
const getList = async () => {
  loading.value = true;
  const res: any = await listDiscountActivity(queryParams.value);
  res.rows.forEach((row: any) => {
    // console.log(row.disElectricity);
    // console.log(row.disService);
    row.disElectricity = parseFloat((Number(row.disElectricity) * 100).toFixed(2));
    row.disService = parseFloat((Number(row.disService) * 100).toFixed(2));
  });
  discountActivityList.value = res.rows;
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
  discountActivityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DiscountActivityVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加充电优惠管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: DiscountActivityVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getDiscountActivity(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改充电优惠管理';
};

/** 提交按钮 */
const submitForm = () => {
  discountActivityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDiscountActivity(form.value).finally(() => (buttonLoading.value = false));
      } else {
        form.value.disElectricity = parseFloat((form.value.disElectricity / 100).toFixed(2));
        form.value.disService = parseFloat((form.value.disService / 100).toFixed(2));
        await addDiscountActivity(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: DiscountActivityVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电优惠管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delDiscountActivity(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/discountActivity/export',
    {
      ...queryParams.value
    },
    `discountActivity_${new Date().getTime()}.xlsx`
  );
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
onMounted(() => {
  getList();
  stationLists();
  operatorLists();
});
</script>
