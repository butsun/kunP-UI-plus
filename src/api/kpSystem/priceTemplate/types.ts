export interface PriceTemplateVO {
  /**
   * 计费编号
   */
  priceCode: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 最后修改时间
   */
  time: string;
}

export interface PriceItemVO {
  /**
   * 时段起始时间
   */
  startHour: string;

  /**
   * 电价 支持4位小数
   */
  elecPrice: number;

  /**
   * 服务费 支持4位小数
   */
  servicePrice: number;

  /**
   * 价格类型: 0-尖时，1-峰时，2-平时，3-谷时
   */
  priceType: number;
}

export interface PriceTypeItemVO {
  /**
   * 电价 支持4位小数
   */
  elecPrice: number;

  /**
   * 服务费 支持4位小数
   */
  servicePrice: number;

  /**
   * 价格类型: 0-尖时，1-峰时，2-平时，3-谷时
   */
  priceType: number;
}

export interface PriceTemplateDetailVO {
  /**
   * 站点ID
   */
  stationId: number;

  /**
   * 计费编号
   */
  priceCode: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 时段价格列表
   */
  priceList: PriceItemVO[];

  /**
   * 价格类型列表
   */
  priceTypeList: PriceTypeItemVO[];
}

export interface PriceTemplateForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 充电站ID
   */
  stationId?: string | number;

  /**
   * 价格列表，包含48个时间段
   */
  priceList: PriceItemVO[];

  /**
   * 备注
   */
  remark?: string;
}

export interface PriceTemplateQuery extends PageQuery {

  /**
   * 充电站ID
   */
  stationId?: string | number;

  /**
   * 价格模版编号
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

export interface PriceTemplateResponse {
  total: number;
  rows: PriceTemplateVO[];
  code: number;
  msg: string;
}
