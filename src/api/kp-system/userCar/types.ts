export interface UserCarVO {
  /**
   * 车辆ID
   */
  id: string | number;

  /**
   * 归属账户ID
   */
  accountId: string | number;

  /**
   * 车牌号
   */
  plateNo: string;

  /**
   * 车辆vin码
   */
  carVin: string;

  /**
   * 品牌型号
   */
  carModel: string;

  /**
   * 车辆所有人
   */
  owner: string;

  /**
   * 使用性质:运营、非运营
   */
  useCharacter: string;

  /**
   * 注册日期(格式"yyyy-MM-dd")
   */
  registerDate: string;

  /**
   * 发证日期(格式"yyyy-MM-dd")
   */
  issueDate: string;

  /**
   * 行驶证图片json串
   */
  licenseImgs: string;

  /**
   * 审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核
   */
  checkState: number;

  /**
   * 认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过
   */
  authState: number;

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
   * 归属账户ID
   */
  accountId?: string | number;

  /**
   * 车牌号
   */
  plateNo?: string;

  /**
   * 车辆vin码
   */
  carVin?: string;

  /**
   * 品牌型号
   */
  carModel?: string;

  /**
   * 车辆所有人
   */
  owner?: string;

  /**
   * 使用性质:运营、非运营
   */
  useCharacter?: string;

  /**
   * 注册日期(格式"yyyy-MM-dd")
   */
  registerDate?: string;

  /**
   * 发证日期(格式"yyyy-MM-dd")
   */
  issueDate?: string;

  /**
   * 行驶证图片json串
   */
  licenseImgs?: string;

  /**
   * 审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核
   */
  checkState?: number;

  /**
   * 认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过
   */
  authState?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface UserCarQuery extends PageQuery {

  /**
   * 归属账户ID
   */
  accountId?: string | number;

  /**
   * 车牌号
   */
  plateNo?: string;

  /**
   * 车辆vin码
   */
  carVin?: string;

  /**
   * 品牌型号
   */
  carModel?: string;

  /**
   * 车辆所有人
   */
  owner?: string;

  /**
   * 使用性质:运营、非运营
   */
  useCharacter?: string;

  /**
   * 注册日期(格式"yyyy-MM-dd")
   */
  registerDate?: string;

  /**
   * 发证日期(格式"yyyy-MM-dd")
   */
  issueDate?: string;

  /**
   * 行驶证图片json串
   */
  licenseImgs?: string;

  /**
   * 审核状态:0、待审核;1、审核通过;2、审核不通过;3、不需审核
   */
  checkState?: number;

  /**
   * 认证状态:0、不认证;1、待认证;2、认证通过;3、认证不通过
   */
  authState?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



