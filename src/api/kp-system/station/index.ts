import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StationVO, StationForm, StationQuery } from '@/api/kp-system/station/types';

/**
 * 查询充电站管理列表
 * @param query
 * @returns {*}
 */

export const listStation = (query?: StationQuery): AxiosPromise<StationVO[]> => {
  return request({
    url: '/kp-system/station/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电站管理详细
 * @param id
 */
export const getStation = (id: string | number): AxiosPromise<StationVO> => {
  return request({
    url: '/kp-system/station/' + id,
    method: 'get'
  });
};

/**
 * 新增充电站管理
 * @param data
 */
export const addStation = (data: StationForm) => {
  return request({
    url: '/kp-system/station',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电站管理
 * @param data
 */
export const updateStation = (data: StationForm) => {
  return request({
    url: '/kp-system/station',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电站管理
 * @param id
 */
export const delStation = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/station/' + id,
    method: 'delete'
  });
};
