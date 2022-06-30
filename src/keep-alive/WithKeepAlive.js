import { useContext, useEffect,useRef } from "react"
import CacheContext from "./cacheContext"
import * as cacheTypes from './cache-types'
function WithKeepAlive(OldComponent,{cacheId = window.location.pathname,scroll}){
     console.log('子组件渲染')
     return function Base(props){
         const divRef  = useRef(null)
         let {cacheStatus,mount,handleScroll,dispatch} = useContext(CacheContext)
         useEffect(()=>{
             const fn = handleScroll.bind(null,cacheId)
             if(scroll){
                divRef.current && divRef.current.addEventListener('scroll',fn,true) //捕获阶段
             }
             return () => {
                divRef.current && divRef.current.removeEventListener('scroll',fn) 
             }
         },[divRef.current])
         useEffect(()=>{
            let cacheState = cacheStatus[cacheId]
            if(cacheState && cacheState.doms  && cacheState.status!=cacheTypes.DESTROY){
               cacheState.doms.forEach(dom=>{
                  console.log(dom)
                  divRef.current.appendChild(dom)
                     // const nodes = document.querySelectorAll('[id^=cache]')
                     // nodes.forEach(node=> node.parentNode.removeChild(node))
               })
               if(scroll){
                Object.keys(cacheState.scrolls).forEach(key=>{
                    const target = cacheState.scrolls[key].dom
                    const top = cacheState.scrolls[key].top
                    target.scrollTop = top
                })
               }
            }else{
                mount({
                    cacheId,
                    reactElement:<OldComponent {...props} dispatch={dispatch}/>
                })
            }
         },[cacheStatus])
         return <div className="container" ref={divRef}>
            {/* <OldComponent/>    */}
         </div>
     }
}
export default WithKeepAlive

/**
 * 不直接渲染oldComponent，通过缓存容器去创建oldComponent对应真实dom,进行缓存
 * 即使oldComponent销毁，缓存还可以保留
 */