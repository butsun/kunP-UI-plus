<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover" class="search-wrapper">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true" label-width="90px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="运营商" prop="operatorName">
                  <el-input v-model="queryParams.operatorName" placeholder="请输入运营商名称" clearable @keyup.enter="handleQuery" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <RegionSelect
                  v-model:province="queryParams.province"
                  v-model:city="queryParams.city"
                  label="地区"
                  :prop="['province', 'city']"
                  @change="handleSearchRegionChange"
                />
              </el-col>
              <el-col :span="6">
                <el-form-item class="mb-0 text-right">
                  <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                  <el-button icon="Refresh" class="ml-2" @click="resetQuery">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:operator:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:operator:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:operator:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:operator:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="operatorList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="运营商" align="center" prop="operatorName" min-width="120" show-overflow-tooltip />
        <el-table-column label="省份" align="center" prop="province" min-width="100" />
        <el-table-column label="城市" align="center" prop="city" min-width="100" />
        <el-table-column label="地址" align="center" prop="address" min-width="150" show-overflow-tooltip />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180" />

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:operator:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-hasPermi="['kpSystem:operator:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改运营商管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="operatorFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运营商" prop="operatorName">
          <el-input v-model="form.operatorName" placeholder="请输入运营商名称" />
        </el-form-item>
        <RegionSelect
          v-model:province="form.province"
          v-model:city="form.city"
          label="地区"
          :prop="['province', 'city']"
          @change="handleRegionChange"
        />
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
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
import { listOperator, getOperator, delOperator, addOperator, updateOperator } from '@/api/kpSystem/operator';
import { OperatorVO, OperatorQuery, OperatorForm } from '@/api/kpSystem/operator/types';
import { ref, onMounted } from 'vue';
import { RegionSelect } from '@/components/RegionSelect';

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
  operatorName: undefined,
  province: undefined,
  city: undefined,
  address: undefined
};
const data = reactive<PageData<OperatorForm, OperatorQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    operatorName: undefined,
    province: undefined,
    city: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '不能为空', trigger: 'blur' }],
    operatorName: [{ required: true, message: '运营商名称不能为空', trigger: 'blur' }],
    province: [{ required: true, message: '省份不能为空', trigger: 'blur' }],
    city: [{ required: true, message: '城市不能为空', trigger: 'blur' }],
    address: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询运营商管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOperator(queryParams.value);
  operatorList.value = res.rows;
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
  operatorFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OperatorVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加运营商管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: OperatorVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getOperator(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改运营商管理';
};

/** 提交按钮 */
const submitForm = () => {
  operatorFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateOperator(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addOperator(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: OperatorVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除运营商管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delOperator(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/operator/export',
    {
      ...queryParams.value
    },
    `operator_${new Date().getTime()}.xlsx`
  );
};

// 处理地区选择变化
const handleRegionChange = (region: { province: string; city: string; provinceId: string; cityId: string }) => {
  // 使用地区名称而不是ID
  form.value.province = region.province;
  form.value.city = region.city;
};

// 处理搜索地区选择变化
const handleSearchRegionChange = (region: { province: string; city: string; provinceId: string; cityId: string }) => {
  queryParams.value.province = region.province;
  queryParams.value.city = region.city;
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.search-wrapper {
  :deep(.el-form-item) {
    margin-bottom: 18px;
    .el-form-item__label {
      font-weight: normal;
    }
    &.mb-0 {
      margin-bottom: 0;
    }
  }
  :deep(.el-input) {
    width: 100%;
  }
  .text-right {
    text-align: right;
    padding-right: 20px;
  }
}

:deep(.form-item-no-wrap) {
  .el-form-item__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

:deep(.el-table) {
  .el-table__header {
    th {
      background-color: var(--el-fill-color-light);
      color: var(--el-text-color-primary);
      font-weight: 500;
    }
  }
}
</style>
