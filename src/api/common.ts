import request from '@/utils/request';
/**
 * 模糊查询充电设备管理列表
 * @param 无
 */
export const equipmentLike = () => {
  return request({
    url: '/kpSystem/equipment/like',
    method: 'get'
  });
};
/**
 * 模糊查询站点
 * @param 无
 */
export const stationLike = () => {
  return request({
    url: '/kpSystem/station/like',
    method: 'get'
  });
};
/**
 * 模糊查询运营商管理列表
 * @param 无
 */
export const operatorLike = () => {
  return request({
    url: '/kpSystem/operator/like',
    method: 'get'
  });
};
