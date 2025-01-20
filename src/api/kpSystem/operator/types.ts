export interface OperatorVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 运营商名称
   */
  operatorName: string;

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
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

}

export interface OperatorForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 运营商名称
   */
  operatorName?: string;

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

}

export interface OperatorQuery extends PageQuery {

  /**
   * 运营商名称
   */
  operatorName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



