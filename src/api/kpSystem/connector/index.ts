import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ConnectorVO, ConnectorForm, ConnectorQuery } from '@/api/kpSystem/connector/types';

/**
 * 查询充电枪管理列表
 * @param query
 * @returns {*}
 */

export const listConnector = (query?: ConnectorQuery): AxiosPromise<ConnectorVO[]> => {
  return request({
    url: '/kpSystem/connector/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电枪管理详细
 * @param id
 */
export const getConnector = (id: string | number): AxiosPromise<ConnectorVO> => {
  return request({
    url: '/kpSystem/connector/' + id,
    method: 'get'
  });
};

/**
 * 新增充电枪管理
 * @param data
 */
export const addConnector = (data: ConnectorForm) => {
  return request({
    url: '/kpSystem/connector',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电枪管理
 * @param data
 */
export const updateConnector = (data: ConnectorForm) => {
  return request({
    url: '/kpSystem/connector',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电枪管理
 * @param id
 */
export const delConnector = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/connector/' + id,
    method: 'delete'
  });
};
