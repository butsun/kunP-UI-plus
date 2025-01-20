import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChargeVoucherVO, ChargeVoucherForm, ChargeVoucherQuery } from '@/api/kpSystem/chargeVoucher/types';

/**
 * 查询充电凭证管理列表
 * @param query
 * @returns {*}
 */

export const listChargeVoucher = (query?: ChargeVoucherQuery): AxiosPromise<ChargeVoucherVO[]> => {
  return request({
    url: '/kpSystem/chargeVoucher/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电凭证管理详细
 * @param id
 */
export const getChargeVoucher = (id: string | number): AxiosPromise<ChargeVoucherVO> => {
  return request({
    url: '/kpSystem/chargeVoucher/' + id,
    method: 'get'
  });
};

/**
 * 新增充电凭证管理
 * @param data
 */
export const addChargeVoucher = (data: ChargeVoucherForm) => {
  return request({
    url: '/kpSystem/chargeVoucher',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电凭证管理
 * @param data
 */
export const updateChargeVoucher = (data: ChargeVoucherForm) => {
  return request({
    url: '/kpSystem/chargeVoucher',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电凭证管理
 * @param id
 */
export const delChargeVoucher = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/chargeVoucher/' + id,
    method: 'delete'
  });
};
