import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OperatorVO, OperatorForm, OperatorQuery } from '@/api/kp-system/operator/types';

/**
 * 查询基础运营商管理列表
 * @param query
 * @returns {*}
 */

export const listOperator = (query?: OperatorQuery): AxiosPromise<OperatorVO[]> => {
  return request({
    url: '/kp-system/operator/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询基础运营商管理详细
 * @param id
 */
export const getOperator = (id: string | number): AxiosPromise<OperatorVO> => {
  return request({
    url: '/kp-system/operator/' + id,
    method: 'get'
  });
};

/**
 * 新增基础运营商管理
 * @param data
 */
export const addOperator = (data: OperatorForm) => {
  return request({
    url: '/kp-system/operator',
    method: 'post',
    data: data
  });
};

/**
 * 修改基础运营商管理
 * @param data
 */
export const updateOperator = (data: OperatorForm) => {
  return request({
    url: '/kp-system/operator',
    method: 'put',
    data: data
  });
};

/**
 * 删除基础运营商管理
 * @param id
 */
export const delOperator = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/operator/' + id,
    method: 'delete'
  });
};
