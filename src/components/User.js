import React from 'react'
import {Link} from 'react-router-dom'
export default function User() {
  const lists = new Array(100).fill(0)
  return (
    <ul style={{height:'200px',overflow:'scroll'}}>
        {
            lists.map((list,index)=>(
                <li key={index}>
                  {index}
                </li>
            ))
        }
    </ul>
  )
}
