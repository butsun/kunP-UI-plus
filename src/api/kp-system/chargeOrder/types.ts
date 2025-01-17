export interface ChargeOrderVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 充电订单号：运营商ID+唯一编号 27个字符； 组织机构9位+id18位
   */
  startChargeSeq: string;

  /**
   * 运营商ID
   */
  operatorId: string | number;

  /**
   * 交易流水号（基础平台和桩的规则 32位 16位BCD）
   */
  tradeNo: string;

  /**
   * 充电订单状态；1启动中 2充电中 3停止中 4已结束 5未知
   */
  startChargeSeqStat: number;

  /**
   * 关联充电站ID，运营商自定义的唯一编码 小于等于20字符
   */
  stationId: string | number;

  /**
   * 充电设备接口编码
   */
  connectorId: string | number;

  /**
   * 电池剩余电量0-1.00
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
   * 累计充电量（度）
   */
  totalPower: number;

  /**
   * 累计电费（元）
   */
  elecMoney: number;

  /**
   * 累计服务费（元）
   */
  serviceMoney: number;

  /**
   * 累计总金额（元）
   */
  totalMoney: number;

  /**
   * 时段数0-32；实际约定为1-24时段，小时为单位
   */
  sumPeriod: number;

  /**
   * 故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义（参考12.1 充电停止原因代码表）
   */
  failReason: number;

  /**
   * vin码
   */
  carVin: string;

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
  /**
   * 
   */
  id?: string | number;

}

export interface ChargeOrderQuery extends PageQuery {

  /**
   * 充电订单号：运营商ID+唯一编号 27个字符； 组织机构9位+id18位
   */
  startChargeSeq?: string;

  /**
   * 交易流水号（基础平台和桩的规则 32位 16位BCD）
   */
  tradeNo?: string;

  /**
   * 充电订单状态；1启动中 2充电中 3停止中 4已结束 5未知
   */
  startChargeSeqStat?: number;

  /**
   * 1空闲 2占用（未充电） 3占用（充电中） 4占用（预约锁定） 255故障
   */
  connectorStatus?: number;

  /**
   * 开始充电时间
   */
  startTime?: string;

  /**
   * 最新采样时间
   */
  endTime?: string;

  /**
   * 时段数0-32；实际约定为1-24时段，小时为单位
   */
  sumPeriod?: number;

  /**
   * 故障原因 0无 1此设备不存在 2此设备离线 3设备已停止充电 4-99自定义（参考12.1 充电停止原因代码表）
   */
  failReason?: number;

  /**
   * vin码
   */
  carVin?: string;

  /**
   * 车牌号
   */
  plateNum?: string;

  /**
   * 手机号
   */
  phoneNum?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



