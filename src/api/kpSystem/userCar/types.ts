export interface UserCarVO {
  /**
   * 车辆ID
   */
  id: string | number;

  /**
   * 归属账户
   */
  accountId: string | number;

  /**
   * 车牌号
   */
  plateNo: string;

  /**
   * vin码
   */
  carVin: string;

  /**
   * 品牌
   */
  carModel: string;

  /**
   * 使用性质: 默认 0:运营;、1:非运营;
   */
  useCharacter: number;

  /**
   * 备注
   */
  remark: string;

}

export interface UserCarForm extends BaseEntity {
  /**
   * 车辆ID
   */
  id?: string | number;

  /**
   * 归属账户
   */
  accountId?: string | number;

  /**
   * 车牌号
   */
  plateNo?: string;

  /**
   * vin码
   */
  carVin?: string;

  /**
   * 品牌
   */
  carModel?: string;

  /**
   * 使用性质: 默认 0:运营;、1:非运营;
   */
  useCharacter?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface UserCarQuery extends PageQuery {

  /**
   * 归属账户
   */
  accountId?: string | number;

  /**
   * 车牌号
   */
  plateNo?: string;

  /**
   * vin码
   */
  carVin?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



