export interface ChargeAccountVO {
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
  accoutType: number;

  /**
   * 禁用
   */
  disableFlag: number;

  /**
   * 注册时间
   */
  registerTime: string;

  /**
   * 最近一次访问时间
   */
  lastVisitTime: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ChargeAccountForm extends BaseEntity {
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
  accoutType?: number;

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
  accoutType?: number;

  /**
   * 禁用
   */
  disableFlag?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



