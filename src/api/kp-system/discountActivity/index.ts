import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DiscountActivityVO, DiscountActivityForm, DiscountActivityQuery } from '@/api/kp-system/discountActivity/types';

/**
 * 查询优惠政策列表
 * @param query
 * @returns {*}
 */

export const listDiscountActivity = (query?: DiscountActivityQuery): AxiosPromise<DiscountActivityVO[]> => {
  return request({
    url: '/kp-system/discountActivity/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询优惠政策详细
 * @param id
 */
export const getDiscountActivity = (id: string | number): AxiosPromise<DiscountActivityVO> => {
  return request({
    url: '/kp-system/discountActivity/' + id,
    method: 'get'
  });
};

/**
 * 新增优惠政策
 * @param data
 */
export const addDiscountActivity = (data: DiscountActivityForm) => {
  return request({
    url: '/kp-system/discountActivity',
    method: 'post',
    data: data
  });
};

/**
 * 修改优惠政策
 * @param data
 */
export const updateDiscountActivity = (data: DiscountActivityForm) => {
  return request({
    url: '/kp-system/discountActivity',
    method: 'put',
    data: data
  });
};

/**
 * 删除优惠政策
 * @param id
 */
export const delDiscountActivity = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kp-system/discountActivity/' + id,
    method: 'delete'
  });
};
