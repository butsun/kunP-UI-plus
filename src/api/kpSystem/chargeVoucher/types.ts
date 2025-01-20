export interface ChargeVoucherVO {
  /**
   * 凭证编号
   */
  voucherNumber: string;

  /**
   * 归属运营商
   */
  operatorId: string | number;

  /**
   * 凭证类型
   */
  voucherType: number;

  /**
   * 归属账户
   */
  accountId: string | number;

  /**
   * 禁用
   */
  disableFlag: number;

  /**
   * 备注
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

}

export interface ChargeVoucherForm extends BaseEntity {
  /**
   * 凭证编号
   */
  voucherNumber?: string;

  /**
   * 归属运营商
   */
  operatorId?: string | number;

  /**
   * 凭证类型
   */
  voucherType?: number;

  /**
   * 归属账户
   */
  accountId?: string | number;

  /**
   * 禁用
   */
  disableFlag?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface ChargeVoucherQuery extends PageQuery {

  /**
   * 凭证编号
   */
  voucherNumber?: string;

  /**
   * 归属运营商
   */
  operatorId?: string | number;

  /**
   * 禁用
   */
  disableFlag?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



