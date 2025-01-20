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
   * 站点id
   */
  stationId: string | number;

  /**
   * 服务费折扣
   */
  disService: number;

  /**
   * 充电费折扣
   */
  disElectricity: number;

  /**
   * 禁用
   */
  disableFlag: number;

  /**
   * 活动类型
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
   * 站点id
   */
  stationId?: string | number;

  /**
   * 服务费折扣
   */
  disService?: number;

  /**
   * 充电费折扣
   */
  disElectricity?: number;

  /**
   * 禁用
   */
  disableFlag?: number;

  /**
   * 活动类型
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
   * 站点id
   */
  stationId?: string | number;

  /**
   * 服务费折扣
   */
  disService?: number;

  /**
   * 充电费折扣
   */
  disElectricity?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



