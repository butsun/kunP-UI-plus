<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="充电站id(运营商自定义的唯一编码)" prop="stationId">
              <el-input v-model="queryParams.stationId" placeholder="请输入充电站id(运营商自定义的唯一编码)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="运营商id(组织机构代码)" prop="operatorId">
              <el-input v-model="queryParams.operatorId" placeholder="请输入运营商id(组织机构代码)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户平台运营商id(组织机构代码)" prop="userOperatorId">
              <el-input v-model="queryParams.userOperatorId" placeholder="请输入用户平台运营商id(组织机构代码)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="基础运营商id(组织机构代码)" prop="baseOperatorId">
              <el-input v-model="queryParams.baseOperatorId" placeholder="请输入基础运营商id(组织机构代码)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备所属商id(组织机构代码)" prop="equipmentOwnerId">
              <el-input v-model="queryParams.equipmentOwnerId" placeholder="请输入设备所属商id(组织机构代码)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电站名称" prop="stationName">
              <el-input v-model="queryParams.stationName" placeholder="请输入充电站名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电站省市辖区编码" prop="areaCode">
              <el-input v-model="queryParams.areaCode" placeholder="请输入充电站省市辖区编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="queryParams.address" placeholder="请输入详细地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点电话(能够联系场站工作人员进行协助的联系电话)" prop="stationTel">
              <el-input v-model="queryParams.stationTel" placeholder="请输入站点电话(能够联系场站工作人员进行协助的联系电话)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="服务电话(平台服务电话，例如400的电话)" prop="serviceTel">
              <el-input v-model="queryParams.serviceTel" placeholder="请输入服务电话(平台服务电话，例如400的电话)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="车位数量(可停放进行充电的车位总数，默认：0 未知)" prop="parkNums">
              <el-input v-model="queryParams.parkNums" placeholder="请输入车位数量(可停放进行充电的车位总数，默认：0 未知)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点经度(GCJ-02坐标系,保留小数点后6位)" prop="stationLng">
              <el-input v-model="queryParams.stationLng" placeholder="请输入站点经度(GCJ-02坐标系,保留小数点后6位)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点纬度(GCJ-02坐标系,保留小数点后6位)" prop="stationLat">
              <el-input v-model="queryParams.stationLat" placeholder="请输入站点纬度(GCJ-02坐标系,保留小数点后6位)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他" prop="construction">
              <el-input v-model="queryParams.construction" placeholder="请输入建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串" prop="pictures">
              <el-input v-model="queryParams.pictures" placeholder="请输入站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="营业时间描述" prop="busineHours">
              <el-input v-model="queryParams.busineHours" placeholder="请输入营业时间描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="充电电费描述" prop="electricityFee">
              <el-input v-model="queryParams.electricityFee" placeholder="请输入充电电费描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="服务费描述" prop="serviceFee">
              <el-input v-model="queryParams.serviceFee" placeholder="请输入服务费描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="停车费描述" prop="parkFee">
              <el-input v-model="queryParams.parkFee" placeholder="请输入停车费描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上" prop="payment">
              <el-input v-model="queryParams.payment" placeholder="请输入支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)" prop="supportOrder">
              <el-input v-model="queryParams.supportOrder" placeholder="请输入是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['kp-system:station:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['kp-system:station:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['kp-system:station:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['kp-system:station:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="stationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="自增id" align="center" prop="id" v-if="true" />
        <el-table-column label="充电站id(运营商自定义的唯一编码)" align="center" prop="stationId" />
        <el-table-column label="运营商id(组织机构代码)" align="center" prop="operatorId" />
        <el-table-column label="用户平台运营商id(组织机构代码)" align="center" prop="userOperatorId" />
        <el-table-column label="基础运营商id(组织机构代码)" align="center" prop="baseOperatorId" />
        <el-table-column label="设备所属商id(组织机构代码)" align="center" prop="equipmentOwnerId" />
        <el-table-column label="充电站名称" align="center" prop="stationName" />
        <el-table-column label="充电站省市辖区编码" align="center" prop="areaCode" />
        <el-table-column label="详细地址" align="center" prop="address" />
        <el-table-column label="站点电话(能够联系场站工作人员进行协助的联系电话)" align="center" prop="stationTel" />
        <el-table-column label="服务电话(平台服务电话，例如400的电话)" align="center" prop="serviceTel" />
        <el-table-column label="站点类型:1、公共;50、个人;100、公交(专用);101、环卫(专用);102、物流(专用);103、出租车(专用);255、其他" align="center" prop="stationType" />
        <el-table-column label="站点状态:0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用" align="center" prop="stationStatus" />
        <el-table-column label="车位数量(可停放进行充电的车位总数，默认：0 未知)" align="center" prop="parkNums" />
        <el-table-column label="站点经度(GCJ-02坐标系,保留小数点后6位)" align="center" prop="stationLng" />
        <el-table-column label="站点纬度(GCJ-02坐标系,保留小数点后6位)" align="center" prop="stationLat" />
        <el-table-column label="建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他" align="center" prop="construction" />
        <el-table-column label="站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串" align="center" prop="pictures" />
        <el-table-column label="营业时间描述" align="center" prop="busineHours" />
        <el-table-column label="充电电费描述" align="center" prop="electricityFee" />
        <el-table-column label="服务费描述" align="center" prop="serviceFee" />
        <el-table-column label="停车费描述" align="center" prop="parkFee" />
        <el-table-column label="支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上" align="center" prop="payment" />
        <el-table-column label="是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)" align="center" prop="supportOrder" />
        <el-table-column label="备注信息" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['kp-system:station:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['kp-system:station:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改充电站管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stationFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="充电站id(运营商自定义的唯一编码)" prop="stationId">
          <el-input v-model="form.stationId" placeholder="请输入充电站id(运营商自定义的唯一编码)" />
        </el-form-item>
        <el-form-item label="运营商id(组织机构代码)" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入运营商id(组织机构代码)" />
        </el-form-item>
        <el-form-item label="用户平台运营商id(组织机构代码)" prop="userOperatorId">
          <el-input v-model="form.userOperatorId" placeholder="请输入用户平台运营商id(组织机构代码)" />
        </el-form-item>
        <el-form-item label="基础运营商id(组织机构代码)" prop="baseOperatorId">
          <el-input v-model="form.baseOperatorId" placeholder="请输入基础运营商id(组织机构代码)" />
        </el-form-item>
        <el-form-item label="设备所属商id(组织机构代码)" prop="equipmentOwnerId">
          <el-input v-model="form.equipmentOwnerId" placeholder="请输入设备所属商id(组织机构代码)" />
        </el-form-item>
        <el-form-item label="充电站名称" prop="stationName">
          <el-input v-model="form.stationName" placeholder="请输入充电站名称" />
        </el-form-item>
        <el-form-item label="充电站省市辖区编码" prop="areaCode">
          <el-input v-model="form.areaCode" placeholder="请输入充电站省市辖区编码" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="站点电话(能够联系场站工作人员进行协助的联系电话)" prop="stationTel">
          <el-input v-model="form.stationTel" placeholder="请输入站点电话(能够联系场站工作人员进行协助的联系电话)" />
        </el-form-item>
        <el-form-item label="服务电话(平台服务电话，例如400的电话)" prop="serviceTel">
          <el-input v-model="form.serviceTel" placeholder="请输入服务电话(平台服务电话，例如400的电话)" />
        </el-form-item>
        <el-form-item label="车位数量(可停放进行充电的车位总数，默认：0 未知)" prop="parkNums">
          <el-input v-model="form.parkNums" placeholder="请输入车位数量(可停放进行充电的车位总数，默认：0 未知)" />
        </el-form-item>
        <el-form-item label="站点经度(GCJ-02坐标系,保留小数点后6位)" prop="stationLng">
          <el-input v-model="form.stationLng" placeholder="请输入站点经度(GCJ-02坐标系,保留小数点后6位)" />
        </el-form-item>
        <el-form-item label="站点纬度(GCJ-02坐标系,保留小数点后6位)" prop="stationLat">
          <el-input v-model="form.stationLat" placeholder="请输入站点纬度(GCJ-02坐标系,保留小数点后6位)" />
        </el-form-item>
        <el-form-item label="建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他" prop="construction">
          <el-input v-model="form.construction" placeholder="请输入建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他" />
        </el-form-item>
        <el-form-item label="站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串" prop="pictures">
            <el-input v-model="form.pictures" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="营业时间描述" prop="busineHours">
          <el-input v-model="form.busineHours" placeholder="请输入营业时间描述" />
        </el-form-item>
        <el-form-item label="充电电费描述" prop="electricityFee">
          <el-input v-model="form.electricityFee" placeholder="请输入充电电费描述" />
        </el-form-item>
        <el-form-item label="服务费描述" prop="serviceFee">
          <el-input v-model="form.serviceFee" placeholder="请输入服务费描述" />
        </el-form-item>
        <el-form-item label="停车费描述" prop="parkFee">
          <el-input v-model="form.parkFee" placeholder="请输入停车费描述" />
        </el-form-item>
        <el-form-item label="支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上" prop="payment">
          <el-input v-model="form.payment" placeholder="请输入支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上" />
        </el-form-item>
        <el-form-item label="是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)" prop="supportOrder">
          <el-input v-model="form.supportOrder" placeholder="请输入是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)" />
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息" />
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
import { listStation, getStation, delStation, addStation, updateStation } from '@/api/kp-system/station';
import { StationVO, StationQuery, StationForm } from '@/api/kp-system/station/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

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
  id: undefined,
  stationId: undefined,
  operatorId: undefined,
  userOperatorId: undefined,
  baseOperatorId: undefined,
  equipmentOwnerId: undefined,
  stationName: undefined,
  areaCode: undefined,
  address: undefined,
  stationTel: undefined,
  serviceTel: undefined,
  stationType: undefined,
  stationStatus: undefined,
  parkNums: undefined,
  stationLng: undefined,
  stationLat: undefined,
  construction: undefined,
  pictures: undefined,
  busineHours: undefined,
  electricityFee: undefined,
  serviceFee: undefined,
  parkFee: undefined,
  payment: undefined,
  supportOrder: undefined,
  remark: undefined,
}
const data = reactive<PageData<StationForm, StationQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stationId: undefined,
    operatorId: undefined,
    userOperatorId: undefined,
    baseOperatorId: undefined,
    equipmentOwnerId: undefined,
    stationName: undefined,
    areaCode: undefined,
    address: undefined,
    stationTel: undefined,
    serviceTel: undefined,
    stationType: undefined,
    stationStatus: undefined,
    parkNums: undefined,
    stationLng: undefined,
    stationLat: undefined,
    construction: undefined,
    pictures: undefined,
    busineHours: undefined,
    electricityFee: undefined,
    serviceFee: undefined,
    parkFee: undefined,
    payment: undefined,
    supportOrder: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "自增id不能为空", trigger: "blur" }
    ],
    stationId: [
      { required: true, message: "充电站id(运营商自定义的唯一编码)不能为空", trigger: "blur" }
    ],
    operatorId: [
      { required: true, message: "运营商id(组织机构代码)不能为空", trigger: "blur" }
    ],
    userOperatorId: [
      { required: true, message: "用户平台运营商id(组织机构代码)不能为空", trigger: "blur" }
    ],
    baseOperatorId: [
      { required: true, message: "基础运营商id(组织机构代码)不能为空", trigger: "blur" }
    ],
    equipmentOwnerId: [
      { required: true, message: "设备所属商id(组织机构代码)不能为空", trigger: "blur" }
    ],
    stationName: [
      { required: true, message: "充电站名称不能为空", trigger: "blur" }
    ],
    areaCode: [
      { required: true, message: "充电站省市辖区编码不能为空", trigger: "blur" }
    ],
    address: [
      { required: true, message: "详细地址不能为空", trigger: "blur" }
    ],
    stationTel: [
      { required: true, message: "站点电话(能够联系场站工作人员进行协助的联系电话)不能为空", trigger: "blur" }
    ],
    serviceTel: [
      { required: true, message: "服务电话(平台服务电话，例如400的电话)不能为空", trigger: "blur" }
    ],
    stationType: [
      { required: true, message: "站点类型:1、公共;50、个人;100、公交(专用);101、环卫(专用);102、物流(专用);103、出租车(专用);255、其他不能为空", trigger: "change" }
    ],
    stationStatus: [
      { required: true, message: "站点状态:0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用不能为空", trigger: "change" }
    ],
    parkNums: [
      { required: true, message: "车位数量(可停放进行充电的车位总数，默认：0 未知)不能为空", trigger: "blur" }
    ],
    stationLng: [
      { required: true, message: "站点经度(GCJ-02坐标系,保留小数点后6位)不能为空", trigger: "blur" }
    ],
    stationLat: [
      { required: true, message: "站点纬度(GCJ-02坐标系,保留小数点后6位)不能为空", trigger: "blur" }
    ],
    construction: [
      { required: true, message: "建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他不能为空", trigger: "blur" }
    ],
    pictures: [
      { required: true, message: "站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串不能为空", trigger: "blur" }
    ],
    busineHours: [
      { required: true, message: "营业时间描述不能为空", trigger: "blur" }
    ],
    electricityFee: [
      { required: true, message: "充电电费描述不能为空", trigger: "blur" }
    ],
    serviceFee: [
      { required: true, message: "服务费描述不能为空", trigger: "blur" }
    ],
    parkFee: [
      { required: true, message: "停车费描述不能为空", trigger: "blur" }
    ],
    payment: [
      { required: true, message: "支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上不能为空", trigger: "blur" }
    ],
    supportOrder: [
      { required: true, message: "是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注信息不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询充电站管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStation(queryParams.value);
  stationList.value = res.rows;
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
  stationFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StationVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加充电站管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StationVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getStation(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改充电站管理";
}

/** 提交按钮 */
const submitForm = () => {
  stationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateStation(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStation(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StationVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除充电站管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delStation(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('kp-system/station/export', {
    ...queryParams.value
  }, `station_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
