export interface ChargeOrderVO {
id: any;
  /**
   * 订单号
   */
  startChargeSeq: string;

  /**
   * 运营商ID
   */
  operatorId: string | number;

  /**
   * 充电流水号
   */
  tradeNo: string;

  /**
   * 订单状态
   */
  startChargeSeqStat: number;

  /**
   * 站点id
   */
  stationId: string | number;

  /**
   * 充电枪号
   */
  connectorId: string | number;

  /**
   * Soc
   */
  soc: number;

  /**
   * 开始充电时间
   */
  startTime: string;

  /**
   * 最新采样时间
   */
  endTime: string;

  /**
   * 充电量
   */
  totalPower: number;

  /**
   * 电费
   */
  elecMoney: number;

  /**
   * 服务费
   */
  serviceMoney: number;

  /**
   * 优惠后电费（元）
   */
  finalElecMoney: number;

  /**
   * 优惠后服务费（元）
   */
  finalServiceMoney: number;

  /**
   * 总金额
   */
  finalTotalMoney: number;

  /**
   * 故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义（参考12.1 充电停止原因代码表）
   */
  failReason: number;

  /**
   * vin码
   */
  carVin: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

  /**
   * 车牌号
   */
  plateNum: string;

  /**
   * 手机号
   */
  phoneNum: string;

}

export interface ChargeOrderForm extends BaseEntity {
}

export interface ChargeOrderQuery extends PageQuery {

  /**
   * 订单号
   */
  startChargeSeq?: string;

  /**
   * 运营商ID
   */
  operatorId?: string | number;

  /**
   * 订单状态
   */
  startChargeSeqStat?: number;

  /**
   * 站点id
   */
  stationId?: string | number;

  /**
   * 开始充电时间
   */
  startTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



