// 仪表盘数据接口类型定义

/**
 * 聚合数据VO对象
 */
export interface AggregateOrderVO{
  /**
   * 运营商ID
   */
  operatorId: number;

  /**
   * 充电站ID
   */
  stationId: number;

  /**
   * 数据日期
   */
  dataTime: string;

  /**
   * 总充电量
   */
  totalPower: number;

  /**
   * 总金额
   */
  totalMoney: number;

  /**
   * 总电费
   */
  totalElecMoney: number;

  /**
   * 总服务费
   */
  totalServiceMoney: number;

  /**
   * 总充电时长(分钟)
   */
  totalDuration: number;

  /**
   * 总尖峰电量
   */
  totalTopPower: number;

  /**
   * 总峰时电量
   */
  totalPeakPower: number;

  /**
   * 总平时电量
   */
  totalFlatPower: number;

  /**
   * 总谷时电量
   */
  totalValleyPower: number;

  /**
   * 总用电量详情
   */
  totalPowerInfo: string;

  /**
   * 服务次数
   */
  servCount: number;
}


/**
 * 趋势数据接口
 */
export interface TrendData{
  /**
   * 总充电量
   */
  totalPower: number;

  /**
   * 总电费
   */
  totalElecMoney: number;

  /**
   * 总服务费
   */
  totalServMoney: number;

  /**
   * 服务次数
   */
  servCount: number;

  // 日期列表
  schemaData: AggregateOrderVO[];
}
