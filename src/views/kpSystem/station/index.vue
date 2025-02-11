<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true" label-width="80px">
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="运营商" prop="operatorId">
                  <el-select
                    v-model="queryParams.operatorId"
                    placeholder="请选择运营商"
                    clearable
                    filterable
                    style="width: 240px"
                    @change="handleQuery"
                  >
                    <el-option v-for="item in operatorList" :key="item.id" :label="item.operatorName" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="站点名称" prop="stationName">
                  <el-input
                    v-model="queryParams.stationName"
                    placeholder="请输入站点名称"
                    clearable
                    style="width: 240px"
                    @keyup.enter="handleQuery"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="flex justify-end">
                  <el-button type="primary" icon="Search" style="margin-right: 8px" @click="handleQuery">搜索</el-button>
                  <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24"> </el-row>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:station:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:station:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:station:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['kpSystem:station:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="归属运营商" align="center" min-width="120" show-overflow-tooltip>
          <template #default="scope">
            {{ operatorList.find((op) => op.id === scope.row.operatorId)?.operatorName }}
          </template>
          
        </el-table-column> -->
        <el-table-column label="运营商" align="center" prop="operatorName" min-width="120" show-overflow-tooltip>
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
              @click="copyText(row.operatorName)"
            >
              {{ row.operatorName }}
            </a>
          </template>
        </el-table-column>
        <!-- <el-table-column label="站点名称" align="center" prop="stationName" min-width="120" show-overflow-tooltip /> -->
        <el-table-column label="站点名称" align="center" prop="stationName" min-width="120" show-overflow-tooltip>
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
              @click="copyText(row.stationName)"
            >
              {{ row.stationName }}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="计费模版" align="center" prop="priceTemplateName" min-width="120" show-overflow-tooltip />
        <el-table-column label="省" align="center" prop="province" />
        <el-table-column label="市" align="center" prop="city" />
        <el-table-column label="详细地址" align="center" prop="address" min-width="120" show-overflow-tooltip />
        <el-table-column label="类型" align="center" prop="stationType">
          <template #default="scope">
            <dict-tag :options="kp_station_type" :value="scope.row.stationType" />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="stationStatus">
          <template #default="scope">
            <dict-tag :options="kp_station_status" :value="scope.row.stationStatus" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:station:view']" link type="primary" icon="View" @click="handleView(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['kpSystem:station:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button v-hasPermi="['kpSystem:station:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改站点管理对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body>
      <el-form ref="stationFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="归属运营商" prop="operatorId">
          <el-select v-model="form.operatorId" placeholder="请选择运营商" clearable filterable style="width: 240px" :disabled="isDetail">
            <el-option v-for="item in operatorList" :key="item.id" :label="item.operatorName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="站点名称" prop="stationName">
          <el-input v-model="form.stationName" placeholder="请输入站点名称" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item v-if="isDetail" label="地区" prop="province">
          <el-input v-model="form.province" placeholder="请输入站点名称" style="width: 180px" :disabled="isDetail" />
          <el-input v-model="form.city" placeholder="请输入站点名称" style="width: 180px; margin-left: 12px" :disabled="isDetail" />
        </el-form-item>
        <region-select v-else v-model:province="form.province" v-model:city="form.city" label="地区" prop="region" @change="handleFormRegionChange" />
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="站点电话" prop="stationTel">
          <el-input v-model="form.stationTel" placeholder="请输入站点电话" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="服务电话" prop="serviceTel">
          <el-input v-model="form.serviceTel" placeholder="请输入服务电话" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="计费模版" prop="priceTemplateName">
          <el-input v-model="form.priceTemplateName" placeholder="请输入价格模版" style="width: 240px" disabled />
        </el-form-item>

        <el-form-item label="类型" prop="stationType">
          <el-select v-model="form.stationType" placeholder="请选择类型" style="width: 240px" :disabled="isDetail">
            <el-option v-for="dict in kp_station_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="stationStatus">
          <el-radio-group v-model="form.stationStatus" :disabled="isDetail">
            <el-radio v-for="dict in kp_station_status" :key="dict.value" :value="parseInt(dict.value)">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车位数量" prop="parkNums">
          <el-input v-model="form.parkNums" placeholder="请输入车位数量" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="营业时间" prop="busineHours">
          <el-input v-model="form.busineHours" placeholder="请输入营业时间" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="停车费" prop="parkFee">
          <el-input v-model="form.parkFee" placeholder="请输入停车费" style="width: 240px" :disabled="isDetail" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息" style="width: 240px" :disabled="isDetail" />
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

