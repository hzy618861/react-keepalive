
/**
 * 
 * @param {*} state  缓存状态
 * @param {*} action 改变状态的方法
 */
import * as cacheTypes from './cache-types'
function cacheReducer(cacheStatus, action) {
   const payload = action.payload
   switch (action.type) {
      case cacheTypes.CREATE:
         return {
            ...cacheStatus,
            [payload.cacheId]: {
               cacheId: payload.cacheId, //缓存id
               reactElement: payload.reactElement, //要渲染的虚拟dom
               status: cacheTypes.CREATE, //缓存状态
               doms: undefined,  //真实dom
               scrolls: {} //滚动信息 key滚动dom 值为滚动的位置
            }
         }
      case cacheTypes.CREATED:
         return {
            ...cacheStatus,
            [payload.cacheId]: {
               ...cacheStatus[payload.cacheId],
               status: cacheTypes.CREATED,
               doms: payload.doms
            }
         }
      case cacheTypes.DESTROY:
         return {
            ...cacheStatus,
            [payload.cacheId]: {
               ...cacheStatus[payload.cacheId],
               status: cacheTypes.DESTROY,
            }
         }
   }
}
export default cacheReducer