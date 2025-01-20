import request from '@/utils/request';

/**
 * 获取区域子列表
 * @param id 父级ID，获取省份时传0，获取城市时传省份ID
 * @returns 区域列表
 */
export function getAreaChildList(id: string | number) {
  return request({
    url: '/system/area/getChildListById',
    method: 'get',
    params: {
      id
    }
  });
}

// 区域数据接口
export interface RegionData {
  id: string;
  name: string;
}
