import React,{useState} from 'react'

export default function About() {
    const [number,setNumber] = useState(0)
    console.log(number)
  return (
    <div>
        用户名：<input/>
        <button onClick={()=>setNumber(number+1)}>{number}</button>
    </div>
  )
}
