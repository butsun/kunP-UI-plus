import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EquipmentVO, EquipmentForm, EquipmentQuery } from '@/api/kpSystem/equipment/types';

/**
 * 查询充电设备管理列表
 * @param query
 * @returns {*}
 */

export const listEquipment = (query?: EquipmentQuery): AxiosPromise<EquipmentVO[]> => {
  return request({
    url: '/kpSystem/equipment/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电设备管理详细
 * @param id
 */
export const getEquipment = (id: string | number): AxiosPromise<EquipmentVO> => {
  return request({
    url: '/kpSystem/equipment/' + id,
    method: 'get'
  });
};

/**
 * 新增充电设备管理
 * @param data
 */
export const addEquipment = (data: EquipmentForm) => {
  return request({
    url: '/kpSystem/equipment',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电设备管理
 * @param data
 */
export const updateEquipment = (data: EquipmentForm) => {
  return request({
    url: '/kpSystem/equipment',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电设备管理
 * @param id
 */
export const delEquipment = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/equipment/' + id,
    method: 'delete'
  });
};
