export interface ChargeAccountVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 手机号
   */
  mobile: string;

  /**
   * 昵称
   */
  nickName: string;

  /**
   * 性别
   */
  sex: number;

  /**
   * 账户类型
   */
  accountType: number;

  /**
   * 省
   */
  province: string;

  /**
   * 市
   */
  city: string;

  /**
   * 禁用
   */
  disableFlag: number;

  /**
   * 备注
   */
  remark: string;

}

export interface ChargeAccountForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 手机号
   */
  mobile?: string;

  /**
   * 昵称
   */
  nickName?: string;

  /**
   * 性别
   */
  sex?: number;

  /**
   * 账户类型
   */
  accountType?: number;

  /**
   * 省
   */
  province?: string;

  /**
   * 市
   */
  city?: string;

  /**
   * 禁用
   */
  disableFlag?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface ChargeAccountQuery extends PageQuery {

  /**
   * 手机号
   */
  mobile?: string;

  /**
   * 昵称
   */
  nickName?: string;

  /**
   * 账户类型
   */
  accountType?: number;

  /**
   * 省
   */
  province?: string;

  /**
   * 市
   */
  city?: string;

  /**
   * 禁用
   */
  disableFlag?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



