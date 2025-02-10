export interface StationVO {
  /**
   * 运营商id
   */
  operatorId: string | number;

  /**
   * 站点名称
   */
  stationName: string;

  /**
   * 省
   */
  province: string;

  /**
   * 市
   */
  city: string;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 站点电话
   */
  stationTel: string;

  /**
   * 服务电话
   */
  serviceTel: string;

  /**
   * 类型
   */
  stationType: number;

  /**
   * 状态
   */
  stationStatus: number;

  /**
   * 车位数量
   */
  parkNums: number;

  /**
   * 营业时间
   */
  busineHours: string;

  /**
   * 停车费
   */
  parkFee: string;

  /**
   * 备注信息
   */
  remark: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;
  /**
   * 价格模版
   */
  priceId: number;
}

export interface StationForm extends BaseEntity {
  /**
   * 运营商id
   */
  operatorId?: string | number;

  /**
   * 站点名称
   */
  stationName?: string;

  /**
   * 省
   */
  province?: string;

  /**
   * 市
   */
  city?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 站点电话
   */
  stationTel?: string;

  /**
   * 服务电话
   */
  serviceTel?: string;

  /**
   * 类型
   */
  stationType?: number;

  /**
   * 状态
   */
  stationStatus?: number;

  /**
   * 车位数量
   */
  parkNums?: number;

  /**
   * 营业时间
   */
  busineHours?: string;

  /**
   * 停车费
   */
  parkFee?: string;

  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 价格模版
   */
  priceId?: number;
  
}

export interface StationQuery extends PageQuery {
  /**
   * 运营商id
   */
  operatorId?: string | number;

  /**
   * 站点名称
   */
  stationName?: string;

  /**
   * 省
   */
  province?: string;

  /**
   * 市
   */
  city?: string;

  /**
   * 类型
   */
  stationType?: number;

  /**
   * 状态
   */
  stationStatus?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
