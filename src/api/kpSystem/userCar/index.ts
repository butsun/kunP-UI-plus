import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserCarVO, UserCarForm, UserCarQuery } from '@/api/kpSystem/userCar/types';

/**
 * 查询车辆管理列表
 * @param query
 * @returns {*}
 */

export const listUserCar = (query?: UserCarQuery): AxiosPromise<UserCarVO[]> => {
  return request({
    url: '/kpSystem/userCar/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询车辆管理详细
 * @param id
 */
export const getUserCar = (id: string | number): AxiosPromise<UserCarVO> => {
  return request({
    url: '/kpSystem/userCar/' + id,
    method: 'get'
  });
};

/**
 * 新增车辆管理
 * @param data
 */
export const addUserCar = (data: UserCarForm) => {
  return request({
    url: '/kpSystem/userCar',
    method: 'post',
    data: data
  });
};

/**
 * 修改车辆管理
 * @param data
 */
export const updateUserCar = (data: UserCarForm) => {
  return request({
    url: '/kpSystem/userCar',
    method: 'put',
    data: data
  });
};

/**
 * 删除车辆管理
 * @param id
 */
export const delUserCar = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/userCar/' + id,
    method: 'delete'
  });
};
