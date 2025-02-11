<template>
  <el-dialog v-model="visible" :title="title" width="800px" append-to-body @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="2px">
      <div class="price-rule-config">
        <div class="section-title">设置分时计费</div>
        <!-- 分时电费 -->
        <div class="price-section">
          <div class="sub-title">模版名称</div>
          <div class="price-grid">
            <div class="price-row">
              <div class="price-item">
                <el-form-item label=" " prop="priceName">
                  <el-input v-model="form.priceName" placeholder="请输入模版名称" style="width: 520px" />
                </el-form-item>
                <!-- <el-input v-model="form.priceName" placeholder="请输入模版名称" style="width: 520px" /> -->
                <div v-if="priceErrors.priceName" class="error-message">{{ priceErrors.priceName }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 选择分配的站点 -->
        <div class="price-section">
          <div class="sub-title">分配站点</div>
          <div class="price-grid">
            <div class="price-row">
              <div class="price-item">
                <el-form-item label=" " prop="stationId">
                  <el-select v-model="form.stationId" placeholder="请选择分配的站点" style="width: 520px" multiple>
                    <el-option v-for="item in stationOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
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
                <el-form-item label=" " prop="topElecPrice">
                  <el-input
                    v-model="form.topElecPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'topElecPrice')"
                    @blur="handlePriceBlur($event, 'topElecPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.peakElecPrice" class="error-message">{{ priceErrors.peakElecPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-peak"></div>
                  <span class="label">峰时电费</span>
                </div>
                <el-form-item label=" " prop="peakElecPrice">
                  <el-input
                    v-model="form.peakElecPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'peakElecPrice')"
                    @blur="handlePriceBlur($event, 'peakElecPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.peakElecPrice" class="error-message">{{ priceErrors.peakElecPrice }}</div>
              </div>
            </div>
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-flat"></div>
                  <span class="label">平时电费</span>
                </div>
                <el-form-item label=" " prop="flatElecPrice">
                  <el-input
                    v-model="form.flatElecPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'flatElecPrice')"
                    @blur="handlePriceBlur($event, 'flatElecPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.flatElecPrice" class="error-message">{{ priceErrors.flatElecPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-valley"></div>
                  <span class="label">谷时电费</span>
                </div>
                <el-form-item label=" " prop="valleyElecPrice">
                  <el-input
                    v-model="form.valleyElecPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'valleyElecPrice')"
                    @blur="handlePriceBlur($event, 'valleyElecPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.valleyElecPrice" class="error-message">{{ priceErrors.valleyElecPrice }}</div>
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
                <el-form-item label=" " prop="topServPrice">
                  <el-input
                    v-model="form.topServPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'topServPrice')"
                    @blur="handlePriceBlur($event, 'topServPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.topServPrice" class="error-message">{{ priceErrors.topServPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-peak"></div>
                  <span class="label">峰时服务费</span>
                </div>
                <el-form-item label=" " prop="peakServPrice">
                  <el-input
                    v-model="form.peakServPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'peakServPrice')"
                    @blur="handlePriceBlur($event, 'peakServPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.peakServPrice" class="error-message">{{ priceErrors.peakServPrice }}</div>
              </div>
            </div>
            <div class="price-row">
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-flat"></div>
                  <span class="label">平时服务费</span>
                </div>
                <el-form-item label=" " prop="flatServPrice">
                  <el-input
                    v-model="form.flatServPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'flatServPrice')"
                    @blur="handlePriceBlur($event, 'flatServPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.flatServPrice" class="error-message">{{ priceErrors.flatServPrice }}</div>
              </div>
              <div class="price-item">
                <div class="price-label">
                  <div class="color-block bg-valley"></div>
                  <span class="label">谷时服务费</span>
                </div>
                <el-form-item label=" " prop="valleyServPrice">
                  <el-input
                    v-model="form.valleyServPrice"
                    placeholder="0.0000"
                    class="price-input"
                    @input="handlePriceInput($event, 'valleyServPrice')"
                    @blur="handlePriceBlur($event, 'valleyServPrice')"
                  >
                    <template #append>元/kWh</template>
                  </el-input>
                </el-form-item>
                <div v-if="priceErrors.valleyServPrice" class="error-message">{{ priceErrors.valleyServPrice }}</div>
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
            <div v-for="(period, index) in periods" :key="period.type">
              <el-button
                :class="['period-btn', period.class, , period.isChecked ? period.classActive : '']"
                @click="handlePeriodClick(period, index)"
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
              :class="[{ active: form.timeRules[time] }, form.timeRules[time] ? `bg-${form.timeRules[time]}` : '']"
              @click="toggleTimeSlot(time)"
            >
              {{ time }}
            </div>
            <div v-if="!allSelected" class="error-message">所有时间段都要设置</div>
          </div>
        </div>

        <!-- 添加备注输入框 -->
        <div class="price-config">
          <div class="price-row">
            <div class="price-item">
              <div class="label">备注</div>
              <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注信息" />
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :disabled="hasErrors" @click="handleSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { stationLike } from '@/api/common';

interface PriceItemVO {
  startTime: string;
  elecPrice: number;
  servPrice: number;
  priceType: number;
}

interface PriceTypeItemVO {
  priceType: number;
  elecPrice: number;
  servPrice: number;
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
  priceName: string;
  topElecPrice: string;
  peakElecPrice: string;
  stationId: string;
  flatElecPrice: string;
  valleyElecPrice: string;
  topServPrice: string;
  peakServPrice: string;
  flatServPrice: string;
  valleyServPrice: string;
  timeRules: Record<string, string>;
  remark: string;
}

// 表单数据
const initForm = (): FormState => ({
  topElecPrice: '',
  peakElecPrice: '',
  flatElecPrice: '',
  valleyElecPrice: '',
  topServPrice: '',
  peakServPrice: '',
  flatServPrice: '',
  valleyServPrice: '',
  timeRules: {},
  remark: '',
  priceName: '',
  stationId: ''
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
const rules = ref({
  priceName: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
  topElecPrice: [{ required: true, message: '请输入尖时段电价' }],
  peakElecPrice: [{ required: true, message: '请输入峰时段电价' }],
  flatElecPrice: [{ required: true, message: '请输入平时段电价' }],
  valleyElecPrice: [{ required: true, message: '请输入谷时段电价' }],
  topservPrice: [{ required: true, message: '请输入尖时段服务费' }],
  peakServPrice: [{ required: true, message: '请输入峰时段服务费' }],
  flatServPrice: [{ required: true, message: '请输入平时段服务费' }],
  valleyServPrice: [{ required: true, message: '请输入谷时段服务费' }]
});

// 时段类型定义
const periods = ref([
  { type: 'top', label: '尖时段', class: 'bg-top1', classActive: 'bg-top1-active', isChecked: false },
  { type: 'peak', label: '峰时段', class: 'bg-peak1', classActive: 'bg-peak1-active', isChecked: false },
  { type: 'flat', label: '平时段', class: 'bg-flat1', classActive: 'bg-flat1-active', isChecked: false },
  { type: 'valley', label: '谷时段', class: 'bg-valley1', classActive: 'bg-valley1-active', isChecked: false }
]);

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

  if (isNaN(hourNum) || hourNum < 0 || hourNum > 23 || isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
    console.warn('时间值超出范围:', { hour: hourNum, minute: minuteNum });
    return '';
  }

  // 计算结束时间
  let endHour: number;
  let endMinute: string;

  if (minute === '30') {
    // 如果当前是30分，则下一个时段是下一个小时的00分
    endHour = hourNum === 23 ? 0 : hourNum + 1;
    endMinute = '00';
  } else {
    // 如果当前是00分，则下一个时段是当前小时的30分
    endHour = hourNum;
    endMinute = '30';
  }

  // 构建时段字符串 (例如: "08:00-08:30" 或 "23:30-00:00")
  return `${hour}:${minute}-${endHour.toString().padStart(2, '0')}:${endMinute}`;
};

/** 根据价格类型值获取对应的类型名称 */
const getPriceTypeByValue = (value: number): string => {
  console.log('获取价格类型值:', value); // 添加日志
  switch (value) {
    case 0:
      return 'top'; // 尖时段
    case 1:
      return 'peak'; // 峰时段
    case 2:
      return 'flat'; // 平时段
    case 3:
      return 'valley'; // 谷时段
    default:
      console.warn(`未知的价格类型: ${value}，使用默认值 'flat'`); // 添加警告日志
      return 'flat'; // 默认平时段
  }
};

/** 切换时段的价格类型 */
const toggleTimeSlot = (time: string) => {
  console.log('time>>>>>>', time);

  if (!currentPeriod.value) {
    console.warn('未选择时段类型');
    return;
  }

  console.log(currentPeriod.value);

  const timeSlotIndex = timeSlots.value.findIndex((slot) => slot === time);
  const lastClickedIndex = timeSlots.value.findIndex((slot) => slot === lastClickedTime.value);

  if (timeSlotIndex === -1) return;

  // **第一次点击**：单个选中/取消
  if (!isSelecting.value) {
    isSelecting.value = true;
    lastClickedTime.value = time;

    // 若当前时段已有值，则取消选中，否则赋值
    if (form.value.timeRules[time] === currentPeriod.value) {
      delete form.value.timeRules[time];
    } else {
      form.value.timeRules[time] = currentPeriod.value;
    }

    return;
  }

  // **第二次点击**：批量操作
  if (lastClickedIndex === -1) return;

  const startIndex = Math.min(timeSlotIndex, lastClickedIndex);
  const endIndex = Math.max(timeSlotIndex, lastClickedIndex);

  // 判断选中的范围内，是否所有的时段都已经被当前类型填充
  const allSameType = timeSlots.value.slice(startIndex, endIndex + 1).every((slot) => form.value.timeRules[slot] === currentPeriod.value);

  for (let i = startIndex; i <= endIndex; i++) {
    const slot = timeSlots.value[i];

    if (allSameType) {
      // 如果所有选中的都是当前类型，则批量取消
      delete form.value.timeRules[slot];
    } else {
      // 否则，填充当前类型
      form.value.timeRules[slot] = currentPeriod.value;
    }
  }

  lastClickedTime.value = time;
  checkAndResetPeriods();
};
/** 检查 timeRules 是否还包含 periods 的类型，如果没有，则重置 periods */
const checkAndResetPeriods = () => {
  const usedTypes = new Set(Object.values(form.value.timeRules)); // 获取当前所有已选时段的类型

  const hasActivePeriod = periods.value.some((period) => usedTypes.has(period.type));

  if (!hasActivePeriod) {
    // 如果没有匹配的类型，则重置 periods
    periods.value.forEach((p) => (p.isChecked = false));
    currentPeriod.value = '';
  }
};
/** 处理时段按钮点击 */
const handlePeriodClick = (data, index) => {
  const { type } = data;
  periods.value[index].isChecked = !periods.value[index].isChecked;
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
// 创建一个映射关系
const flagMapping = {
  0: 'top',
  1: 'peak',
  2: 'flat',
  3: 'valley'
};
/** 设置表单数据 */
const setFormData = (data?: any) => {
  console.log('data>>>>>>>', data);
  // 重置表单为初始状态
  form.value = initForm();
  if (!data) return;
  const _periods = JSON.parse(data.periods);
  // 转换数据为目标格式
  const result = _periods.reduce((acc, { start, end, flag }) => {
    periods.value.forEach((period, index) => {
      console.log(period.type === flagMapping[flag]);
      if (period.type === flagMapping[flag]) {
        period.isChecked = true;
      }
    });
    console.log(periods);
    const timeRange = `${start}-${end}`;
    acc[timeRange] = flagMapping[flag] || 'unknown'; // 默认值为 "unknown"
    return acc;
  }, {});
  // 查找 periods 中 isChecked 为 true 的项
  console.log();
  // 如果有数据，则设置相应字段
  if (periods.value) {
    form.value.timeRules = { ...result };
  }
  if (data.priceName) {
    form.value.priceName = data.priceName;
  }
  if (data.remark) {
    form.value.remark = data.remark;
  }
  if (data.stationIds) {
    form.value.stationId = data.stationIds;
  }
  // 设置价格数据（如果存在）
  const priceFields = [
    'topElecPrice',
    'peakElecPrice',
    'flatElecPrice',
    'valleyElecPrice',
    'topServPrice',
    'peakServPrice',
    'flatServPrice',
    'valleyServPrice'
  ];

  priceFields.forEach((field) => {
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
const allSelected = computed(() => {
  return timeSlots.value.every((time) => form.value.timeRules[time]);
});
/** 提交表单 */
const handleSubmit = async () => {
  // 计算属性：判断是否所有时段都被选择

  console.log('allSelected', allSelected.value);
  formRef.value?.validate(async (valid: boolean) => {
    console.log('valid', valid);
    if (valid) {
      try {
        // 3. 构建提交数据
        const priceList: PriceTypeItemVO[] = [];
        const priceTypeList: any = {};

        // 构建priceTypeList
        const typeConfigs = [
          { type: 0, elecKey: 'topElecPrice', serviceKey: 'topservPrice' },
          { type: 1, elecKey: 'peakElecPrice', serviceKey: 'peakservPrice' },
          { type: 2, elecKey: 'flatElecPrice', serviceKey: 'flatServPrice' },
          { type: 3, elecKey: 'valleyElecPrice', serviceKey: 'valleyServPrice' }
        ];

        // typeConfigs.forEach((config) => {
        //   priceTypeList.push({
        //     priceType: config.type,
        //     elecPrice: Number(form.value[config.elecKey as keyof FormState]),
        //     servPrice: Number(form.value[config.serviceKey as keyof FormState])
        //   });
        // });
        priceTypeList.priceName = form.value['priceName'];
        priceTypeList.topElecPrice = Number(form.value['topElecPrice']);
        priceTypeList.peakElecPrice = Number(form.value['peakElecPrice']);
        priceTypeList.flatElecPrice = Number(form.value['flatElecPrice']);
        priceTypeList.valleyElecPrice = Number(form.value['valleyElecPrice']);
        priceTypeList.topServPrice = Number(form.value['topServPrice']);
        priceTypeList.peakServPrice = Number(form.value['peakServPrice']);
        priceTypeList.flatServPrice = Number(form.value['flatServPrice']);
        priceTypeList.valleyServPrice = Number(form.value['valleyServPrice']);
        console.log('priceTypeList>>>', priceTypeList);
        // 构建priceList
        console.log('form.value.timeRules', form.value.timeRules);
        for (const [timeSlot, type] of Object.entries(form.value.timeRules)) {
          const priceType = ['top', 'peak', 'flat', 'valley'].indexOf(type);
          if (priceType === -1) continue;

          // 从时段字符串中提取前半段时间
          const startTimeStr = timeSlot.split('-')[0];
          const [hour, minute] = startTimeStr.split(':');
          const startTime = `${hour}${minute}00`;
          console.log('start>>>', timeSlot.split('-')[0]);
          console.log('end>>>', timeSlot.split('-')[1]);
          const _startTime = timeSlot.split('-')[0];
          const _endTime = timeSlot.split('-')[1];
          priceList.push({
            start: _startTime,
            end: _endTime,
            flag: priceType
          });
        }
        if (allSelected.value) {
          emit('submit', {
            priceList,
            ...priceTypeList,
            remark: form.value.remark
          });
        }

        visible.value = false;
      } catch (error) {
        console.error('Form validation failed:', error);
        ElMessage.error('表单验证失败，请检查输入');
      }
    }
  });
};

/** 处理价格输入 */
const handlePriceInput = (value: string, field: keyof FormState) => {
  if (typeof form.value[field] === 'string') {
    form.value[field] = value;
  }
};
/** 格式化价格，确保最多四位小数，不足补0 */
const formatPrice = (value: string | number): string => {
  console.log(value);
  if (!value) return '0.0000';

  let num = parseFloat(value.toString());

  if (isNaN(num)) return '0.0000';

  return num.toFixed(4); // 始终保留四位小数
};
/** 处理价格失焦 */
const handlePriceBlur = (value: string, field: keyof FormState) => {
  if (!value) return;

  // 验证价格格式
  // if (!validatePrice(value)) {
  //   ElMessage.warning(`请输入正确的价格格式，最多4位小数`);
  //   return;
  // }
  form.value[field] = formatPrice(form.value[field]);
};

/** 验证价格格式 */
const validatePrice = (value: string): boolean => {
  return /^\d+(\.\d{0,4})?$/.test(value);
};

/** 取消 */
const handleClose = () => {
  visible.value = false;
  emit('update:modelValue', false);
};

/** 是否有错误 */
const hasErrors = computed(() => Object.keys(priceErrors).length > 0);

// 暴露方法给父组件
defineExpose({ setFormData });
const stationOptions = ref([]);
/** 模糊查询站点列表 */
const stationLists = async () => {
  const res = await stationLike({ operatorId: '' });
  stationOptions.value = res.rows.map((item: any) => ({
    label: item.stationName,
    value: item.id,
    name: item.stationName
  }));
};
onMounted(() => {
  stationLists();
});
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
.bg-top {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}
.bg-top1 {
  background-color: rgba(245, 108, 108, 0.5) !important;
  border-color: #f56c6c !important;
  color: gray;
}
.bg-top1-active {
  background-color: rgba(245, 108, 108, 1) !important;
  border-color: #f56c6c !important;
  color: #fff;
}
.bg-top-active {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}
.bg-peak {
  background-color: #e6a23c !important;
  border-color: #e6a23c !important;
}
.bg-peak1 {
  background-color: rgba(230, 162, 60, 0.5) !important;
  border-color: #e6a23c !important;
  color: gray;
}
.bg-peak1-active {
  background-color: rgba(230, 162, 60, 1) !important;
  border-color: #e6a23c !important;
  color: #fff;
}
.bg-flat {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}
.bg-flat1 {
  background-color: rgba(103, 194, 58, 0.5) !important;
  border-color: #67c23a !important;
  color: gray;
}
.bg-flat1-active {
  background-color: rgba(103, 194, 58, 1) !important;
  border-color: #67c23a !important;
  color: #fff;
}
.bg-valley {
  background-color: rgba(64, 158, 255, 1) !important;
  border-color: rgba(64, 158, 255, 1) !important;
}
.bg-valley1 {
  background-color: rgba(64, 158, 255, 0.5) !important;
  border-color: rgba(64, 158, 255, 1) !important;
  color: gray;
}
.bg-valley1-active {
  background-color: rgba(64, 158, 255, 1) !important;
  border-color: rgba(64, 158, 255, 1) !important;
  color: #fff;
}
.time-slot.active.bg-peak {
  background-color: #f56c6c !important;
}
.time-slot.active.bg-peak {
  background-color: #e6a23c !important;
}
.time-slot.active.bg-flat {
  background-color: #67c23a !important;
}
.time-slot.active.bg-valley {
  background-color: rgba(64, 158, 255, 1) !important;
}

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
