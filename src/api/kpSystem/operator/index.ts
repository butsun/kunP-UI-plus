import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OperatorVO, OperatorForm, OperatorQuery } from '@/api/kpSystem/operator/types';

/**
 * 查询运营商管理列表
 * @param query
 * @returns {*}
 */

export const listOperator = (query?: OperatorQuery): AxiosPromise<OperatorVO[]> => {
  return request({
    url: '/kpSystem/operator/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询运营商管理详细
 * @param id
 */
export const getOperator = (id: string | number): AxiosPromise<OperatorVO> => {
  return request({
    url: '/kpSystem/operator/' + id,
    method: 'get'
  });
};

/**
 * 新增运营商管理
 * @param data
 */
export const addOperator = (data: OperatorForm) => {
  return request({
    url: '/kpSystem/operator',
    method: 'post',
    data: data
  });
};

/**
 * 修改运营商管理
 * @param data
 */
export const updateOperator = (data: OperatorForm) => {
  return request({
    url: '/kpSystem/operator',
    method: 'put',
    data: data
  });
};

/**
 * 删除运营商管理
 * @param id
 */
export const delOperator = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/operator/' + id,
    method: 'delete'
  });
};
