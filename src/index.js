import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Route,Link,Routes} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import User from './components/User'
import './index.css'
import { KeepAliveProvider, WithKeepAlive } from './keep-alive';

const KeepAliveHome = WithKeepAlive(Home,{cacheId:'Home'})
const KeepAliveUser = WithKeepAlive(User,{cacheId:'User',scroll:true})
const KeepAliveAbout = WithKeepAlive(About,{cacheId:'About'})
const App = () => {
   return <BrowserRouter>
   <KeepAliveProvider>
     <ul>
        <li className='link'>
           <Link to="/" >首页</Link>
           <Link to="/user">用户</Link>
           <Link to="/about" >关于</Link>
        </li>
     </ul>
     <Routes>
        <Route path="/"   element={<KeepAliveHome/>}></Route>
        <Route path="/user"  element={<KeepAliveUser/>}></Route>
        <Route path="/about"   element={<KeepAliveAbout/>}></Route>
     </Routes>
     </KeepAliveProvider>
   </BrowserRouter>
}
const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App/>)