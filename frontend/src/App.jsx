import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Home from "../pages/Home"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { setUserInfo } from '../redux/slices/UserSlice'
import LoadingScreen from '../pages/LoadingPage'

const AuthRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.userinfo.uservalue)
  const isAuthenticated = !!userinfo
  return isAuthenticated ? <Navigate to={"/"} /> : children

}

const ProtectRoutes = ({ children }) => {
  const userinfo = useSelector((state) => state.userinfo.uservalue)
  const isAuthenticated = !!userinfo
  return isAuthenticated ? children : <Navigate to={"/login"} />

}

function App() {
  const userinfo = useSelector((state) => state.userinfo.uservalue)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [isError, setisError] = useState(false)



  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/get-user-data", { withCredentials: true })
        if (res.status == 200 && res.data.userdetails._id) {
          dispatch(setUserInfo(res.data.userdetails))
          setTimeout(() => {
            setloading(false)
          }, 2000);
        }
      } catch (error) {
        if (error) {
          setTimeout(() => {
            dispatch(setUserInfo(undefined))
            setisError(true)
            setTimeout(() => {
              setloading(false)
            }, 3000);
          }, 5000);
        }


      }
    }
    if (!userinfo) {
      getUserData()
    }

  }, [userinfo])

  if (loading) {
    return <LoadingScreen isError={isError} />
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Navigate to={"/signup"} />} />
          <Route path='/' element={<ProtectRoutes><Home /></ProtectRoutes>} />
          <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
          <Route path='/signup' element={<AuthRoute><Signup /></AuthRoute>} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App



// import { useEffect, useState, useSyncExternalStore } from 'react'
// import './App.css'
// import {BrowserRouter,Routes,Route, Navigate, useNavigate} from "react-router-dom"
// import Home from "../pages/Home"
// import Signup from "../pages/Signup"
// import Login from "../pages/Login"
// import {useDispatch, useSelector} from "react-redux"
// import axios from 'axios'
// import { setUserInfo } from '../redux/slices/UserSlice'

// const AuthRoute = ({children})=>{
//   const userinfo = useSelector((state)=>state.userinfo.uservalue)
//   const isAuthenticated = !!userinfo
//   return isAuthenticated ?  <Navigate to={"/"}/> : children

// }

// const ProtectRoutes = ({children})=>{
//   const userinfo = useSelector((state)=>state.userinfo.uservalue)
//   const isAuthenticated = !!userinfo
//   return isAuthenticated ? children : <Navigate to={"/login"}/>

// }

// function App() {
//   const userinfo = useSelector((state)=>state.userinfo.uservalue)
//   const dispatch = useDispatch()

//   const getUserData = async()=>{
//     try {
//     const res = await axios.get("http://localhost:3000/user/get-user-data",{withCredentials:true})
//     if(res.status == 200 && res.data.userdetails._id){
//       dispatch(setUserInfo(res.data.userdetails))
//     }
//     } catch (error) {
//       dispatch(setUserInfo(undefined))
//     }
//   }

//   useEffect(() => {
//     if(!userinfo){
//       getUserData()
//     }
//   }, [userinfo])
  

//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/*' element={<Navigate to={"/signup"}/>}/>
//       <Route path='/' element={<ProtectRoutes><Home/></ProtectRoutes>}/>
//       <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
//       <Route path='/signup' element={<AuthRoute><Signup/></AuthRoute>}/>
//     </Routes>
//     </BrowserRouter>



//     </>
//   )
// }

// export default App