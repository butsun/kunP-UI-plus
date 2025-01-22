<template>
  <el-dialog :title="title" v-model="visible" width="800px" append-to-body @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <div class="price-rule-config">
        <div class="section-title">设置分时计费</div>
        
        <!-- 分时电费 -->
        <div class="price-section">
          <div class="sub-title">分时电费</div>
          <div class="price-grid">
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-peak"></div>
                  <span class="label">尖时电费</span>
                </div>
                <el-input
                  v-model="form.peakElecPrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'peakElecPrice')"
                  @blur="handlePriceBlur($event, 'peakElecPrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.peakElecPrice">{{ priceErrors.peakElecPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-high"></div>
                  <span class="label">峰时电费</span>
                </div>
                <el-input
                  v-model="form.highElecPrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'highElecPrice')"
                  @blur="handlePriceBlur($event, 'highElecPrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.highElecPrice">{{ priceErrors.highElecPrice }}</div>
              </div>
            </div>
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-flat"></div>
                  <span class="label">平时电费</span>
                </div>
                <el-input
                  v-model="form.flatElecPrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'flatElecPrice')"
                  @blur="handlePriceBlur($event, 'flatElecPrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.flatElecPrice">{{ priceErrors.flatElecPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-valley"></div>
                  <span class="label">谷时电费</span>
                </div>
                <el-input
                  v-model="form.valleyElecPrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'valleyElecPrice')"
                  @blur="handlePriceBlur($event, 'valleyElecPrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.valleyElecPrice">{{ priceErrors.valleyElecPrice }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分时服务费 -->
        <div class="price-section">
          <div class="sub-title">分时服务费</div>
          <div class="price-grid">
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-peak"></div>
                  <span class="label">尖时服务费</span>
                </div>
                <el-input
                  v-model="form.peakServicePrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'peakServicePrice')"
                  @blur="handlePriceBlur($event, 'peakServicePrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.peakServicePrice">{{ priceErrors.peakServicePrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-high"></div>
                  <span class="label">峰时服务费</span>
                </div>
                <el-input
                  v-model="form.highServicePrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'highServicePrice')"
                  @blur="handlePriceBlur($event, 'highServicePrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.highServicePrice">{{ priceErrors.highServicePrice }}</div>
              </div>
            </div>
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-flat"></div>
                  <span class="label">平时服务费</span>
                </div>
                <el-input
                  v-model="form.flatServicePrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'flatServicePrice')"
                  @blur="handlePriceBlur($event, 'flatServicePrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.flatServicePrice">{{ priceErrors.flatServicePrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-valley"></div>
                  <span class="label">谷时服务费</span>
                </div>
                <el-input
                  v-model="form.valleyServicePrice"
                  placeholder="0.0000"
                  class="price-input"
                  @input="handlePriceInput($event, 'valleyServicePrice')"
                  @blur="handlePriceBlur($event, 'valleyServicePrice')"
                >
                  <template #append>元/kWh</template>
                </el-input>
                <div class="error-message" v-if="priceErrors.valleyServicePrice">{{ priceErrors.valleyServicePrice }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="warning-text">
          <el-alert
            title="请确保充电桩支持【分时服务费】，如果不支持请填写相同的服务费，否则充电桩将以最小金额的服务费金额生效"
            type="warning"
            show-icon
            :closable="false"
          />
        </div>

        <!-- 时段选择 -->
        <div class="time-section">
          <div class="period-buttons">
            <div v-for="period in periods" :key="period.type">
              <el-button
                :class="['period-btn', period.class]"
                @click="handlePeriodClick(period.type)"
              >
                {{ period.label }}
              </el-button>
            </div>
            <el-button @click="resetTimeRules">重置</el-button>
          </div>

          <div class="time-grid">
            <div 
              v-for="time in timeSlots" 
              :key="time"
              class="time-slot"
              :class="[
                { active: form.timeRules[time] },
                form.timeRules[time] ? `bg-${form.timeRules[time]}` : ''
              ]"
              @click="toggleTimeSlot(time)"
            >
              {{ time }}
            </div>
          </div>
        </div>
        
        <!-- 添加备注输入框 -->
        <div class="price-config">
          <div class="price-row">
            <div class="price-item">
              <div class="label">备注</div>
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="2"
                placeholder="请输入备注信息"
              />
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :disabled="hasErrors">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';

interface PriceItemVO {
  startTime: string;
  elecPrice: number;
  servicePrice: number;
  priceType: number;
}

interface PriceTypeItemVO {
  priceType: number;
  elecPrice: number;
  servicePrice: number;
}

interface PriceTemplateDetailVO {
  priceTypeList?: PriceTypeItemVO[];
  priceList?: PriceItemVO[];
  remark?: string;
}

interface PriceTemplateVO {
  priceCode?: string;
  priceList?: PriceItemVO[];
  priceTypeList?: PriceTypeItemVO[];
  remark?: string;
}

interface FormState {
  peakElecPrice: string;
  highElecPrice: string;
  flatElecPrice: string;
  valleyElecPrice: string;
  peakServicePrice: string;
  highServicePrice: string;
  flatServicePrice: string;
  valleyServicePrice: string;
  timeRules: Record<string, string>;
  remark: string;
}

// 表单数据
const initForm = (): FormState => ({
  peakElecPrice: '',
  highElecPrice: '',
  flatElecPrice: '',
  valleyElecPrice: '',
  peakServicePrice: '',
  highServicePrice: '',
  flatServicePrice: '',
  valleyServicePrice: '',
  timeRules: {},
  remark: ''
});

const form = ref<FormState>(initForm());

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: PriceTemplateVO): void;
}>();

const props = defineProps<{
  title?: string;
  modelValue?: boolean;
}>();

// 表单引用
const formRef = ref<FormInstance>();

// 弹窗可见性
const visible = computed({
  get: () => props.modelValue ?? false,
  set: (val) => emit('update:modelValue', val)
});

// 标题
const title = computed(() => props.title ?? '新增新能源计费规则');

// 价格错误信息对象
const priceErrors = reactive<Record<string, boolean>>({});

// 表单校验规则
const rules = {
  peakElecPrice: [{ required: true, message: '请输入尖时段电价' }],
  highElecPrice: [{ required: true, message: '请输入峰时段电价' }],
  flatElecPrice: [{ required: true, message: '请输入平时段电价' }],
  valleyElecPrice: [{ required: true, message: '请输入谷时段电价' }],
  peakServicePrice: [{ required: true, message: '请输入尖时段服务费' }],
  highServicePrice: [{ required: true, message: '请输入峰时段服务费' }],
  flatServicePrice: [{ required: true, message: '请输入平时段服务费' }],
  valleyServicePrice: [{ required: true, message: '请输入谷时段服务费' }]
};

// 时段类型定义
const periods = [
  { type: 'peak', label: '尖时段', class: 'bg-peak' },
  { type: 'high', label: '峰时段', class: 'bg-high' },
  { type: 'flat', label: '平时段', class: 'bg-flat' },
  { type: 'valley', label: '谷时段', class: 'bg-valley' }
];

// 生成时间槽
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    const h = hour.toString().padStart(2, '0');
    const nextHour = hour === 23 ? '00' : (hour + 1).toString().padStart(2, '0');
    slots.push(`${h}:00-${h}:30`);
    slots.push(`${h}:30-${nextHour}:00`);
  }
  return slots;
};

const timeSlots = ref(generateTimeSlots());
const currentPeriod = ref('');

// 添加状态变量
const lastClickedTime = ref<string>('');
const isSelecting = ref(false);

/** 将后端时间格式(HHmmss)转换为时段格式(HH:mm) */
const convertTimeToSlot = (time: string): string => {
  if (!time || time.length !== 6) {
    console.warn('无效的时间格式:', time);
    return '';
  }
  
  const hour = time.substring(0, 2);
  const minute = time.substring(2, 4);
  
  // 验证小时和分钟的有效性
  const hourNum = parseInt(hour);
  const minuteNum = parseInt(minute);
  
  if (isNaN(hourNum) || hourNum < 0 || hourNum > 23 || 
      isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
    console.warn('时间值超出范围:', { hour: hourNum, minute: minuteNum });
    return '';
  }

  // 计算结束时间
  let endHour: number;
  let endMinute: string;
  
  if (minute === "30") {
    // 如果当前是30分，则下一个时段是下一个小时的00分
    endHour = hourNum === 23 ? 0 : hourNum + 1;
    endMinute = "00";
  } else {
    // 如果当前是00分，则下一个时段是当前小时的30分
    endHour = hourNum;
    endMinute = "30";
  }

  // 构建时段字符串 (例如: "08:00-08:30" 或 "23:30-00:00")
  return `${hour}:${minute}-${endHour.toString().padStart(2, '0')}:${endMinute}`;
};

/** 根据价格类型值获取对应的类型名称 */
const getPriceTypeByValue = (value: number): string => {
  console.log('获取价格类型值:', value); // 添加日志
  switch (value) {
    case 0: return 'peak';   // 尖时段
    case 1: return 'high';   // 峰时段
    case 2: return 'flat';   // 平时段
    case 3: return 'valley'; // 谷时段
    default: 
      console.warn(`未知的价格类型: ${value}，使用默认值 'flat'`); // 添加警告日志
      return 'flat';  // 默认平时段
  }
};

/** 切换时段的价格类型 */
const toggleTimeSlot = (time: string) => {
  if (!currentPeriod.value) {
    console.warn('未选择时段类型');
    return;
  }

  // 第一次点击
  if (!isSelecting.value) {
    isSelecting.value = true;
    lastClickedTime.value = time;
    form.value.timeRules[time] = currentPeriod.value;
    return;
  }

  // 第二次点击，连接时段
  const timeSlotIndex = timeSlots.value.findIndex(slot => slot === time);
  const lastClickedIndex = timeSlots.value.findIndex(slot => slot === lastClickedTime.value);
  
  if (timeSlotIndex === -1 || lastClickedIndex === -1) return;

  // 确定开始和结束索引
  const startIndex = Math.min(timeSlotIndex, lastClickedIndex);
  const endIndex = Math.max(timeSlotIndex, lastClickedIndex);

  // 设置所有中间时段
  for (let i = startIndex; i <= endIndex; i++) {
    const slot = timeSlots.value[i];
    // 如果该时段还没有被设置过其他类型，则设置为当前类型
    if (!form.value.timeRules[slot] || form.value.timeRules[slot] === currentPeriod.value) {
      form.value.timeRules[slot] = currentPeriod.value;
    }
  }

  // 更新最后点击的时段
  lastClickedTime.value = time;
};

/** 处理时段按钮点击 */
const handlePeriodClick = (type: string) => {
  // 如果点击的是当前选中的类型，则取消选择
  if (currentPeriod.value === type) {
    currentPeriod.value = '';
    isSelecting.value = false;
    lastClickedTime.value = '';
  } else {
    currentPeriod.value = type;
    isSelecting.value = false;
    lastClickedTime.value = '';
  }
};

/** 重置时段规则 */
const resetTimeRules = () => {
  form.value.timeRules = {};
  currentPeriod.value = '';
  isSelecting.value = false;
  lastClickedTime.value = '';
};

/** 设置表单数据 */
const setFormData = (data?: Partial<FormState>) => {
  // 重置表单为初始状态
  form.value = initForm();
  
  if (!data) return;
  
  // 如果有数据，则设置相应字段
  if (data.timeRules) {
    form.value.timeRules = { ...data.timeRules };
  }
  
  if (data.remark) {
    form.value.remark = data.remark;
  }
  
  // 设置价格数据（如果存在）
  const priceFields = [
    'peakElecPrice', 'highElecPrice', 'flatElecPrice', 'valleyElecPrice',
    'peakServicePrice', 'highServicePrice', 'flatServicePrice', 'valleyServicePrice'
  ];
  
  priceFields.forEach(field => {
    const value = data[field as keyof FormState];
    if (value !== undefined && value !== null) {
      form.value[field as keyof FormState] = value;
    }
  });
};

/** 重置表单 */
const resetForm = () => {
  form.value = initForm();
  currentPeriod.value = '';
  isSelecting.value = false;
  lastClickedTime.value = '';
};

/** 提交表单 */
const handleSubmit = async () => {
  try {

    // 3. 构建提交数据
    const priceList: PriceItemVO[] = [];
    const priceTypeList: PriceTypeItemVO[] = [];

    // 构建priceTypeList
    const typeConfigs = [
      { type: 0, elecKey: 'peakElecPrice', serviceKey: 'peakServicePrice' },
      { type: 1, elecKey: 'highElecPrice', serviceKey: 'highServicePrice' },
      { type: 2, elecKey: 'flatElecPrice', serviceKey: 'flatServicePrice' },
      { type: 3, elecKey: 'valleyElecPrice', serviceKey: 'valleyServicePrice' }
    ];

    typeConfigs.forEach(config => {
      priceTypeList.push({
        priceType: config.type,
        elecPrice: Number(form.value[config.elecKey as keyof FormState]),
        servicePrice: Number(form.value[config.serviceKey as keyof FormState])
      });
    });

    // 构建priceList
    for (const [timeSlot, type] of Object.entries(form.value.timeRules)) {
      const priceType = ['peak', 'high', 'flat', 'valley'].indexOf(type);
      if (priceType === -1) continue;

      // 从时段字符串中提取前半段时间
      const startTimeStr = timeSlot.split('-')[0];  
      const [hour, minute] = startTimeStr.split(':');  
      const startTime = `${hour}${minute}00`;  

      priceList.push({
        startTime: startTime,
        elecPrice: Number(form.value[`${type}ElecPrice` as keyof FormState]),
        servicePrice: Number(form.value[`${type}ServicePrice` as keyof FormState]),
        priceType
      });
    }
    
    emit('submit', {
      priceList,
      priceTypeList,
      remark: form.value.remark
    });
    
    visible.value = false;
  } catch (error) {
    console.error('Form validation failed:', error);
    ElMessage.error('表单验证失败，请检查输入');
  }
};

/** 处理价格输入 */
const handlePriceInput = (value: string, field: keyof FormState) => {
  if (typeof form.value[field] === 'string') {
    form.value[field] = value;
  }
};

/** 处理价格失焦 */
const handlePriceBlur = (value: string, field: keyof FormState) => {
  if (!value) return;
  
  // 验证价格格式
  if (!validatePrice(value)) {
    ElMessage.warning(`请输入正确的价格格式，最多4位小数`);
    return;
  }

  // 格式化为4位小数
  if (typeof form.value[field] === 'string') {
    form.value[field] = Number(value).toFixed(4);
  }
};

/** 验证价格格式 */
const validatePrice = (value: string): boolean => {
  return /^\d+\.?\d{0,4}$/.test(value);
};

/** 取消 */
const handleClose = () => {
  visible.value = false;
  emit('update:modelValue', false);
};

/** 是否有错误 */
const hasErrors = computed(() => Object.keys(priceErrors).length > 0);
</script>

<style lang="scss" scoped>
.price-rule-config {
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.price-section {
  margin-bottom: 30px;
}

.sub-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
}

.price-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.price-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.color-block {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

/* 修改时段颜色 */
.bg-peak {
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}

.bg-high {
  background-color: #E6A23C !important;
  border-color: #E6A23C !important;
}

.bg-flat {
  background-color: #67C23A !important;
  border-color: #67C23A !important;
}

.bg-valley {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.time-slot.active.bg-peak { background-color: #F56C6C !important; }
.time-slot.active.bg-high { background-color: #E6A23C !important; }
.time-slot.active.bg-flat { background-color: #67C23A !important; }
.time-slot.active.bg-valley { background-color: #409EFF !important; }

.price-input {
  width: 160px;
}

.time-section {
  margin-top: 20px;
}

.period-buttons {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.period-btn {
  width: 60px;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
}

.time-slot {
  padding: 8px;
  text-align: center;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;

  &.active {
    color: #fff;
    border-color: transparent;
  }

  &:hover {
    opacity: 0.9;
  }
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1;
}

.price-config {
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.price-item {
  flex: 1;
}

.label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
}

.price-item :deep(.el-textarea__inner) {
  width: 100%;
}
</style>
