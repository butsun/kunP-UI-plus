import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { PriceTemplateVO, PriceTemplateForm, PriceTemplateQuery, PriceTemplateResponse, PriceTemplateDetailVO } from '@/api/kpSystem/priceTemplate/types';

/**
 * 查询站点价格模版列表
 * @param query
 * @returns {*}
 */

export const listPriceTemplate = (query?: PriceTemplateQuery): AxiosPromise<PriceTemplateResponse> => {
  return request({
    url: '/kpSystem/priceTemplate/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点价格模版详细
 * @param id
 */
export const getPriceTemplate = (id: string | number): AxiosPromise<PriceTemplateVO> => {
  return request({
    url: '/kpSystem/priceTemplate/' + id,
    method: 'get'
  });
};

/**
 * 获取价格模板详情
 * @param priceCode 价格模板编码
 */
export const getPriceTemplateDetail = (priceCode: string | number): AxiosPromise<PriceTemplateDetailVO> => {
  return request({
    url: `/kpSystem/priceTemplate/${priceCode}`,
    method: 'get'
  });
};

/**
 * 新增站点价格模版
 * @param data
 */
export const addPriceTemplate = (data: PriceTemplateForm): AxiosPromise<PriceTemplateVO> => {
  return request({
    url: '/kpSystem/priceTemplate',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点价格模版
 * @param data
 */
export const updatePriceTemplate = (data: PriceTemplateForm): AxiosPromise<PriceTemplateVO> => {
  return request({
    url: '/kpSystem/priceTemplate',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点价格模版
 * @param id
 */
export const delPriceTemplate = (id: string | number | Array<string | number>) => {
  return request({
    url: '/kpSystem/priceTemplate/' + id,
    method: 'delete'
  });
};
