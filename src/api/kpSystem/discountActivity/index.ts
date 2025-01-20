import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DiscountActivityVO, DiscountActivityForm, DiscountActivityQuery } from '@/api/kpSystem/discountActivity/types';

/**
 * 查询充电优惠管理列表
 * @param query
 * @returns {*}
 */

export const listDiscountActivity = (query?: DiscountActivityQuery): AxiosPromise<DiscountActivityVO[]> => {
  return request({
    url: '/kpSystem/discountActivity/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询充电优惠管理详细
 * @param id
 */
export const getDiscountActivity = (id: string | number): AxiosPromise<DiscountActivityVO> => {
  return request({
    url: '/kpSystem/discountActivity/' + id,
    method: 'get'
  });
};

/**
 * 新增充电优惠管理
 * @param data
 */
export const addDiscountActivity = (data: DiscountActivityForm) => {
  return request({
    url: '/kpSystem/discountActivity',
    method: 'post',
    data: data
  });
};

/**
 * 修改充电优惠管理
 * @param data
 */
export const updateDiscountActivity = (data: DiscountActivityForm) => {
  return request({
    url: '/kpSystem/discountActivity',
    method: 'put',
    data: data
  });
};

/**
 * 删除充电优惠管理
 * @param id
 */
export const delDiscountActivity = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/discountActivity/' + id,
    method: 'delete'
  });
};
