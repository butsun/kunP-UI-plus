export interface ConnectorVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  operatorId: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId: string | number;

  /**
   * 设备编码(设备唯一编码，对同一运营商，保证唯一)
   */
  equipmentId: string | number;

  /**
   * 充电设备接口编码(充电设备接口编码，同一运营商内唯一)
   */
  connectorId: string | number;

  /**
   * 充电设备接口名称
   */
  connectorName: string;

  /**
   * 额定电压上限(单位:V)
   */
  voltageUpperLimits: number;

  /**
   * 额定电压下限(单位:V)
   */
  voltageLowerLimits: number;

  /**
   * 额定电流(单位:A)
   */
  currentValue: number;

  /**
   * 额定功率(单位:kW)
   */
  power: number;

  /**
   * 充电设备接口状态:0、离网;1、空闲;2、占用(未充电);3、占用(充电中);4、占用(预约锁定);255、故障
   */
  status: number;

}

export interface ConnectorForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  operatorId?: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId?: string | number;

  /**
   * 充电设备接口编码(充电设备接口编码，同一运营商内唯一)
   */
  connectorId?: string | number;

  /**
   * 充电设备接口名称
   */
  connectorName?: string;

}

export interface ConnectorQuery extends PageQuery {

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  operatorId?: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId?: string | number;

  /**
   * 设备编码(设备唯一编码，对同一运营商，保证唯一)
   */
  equipmentId?: string | number;

  /**
   * 充电设备接口编码(充电设备接口编码，同一运营商内唯一)
   */
  connectorId?: string | number;

  /**
   * 充电设备接口名称
   */
  connectorName?: string;

  /**
   * 额定电压上限(单位:V)
   */
  voltageUpperLimits?: number;

  /**
   * 额定电压下限(单位:V)
   */
  voltageLowerLimits?: number;

  /**
   * 额定电流(单位:A)
   */
  currentValue?: number;

  /**
   * 额定功率(单位:kW)
   */
  power?: number;

  /**
   * 充电设备接口状态:0、离网;1、空闲;2、占用(未充电);3、占用(充电中);4、占用(预约锁定);255、故障
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



