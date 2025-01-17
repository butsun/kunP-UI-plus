import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { PriceVO, PriceForm, PriceQuery } from '@/api/kp-system/price/types';

/**
 * 查询桩计费规则列表
 * @param query
 * @returns {*}
 */

export const listPrice = (query?: PriceQuery): AxiosPromise<PriceVO[]> => {
  return request({
    url: '/kp-system/price/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询桩计费规则详细
 * @param id
 */
export const getPrice = (id: string | number): AxiosPromise<PriceVO> => {
  return request({
    url: '/kp-system/price/' + id,
    method: 'get'
  });
};

/**
 * 新增桩计费规则
 * @param data
 */
export const addPrice = (data: PriceForm) => {
  return request({
    url: '/kp-system/price',
    method: 'post',
    data: data
  });
};

/**
 * 修改桩计费规则
 * @param data
 */
export const updatePrice = (data: PriceForm) => {
  return request({
    url: '/kp-system/price',
    method: 'put',
    data: data
  });
};

/**
 * 删除桩计费规则
 * @param id
 */
export const delPrice = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/price/' + id,
    method: 'delete'
  });
};
