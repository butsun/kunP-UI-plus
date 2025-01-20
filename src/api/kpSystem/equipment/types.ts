export interface EquipmentVO {
  /**
   * 设备编号
   */
  equipmentId: string | number;

  /**
   * 站点id
   */
  stationId: string | number;

  /**
   * 设备生产商名称
   */
  manufacturerName: string;

  /**
   * 设备型号
   */
  equipmentModel: string;

  /**
   * 额定电压上限(单位:V)
   */
  voltageUpperLimits: number;

  /**
   * 额定电压下限(单位:V)
   */
  voltageLowerLimits: number;

  /**
   * 额定电流
   */
  currentValue: number;

  /**
   * 额定功率
   */
  power: number;

  /**
   * 设备类型
   */
  equipmentType: number;

  /**
   * 工作状态
   */
  isWorking: number;

  /**
   * 设备名称
   */
  equipmentName: string;

  /**
   * 联网类型
   */
  netType: number;

  /**
   * 最近上线时间
   */
  onlineTm: string;

}

export interface EquipmentForm extends BaseEntity {
  /**
   * 设备编号
   */
  equipmentId?: string | number;

  /**
   * 站点id
   */
  stationId?: string | number;

  /**
   * 设备生产商名称
   */
  manufacturerName?: string;

  /**
   * 设备型号
   */
  equipmentModel?: string;

  /**
   * 额定电压上限(单位:V)
   */
  voltageUpperLimits?: number;

  /**
   * 额定电压下限(单位:V)
   */
  voltageLowerLimits?: number;

  /**
   * 额定电流
   */
  currentValue?: number;

  /**
   * 额定功率
   */
  power?: number;

  /**
   * 设备类型
   */
  equipmentType?: number;

  /**
   * 车位号
   */
  parkNo?: string;

  /**
   * 工作状态
   */
  isWorking?: number;

  /**
   * 设备名称
   */
  equipmentName?: string;

}

export interface EquipmentQuery extends PageQuery {

  /**
   * 设备编号
   */
  equipmentId?: string | number;

  /**
   * 站点id
   */
  stationId?: string | number;

  /**
   * 设备生产商名称
   */
  manufacturerName?: string;

  /**
   * 设备型号
   */
  equipmentModel?: string;

  /**
   * 设备名称
   */
  equipmentName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



