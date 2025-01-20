import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChargeAccountVO, ChargeAccountForm, ChargeAccountQuery } from '@/api/kpSystem/chargeAccount/types';

/**
 * 查询充电账户列表
 * @param query
 * @returns {*}
 */

export const listChargeAccount = (query?: ChargeAccountQuery): AxiosPromise<ChargeAccountVO[]> => {
  return request({
    url: '/kpSystem/chargeAccount/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电账户详细
 * @param id
 */
export const getChargeAccount = (id: string | number): AxiosPromise<ChargeAccountVO> => {
  return request({
    url: '/kpSystem/chargeAccount/' + id,
    method: 'get'
  });
};

/**
 * 新增充电账户
 * @param data
 */
export const addChargeAccount = (data: ChargeAccountForm) => {
  return request({
    url: '/kpSystem/chargeAccount',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电账户
 * @param data
 */
export const updateChargeAccount = (data: ChargeAccountForm) => {
  return request({
    url: '/kpSystem/chargeAccount',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电账户
 * @param id
 */
export const delChargeAccount = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/chargeAccount/' + id,
    method: 'delete'
  });
};
