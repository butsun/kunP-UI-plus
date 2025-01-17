export interface ChargeVoucherVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 凭证编号
   */
  voucherNumber: string;

  /**
   * 归属公司ID
   */
  enterpriseId: string | number;

  /**
   * 凭证类型:0 手机号; 1、卡; 2、 VIN;
   */
  voucherType: number;

  /**
   * 归属账户ID
   */
  accountId: string | number;

  /**
   * 是否禁用凭证:0、启用;1、禁用
   */
  disableFlag: number;

  /**
   * 备注
   */
  remark: string;

}

export interface ChargeVoucherForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 凭证编号
   */
  voucherNumber?: string;

  /**
   * 归属公司ID
   */
  enterpriseId?: string | number;

  /**
   * 凭证类型:0 手机号; 1、卡; 2、 VIN;
   */
  voucherType?: number;

  /**
   * 归属账户ID
   */
  accountId?: string | number;

  /**
   * 是否禁用凭证:0、启用;1、禁用
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
   * 归属公司ID
   */
  enterpriseId?: string | number;

  /**
   * 凭证类型:0 手机号; 1、卡; 2、 VIN;
   */
  voucherType?: number;

  /**
   * 归属账户ID
   */
  accountId?: string | number;

  /**
   * 是否禁用凭证:0、启用;1、禁用
   */
  disableFlag?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



