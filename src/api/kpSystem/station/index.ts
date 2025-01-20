import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StationVO, StationForm, StationQuery } from '@/api/kpSystem/station/types';

/**
 * 查询站点管理列表
 * @param query
 * @returns {*}
 */

export const listStation = (query?: StationQuery): AxiosPromise<StationVO[]> => {
  return request({
    url: '/kpSystem/station/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点管理详细
 * @param id
 */
export const getStation = (id: string | number): AxiosPromise<StationVO> => {
  return request({
    url: '/kpSystem/station/' + id,
    method: 'get'
  });
};

/**
 * 新增站点管理
 * @param data
 */
export const addStation = (data: StationForm) => {
  return request({
    url: '/kpSystem/station',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点管理
 * @param data
 */
export const updateStation = (data: StationForm) => {
  return request({
    url: '/kpSystem/station',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点管理
 * @param id
 */
export const delStation = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/station/' + id,
    method: 'delete'
  });
};
