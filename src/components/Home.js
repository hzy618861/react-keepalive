import React,{useState} from 'react'

export default function Home(props) {
  return (
    <div>
        <button onClick={()=>props.dispatch({
          type:'DESTROY',payload:{cacheId:'User'}
        })}>重置User</button>
        <button onClick={()=>props.dispatch({
          type:'DESTROY',payload:{cacheId:'About'}
        })} >重置About</button>
    </div>
  )
}
