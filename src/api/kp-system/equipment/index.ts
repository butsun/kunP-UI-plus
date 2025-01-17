import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EquipmentVO, EquipmentForm, EquipmentQuery } from '@/api/kp-system/equipment/types';

/**
 * 查询充电桩管理列表
 * @param query
 * @returns {*}
 */

export const listEquipment = (query?: EquipmentQuery): AxiosPromise<EquipmentVO[]> => {
  return request({
    url: '/kp-system/equipment/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电桩管理详细
 * @param id
 */
export const getEquipment = (id: string | number): AxiosPromise<EquipmentVO> => {
  return request({
    url: '/kp-system/equipment/' + id,
    method: 'get'
  });
};

/**
 * 新增充电桩管理
 * @param data
 */
export const addEquipment = (data: EquipmentForm) => {
  return request({
    url: '/kp-system/equipment',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电桩管理
 * @param data
 */
export const updateEquipment = (data: EquipmentForm) => {
  return request({
    url: '/kp-system/equipment',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电桩管理
 * @param id
 */
export const delEquipment = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/equipment/' + id,
    method: 'delete'
  });
};
