import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AggregateOrderVO, TrendData } from '@/api/kpSystem/types';


/**
 * 获取今日数据
 * @returns {AxiosPromise}
 */
export function getTodayData(): AxiosPromise<AggregateOrderVO> {
  return request({
    url: '/kp-system/aggregateOrder/date',
    method: 'get'
  });
}

/**
 * 获取昨日数据
 * @returns {AxiosPromise}
 */
export function getYesterdayData(): AxiosPromise<AggregateOrderVO> {
  return request({
    url: '/kp-system/aggregateOrder/date/last',
    method: 'get'
  });
}

/**
 * 获取30天趋势数据
 * @returns {AxiosPromise}
 */
export function getTrendData(): AxiosPromise<TrendData> {
  return request({
    url: '/kp-system/aggregateOrder/last/month',
    method: 'get'
  });
}
