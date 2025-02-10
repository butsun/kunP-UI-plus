export interface ConnectorVO {
  /**
   * 站点id
   */
  stationId: string | number;

  /**
   * 运营商id
   */
  operatorId: string | number;

  /**
   * 设备号
   */
  equipmentId: string | number;

  /**
   * 枪号
   */
  connectorId: string | number;

  /**
   * 枪名称
   */
  connectorName: string;

  /**
   * 枪类型
   */
  connectorType: number;

  /**
   * 国标
   */
  nationalStandard: number;

  /**
   * 状态
   */
  status: number;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;
}

export interface ConnectorForm extends BaseEntity {
  /**
   * 站点id
   */
  stationId?: string | number;
  stationName?: string;
  /**
   * 运营商id
   */
  operatorId?: string | number;
  operatorName?: string;

  /**
   * 设备号
   */
  equipmentNo?: string | number;

  /**
   * 枪号
   */
  connectorId?: string | number;

  /**
   * 枪名称
   */
  connectorName?: string;

  /**
   * 枪类型
   */
  connectorType?: number;

  /**
   * 国标
   */
  nationalStandard?: number;

  /**
   * 状态
   */
  status?: number;
}

export interface ConnectorQuery extends PageQuery {
  /**
   * 站点id
   */
  stationId?: string | number;
  equipmentNo?: string | number;
  /**
   * 运营商id
   */
  operatorId?: string | number;

  /**
   * 设备号
   */
  equipmentId?: string | number;

  /**
   * 枪号
   */
  connectorId?: string | number;

  /**
   * 日期范围参数
   */
  params?: any;
}
