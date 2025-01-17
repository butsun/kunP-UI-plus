export interface StationVO {
  /**
   * 自增id
   */
  id: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId: string | number;

  /**
   * 运营商id(组织机构代码)
   */
  operatorId: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId: string | number;

  /**
   * 设备所属商id(组织机构代码)
   */
  equipmentOwnerId: string | number;

  /**
   * 充电站名称
   */
  stationName: string;

  /**
   * 充电站省市辖区编码
   */
  areaCode: string;

  /**
   * 详细地址
   */
  address: string;

  /**
   * 站点电话(能够联系场站工作人员进行协助的联系电话)
   */
  stationTel: string;

  /**
   * 服务电话(平台服务电话，例如400的电话)
   */
  serviceTel: string;

  /**
   * 站点类型:1、公共;50、个人;100、公交(专用);101、环卫(专用);102、物流(专用);103、出租车(专用);255、其他
   */
  stationType: number;

  /**
   * 站点状态:0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用
   */
  stationStatus: number;

  /**
   * 车位数量(可停放进行充电的车位总数，默认：0 未知)
   */
  parkNums: number;

  /**
   * 站点经度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLng: number;

  /**
   * 站点纬度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLat: number;

  /**
   * 建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他
   */
  construction: number;

  /**
   * 站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串
   */
  pictures: string;

  /**
   * 营业时间描述
   */
  busineHours: string;

  /**
   * 充电电费描述
   */
  electricityFee: string;

  /**
   * 服务费描述
   */
  serviceFee: string;

  /**
   * 停车费描述
   */
  parkFee: string;

  /**
   * 支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上
   */
  payment: string;

  /**
   * 是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)
   */
  supportOrder: number;

  /**
   * 备注信息
   */
  remark: string;

}

export interface StationForm extends BaseEntity {
  /**
   * 自增id
   */
  id?: string | number;

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 运营商id(组织机构代码)
   */
  operatorId?: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId?: string | number;

  /**
   * 设备所属商id(组织机构代码)
   */
  equipmentOwnerId?: string | number;

  /**
   * 充电站名称
   */
  stationName?: string;

  /**
   * 充电站省市辖区编码
   */
  areaCode?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 站点电话(能够联系场站工作人员进行协助的联系电话)
   */
  stationTel?: string;

  /**
   * 服务电话(平台服务电话，例如400的电话)
   */
  serviceTel?: string;

  /**
   * 站点类型:1、公共;50、个人;100、公交(专用);101、环卫(专用);102、物流(专用);103、出租车(专用);255、其他
   */
  stationType?: number;

  /**
   * 站点状态:0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用
   */
  stationStatus?: number;

  /**
   * 车位数量(可停放进行充电的车位总数，默认：0 未知)
   */
  parkNums?: number;

  /**
   * 站点经度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLng?: number;

  /**
   * 站点纬度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLat?: number;

  /**
   * 建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他
   */
  construction?: number;

  /**
   * 站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串
   */
  pictures?: string;

  /**
   * 营业时间描述
   */
  busineHours?: string;

  /**
   * 充电电费描述
   */
  electricityFee?: string;

  /**
   * 服务费描述
   */
  serviceFee?: string;

  /**
   * 停车费描述
   */
  parkFee?: string;

  /**
   * 支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上
   */
  payment?: string;

  /**
   * 是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)
   */
  supportOrder?: number;

  /**
   * 备注信息
   */
  remark?: string;

}

export interface StationQuery extends PageQuery {

  /**
   * 充电站id(运营商自定义的唯一编码)
   */
  stationId?: string | number;

  /**
   * 运营商id(组织机构代码)
   */
  operatorId?: string | number;

  /**
   * 用户平台运营商id(组织机构代码)
   */
  userOperatorId?: string | number;

  /**
   * 基础运营商id(组织机构代码)
   */
  baseOperatorId?: string | number;

  /**
   * 设备所属商id(组织机构代码)
   */
  equipmentOwnerId?: string | number;

  /**
   * 充电站名称
   */
  stationName?: string;

  /**
   * 充电站省市辖区编码
   */
  areaCode?: string;

  /**
   * 详细地址
   */
  address?: string;

  /**
   * 站点电话(能够联系场站工作人员进行协助的联系电话)
   */
  stationTel?: string;

  /**
   * 服务电话(平台服务电话，例如400的电话)
   */
  serviceTel?: string;

  /**
   * 站点类型:1、公共;50、个人;100、公交(专用);101、环卫(专用);102、物流(专用);103、出租车(专用);255、其他
   */
  stationType?: number;

  /**
   * 站点状态:0、未知;1、建设中;5、关闭下线;6、维护中;50、正常使用
   */
  stationStatus?: number;

  /**
   * 车位数量(可停放进行充电的车位总数，默认：0 未知)
   */
  parkNums?: number;

  /**
   * 站点经度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLng?: number;

  /**
   * 站点纬度(GCJ-02坐标系,保留小数点后6位)
   */
  stationLat?: number;

  /**
   * 建设场所类型:1、居民区;2、公共机构;3、企事业单位;4、写字楼;5、工业园区;6、交通枢纽;7、大型文体设施;8、城市绿地;9、大型建筑配建停车场;10、路边停车位;11、城际高速服务区;255、其他
   */
  construction?: number;

  /**
   * 站点照片(充电设备照片、充电车位照片、停车场入口照片)JSON串
   */
  pictures?: string;

  /**
   * 营业时间描述
   */
  busineHours?: string;

  /**
   * 充电电费描述
   */
  electricityFee?: string;

  /**
   * 服务费描述
   */
  serviceFee?: string;

  /**
   * 停车费描述
   */
  parkFee?: string;

  /**
   * 支付方式::刷卡、线上、现金。其中电子钱包类卡为刷卡，身份鉴权卡、微信/支付宝、APP为线上
   */
  payment?: string;

  /**
   * 是否支持预约(充电设备是否需要提前预约后才能使用。0为不支持预约;1为支持预约。不填默认为0)
   */
  supportOrder?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



