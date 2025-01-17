export interface DiscountActivityVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 活动简称
   */
  activityName: string;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId: string | number;

  /**
   * 服务费用折扣率 0%-100% 1Bin表示1%
   */
  disService: number;

  /**
   * 充电费用折扣率 30%-100% 1Bin表示1%
   */
  disElectricity: number;

  /**
   * 是否禁用:0、启用;1、禁用
   */
  disableFlag: number;

  /**
   * 活动类型:0、用户活动;1、集团活动
   */
  activityType: number;

  /**
   * 备注
   */
  remark: string;

}

export interface DiscountActivityForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 活动简称
   */
  activityName?: string;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId?: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 服务费用折扣率 0%-100% 1Bin表示1%
   */
  disService?: number;

  /**
   * 充电费用折扣率 30%-100% 1Bin表示1%
   */
  disElectricity?: number;

  /**
   * 是否禁用:0、启用;1、禁用
   */
  disableFlag?: number;

  /**
   * 活动类型:0、用户活动;1、集团活动
   */
  activityType?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface DiscountActivityQuery extends PageQuery {

  /**
   * 活动简称
   */
  activityName?: string;

  /**
   * 运营商ID（组织机构代码）
   */
  operatorId?: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 是否禁用:0、启用;1、禁用
   */
  disableFlag?: number;

  /**
   * 活动类型:0、用户活动;1、集团活动
   */
  activityType?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



