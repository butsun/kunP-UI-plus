export interface PriceVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 充电站ID
   */
  stationId: string | number;

  /**
   * 价格模版ID，0为默认价格
   */
  priceCode: number;

  /**
   * 时段起始时间点 6位 HHmmss
   */
  startTime: string;

  /**
   * 价格类型:0、尖;1、峰;2、平;3、谷;
   */
  priceType: number;

  /**
   * 电价:XXXX.XXXX
   */
  elecPrice: number;

  /**
   * 服务费单价:XXXX.XXXX
   */
  servicePrice: number;

  /**
   * 备注
   */
  remark: string;

}

export interface PriceForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 充电站ID
   */
  stationId?: string | number;

  /**
   * 价格模版ID，0为默认价格
   */
  priceCode?: number;

  /**
   * 时段起始时间点 6位 HHmmss
   */
  startTime?: string;

  /**
   * 价格类型:0、尖;1、峰;2、平;3、谷;
   */
  priceType?: number;

  /**
   * 电价:XXXX.XXXX
   */
  elecPrice?: number;

  /**
   * 服务费单价:XXXX.XXXX
   */
  servicePrice?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface PriceQuery extends PageQuery {

  /**
   * 充电站ID
   */
  stationId?: string | number;

  /**
   * 价格模版ID，0为默认价格
   */
  priceCode?: number;

  /**
   * 时段起始时间点 6位 HHmmss
   */
  startTime?: string;

  /**
   * 价格类型:0、尖;1、峰;2、平;3、谷;
   */
  priceType?: number;

  /**
   * 电价:XXXX.XXXX
   */
  elecPrice?: number;

  /**
   * 服务费单价:XXXX.XXXX
   */
  servicePrice?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



