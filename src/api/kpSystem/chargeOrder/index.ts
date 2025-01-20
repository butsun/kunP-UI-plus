import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChargeOrderVO, ChargeOrderForm, ChargeOrderQuery } from '@/api/kpSystem/chargeOrder/types';

/**
 * 查询充电订单管理列表
 * @param query
 * @returns {*}
 */

export const listChargeOrder = (query?: ChargeOrderQuery): AxiosPromise<ChargeOrderVO[]> => {
  return request({
    url: '/kpSystem/chargeOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电订单管理详细
 * @param id
 */
export const getChargeOrder = (id: string | number): AxiosPromise<ChargeOrderVO> => {
  return request({
    url: '/kpSystem/chargeOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增充电订单管理
 * @param data
 */
export const addChargeOrder = (data: ChargeOrderForm) => {
  return request({
    url: '/kpSystem/chargeOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电订单管理
 * @param data
 */
export const updateChargeOrder = (data: ChargeOrderForm) => {
  return request({
    url: '/kpSystem/chargeOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电订单管理
 * @param id
 */
export const delChargeOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/chargeOrder/' + id,
    method: 'delete'
  });
};
