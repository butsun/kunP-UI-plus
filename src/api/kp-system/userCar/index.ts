import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserCarVO, UserCarForm, UserCarQuery } from '@/api/kp-system/userCar/types';

/**
 * 查询车辆管理列表
 * @param query
 * @returns {*}
 */

export const listUserCar = (query?: UserCarQuery): AxiosPromise<UserCarVO[]> => {
  return request({
    url: '/kp-system/userCar/list',
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
    url: '/kp-system/userCar/' + id,
    method: 'get'
  });
};

/**
 * 新增车辆管理
 * @param data
 */
export const addUserCar = (data: UserCarForm) => {
  return request({
    url: '/kp-system/userCar',
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
    url: '/kp-system/userCar',
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
    url: '/kp-system/userCar/' + id,
    method: 'delete'
  });
};
