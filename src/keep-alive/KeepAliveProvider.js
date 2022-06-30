import {useReducer,useCallback, useState, useEffect} from 'react'
import cacheReducer  from './cacheReducer'
import CacheContext from './cacheContext'
import * as cacheTypes from './cache-types'
function KeepAliveProvider(props){
      //存放所有缓存信息 dispatch执行组件会重新渲染
      let [cacheStatus,dispatch] = useReducer(cacheReducer,{})
      const mount = useCallback(({cacheId,reactElement})=>{
        if(!cacheStatus[cacheId]){
            dispatch({
                type:cacheTypes.CREATE,
                payload:{
                    cacheId,
                    reactElement
                }
            })
        }else{
            let cacheState = cacheStatus[cacheId]
            if(cacheState.status === cacheTypes.DESTROY){
                let doms = cacheState.doms
                doms.forEach(dom=>dom.parentNode.removeChild(dom))
                dispatch({
                    type:cacheTypes.CREATE,
                    payload:{
                        cacheId,
                        reactElement
                    }
                })
            }
        }
           
      })
      let handleScroll = useCallback((cacheId,e)=>{
           if(cacheStatus[cacheId]){
            let target = e.target
            let scrolls = cacheStatus[cacheId].scrolls
            scrolls[target] = {
                top:target.scrollTop,
                dom:target
            }
           }
      })
      return (
        <CacheContext.Provider value={{cacheStatus,dispatch,mount,handleScroll}}>
            {props.children}
            {
              Object.values(cacheStatus).filter(cacheState=>cacheState.status!=cacheTypes.DESTROY).map(({cacheId,reactElement}) => (
                    <div id={`cache-${cacheId}`} key={cacheId} ref={dom=>{
                        //原生组件ref,当真实dom渲染到页面后会执行回调函数
                       let cacheState = cacheStatus[cacheId]
                       if(dom &&!cacheState.doms || cacheState.status == cacheTypes.DESTROY){
                        let doms = Array.from(dom.childNodes)
                        //reactElement渲染出来的真实dom
                        dispatch({
                            type:cacheTypes.CREATED,
                            payload:{
                                cacheId,
                                doms,
                                reactElement
                            }
                        })
                       }
                    }}>
                        {reactElement}
                    </div>
                ))
            }
        </CacheContext.Provider>
      )
}
export default KeepAliveProvider