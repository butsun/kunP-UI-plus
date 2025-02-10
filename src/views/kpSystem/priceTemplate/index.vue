<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="计费编号" prop="priceCode">
              <el-input v-model="queryParams.priceCode" placeholder="请输入计费编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable @keyup.enter="handleQuery" />
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
            <el-button v-hasPermi="['kpSystem:priceTemplate:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:priceTemplate:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:priceTemplate:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:priceTemplate:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="priceTemplateList">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="模版名称" align="center" prop="priceName" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="最后修改时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button link type="primary" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>

    <!-- 价格规则配置对话框 -->
    <price-rule-config
      v-if="dialog.visible"
      ref="priceRuleConfigRef"
      v-model="dialog.visible"
      :title="dialog.title"
      @submit="handlePriceRuleSubmit"
    />
  </div>
</template>

<script setup name="PriceTemplate" lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import PriceRuleConfig from './components/PriceRuleConfig.vue';
import {
  listPriceTemplate,
  getPriceTemplate,
  delPriceTemplate,
  addPriceTemplate,
  updatePriceTemplate,
  getPriceTemplateDetail
} from '@/api/kpSystem/priceTemplate';
import { PriceTemplateVO, PriceTemplateForm, PriceTemplateQuery } from '@/api/kpSystem/priceTemplate/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const loading = ref(false);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const priceTemplateList = ref<PriceTemplateVO[]>([]);
const showSearch = ref(true);
const single = ref(true);
const multiple = ref(true);

const queryParams = reactive<PriceTemplateQuery>({
  pageNum: 1,
  pageSize: 10,
  priceCode: undefined,
  remark: undefined
});

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: PriceTemplateForm = {
  id: undefined,
  priceCode: undefined,
  remark: undefined
};
const data = reactive<PageData<PriceTemplateForm, PriceTemplateQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    priceCode: undefined,
    remark: undefined,
    params: {}
  },
  rules: {
    priceCode: [{ required: true, message: '计费编号不能为空', trigger: 'blur' }],
    remark: [{ required: false, message: '备注不能为空', trigger: 'blur' }]
  }
});

const { queryParams: dataQueryParams, form, rules } = toRefs(data);

const priceRuleConfigRef = ref();

/** 查询列表 */
const getList = async () => {
  loading.value = true;
  try {
    const res = await listPriceTemplate(queryParams);
    priceTemplateList.value = res.rows;
    total.value = res.total;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryParams.priceCode = undefined;
  queryParams.remark = undefined;
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: PriceTemplateVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = '新增计费规则';
};

/** 修改按钮操作 */
const handleUpdate = async (row: any) => {
  try {
    const res = await getPriceTemplateDetail(row.id);
    dialog.visible = true;
    dialog.title = '修改计费规则';
    // 等待 DOM 更新后操作子组件
    // 传递详情数据给子组件
    nextTick(() => {
      if (priceRuleConfigRef.value) {
        console.log(priceRuleConfigRef.value);
        priceRuleConfigRef.value.setFormData(res.data);
      }
    });
  } catch (error) {
    console.error('获取详情失败:', error);
  }
};

// 提交处理
const handlePriceRuleSubmit = async (formData: any) => {
  try {
    formData.periods = JSON.stringify(formData.priceList);
    delete formData.priceList;
    await addPriceTemplate(formData);
    ElMessage.success('保存成功');
    dialog.visible = false;
    await getList();
  } catch (error) {
    console.error('保存失败:', error);
  }
};

/** 删除按钮操作 */
const handleDelete = async (row?: PriceTemplateVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点价格模版编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delPriceTemplate(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/priceTemplate/export',
    {
      ...queryParams
    },
    `priceTemplate_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
});
</script>
