/*
 *公共接口
 */
import http from './http'

// 获取选手详情
export const getVoteDetail = params => http.get(`/api/get`, params)
// 投票
export const postVote = params => http.post(`/api/votes`, params)


