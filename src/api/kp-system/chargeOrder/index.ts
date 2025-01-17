import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChargeOrderVO, ChargeOrderForm, ChargeOrderQuery } from '@/api/kp-system/chargeOrder/types';

/**
 * 查询充电订单列表
 * @param query
 * @returns {*}
 */

export const listChargeOrder = (query?: ChargeOrderQuery): AxiosPromise<ChargeOrderVO[]> => {
  return request({
    url: '/kp-system/chargeOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电订单详细
 * @param id
 */
export const getChargeOrder = (id: string | number): AxiosPromise<ChargeOrderVO> => {
  return request({
    url: '/kp-system/chargeOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增充电订单
 * @param data
 */
export const addChargeOrder = (data: ChargeOrderForm) => {
  return request({
    url: '/kp-system/chargeOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电订单
 * @param data
 */
export const updateChargeOrder = (data: ChargeOrderForm) => {
  return request({
    url: '/kp-system/chargeOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电订单
 * @param id
 */
export const delChargeOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/chargeOrder/' + id,
    method: 'delete'
  });
};