<script setup name="Station" lang="ts">
import { listStation, getStation, delStation, addStation, updateStation, priceTemplateLike } from '@/api/kpSystem/station';
import { StationVO, StationQuery, StationForm } from '@/api/kpSystem/station/types';
// import { StationVO, StationQuery, StationForm } from '@/api/kpSystem/station/types';
import { listOperator } from '@/api/kpSystem/operator';
import type { OperatorVO } from '@/api/kpSystem/operator/types';
import { ref, onMounted } from 'vue';
import { RegionSelect } from '@/components/RegionSelect';
import { listPriceTemplate } from '@/api/kpSystem/priceTemplate';
import { copyText } from '@/utils/index';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { kp_station_type, kp_station_status } = toRefs<any>(proxy?.useDict('kp_station_type', 'kp_station_status'));

const stationList = ref<StationVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stationFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StationForm = {
  operatorId: undefined,
  stationName: undefined,
  province: undefined,
  city: undefined,
  address: undefined,
  stationTel: undefined,
  serviceTel: undefined,
  stationType: undefined,
  stationStatus: undefined,
  parkNums: undefined,
  busineHours: undefined,
  parkFee: undefined,
  remark: undefined,
  priceId: undefined,
  priceTemplateName: undefined
};
const data = reactive<PageData<StationForm, StationQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    operatorId: undefined,
    stationName: undefined,
    province: undefined,
    city: undefined,
    stationType: undefined,
    stationStatus: undefined,
    params: {}
  },
  rules: {
    operatorId: [{ required: true, message: '归属运营商不能为空', trigger: 'blur' }],
    stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }],
    address: [{ required: true, message: '详细地址不能为空', trigger: 'blur' }],
    stationType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
    stationStatus: [{ required: true, message: '状态不能为空', trigger: 'change' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

const operatorList = ref<OperatorVO[]>([]);

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

/** 查询站点管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStation(queryParams.value);
  stationList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
  isDetail.value = false;
};

/** 表单重置 */
const reset = () => {
  form.value = {
    id: undefined,
    operatorId: undefined,
    stationName: undefined,
    province: undefined,
    city: undefined,
    address: undefined,
    stationTel: undefined,
    serviceTel: undefined,
    stationType: undefined,
    stationStatus: undefined,
    parkNums: undefined,
    busineHours: undefined,
    parkFee: undefined,
    remark: undefined
  };
  stationFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value.province = undefined;
  queryParams.value.city = undefined;
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: StationVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加站点管理';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: StationVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getStation(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改站点管理';
};
/** 详情操作 */
const isDetail = ref(false);
const handleView = async (row?: StationVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getStation(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '站点详情';
  isDetail.value = true;
};
/** 提交按钮 */
const submitForm = () => {
  stationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStation(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addStation(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: StationVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除站点管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delStation(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'kpSystem/station/export',
    {
      ...queryParams.value
    },
    `station_${new Date().getTime()}.xlsx`
  );
};

// 处理搜索地区选择变化
const handleSearchRegionChange = (region: { province: string; city: string }) => {
  queryParams.value.province = region.province;
  queryParams.value.city = region.city;
  handleQuery();
};

// 处理表单地区选择变化
const handleFormRegionChange = (region: { province: string; city: string }) => {
  form.value.province = region.province;
  form.value.city = region.city;
};
const priceTemplateList = ref([]);

const getPriceTemplateList = async () => {
  try {
    const res = await priceTemplateLike();
    if (res.code === 200) {
      priceTemplateList.value = res.rows || [];
    }
  } catch (error) {
    console.error('获取价格模版失败:', error);
  }
};

onMounted(() => {
  getList();
  getOperatorList(); // 获取运营商列表
  getPriceTemplateList();
});
</script>

<style lang="scss" scoped>
.el-select {
  width: 240px;
}
</style>
