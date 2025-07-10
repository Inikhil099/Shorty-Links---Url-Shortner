import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from "react-router-dom"
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import { setUserInfo } from '../redux/slices/UserSlice'

const AuthRoute = ({children})=>{
  const userinfo = useSelector((state)=>state.userinfo.uservalue)
  const isAuthenticated = !!userinfo
  return isAuthenticated ?  <Navigate to={"/"}/> : children

}

const ProtectRoutes = ({children})=>{
  const userinfo = useSelector((state)=>state.userinfo.uservalue)
  const isAuthenticated = !!userinfo
  return isAuthenticated ? children : <Navigate to={"/login"}/>

}

function App() {
  const userinfo = useSelector((state)=>state.userinfo.uservalue)
  const dispatch = useDispatch()

  const getalldata = async()=>{
    const res = await axios.get("http://localhost:3000/user/get-user-data",{withCredentials:true})
    dispatch(setUserInfo(res.data.userdetails))
  }

  useEffect(() => {
    if(!userinfo){
      getalldata()
    }
  }, [userinfo])
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectRoutes><Home/></ProtectRoutes>}/>
      <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
      <Route path='/signup' element={<AuthRoute><Signup/></AuthRoute>}/>
    </Routes>
    </BrowserRouter>



    </>
  )
}

export default App
