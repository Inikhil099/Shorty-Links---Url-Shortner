import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../redux/slices/UserSlice";
import LoadingScreen from "../pages/LoadingPage";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import { backend_url } from "../constants";

const AuthRoute = ({ children }) => {
  const userinfo = useSelector((state) => state.userinfo.uservalue);
  const isAuthenticated = !!userinfo;
  return isAuthenticated ? <Navigate to={"/"} /> : children;
};

const ProtectAdminRoutes = ({ children }) => {
  const userinfo = useSelector((state) => state.userinfo.uservalue);
  const isAuthenticated = !!userinfo;
  return isAuthenticated && userinfo.isAdmin ? children : <NotFound />;
};

const ProtectRoutes = ({ children }) => {
  const userinfo = useSelector((state) => state.userinfo.uservalue);
  const isAuthenticated = !!userinfo;
  // if (userinfo && !userinfo.isVerified) {
  //   return (window.location.href =
  // `${backend_url}/auth/emailverificationpage`);
  // }
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

function App() {
  const userinfo = useSelector((state) => state.userinfo.uservalue);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [isError, setisError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${backend_url}/user/get-user-data`, {
          withCredentials: true,
        });
        if (res.status == 200 && res.data.userdetails._id) {
          dispatch(setUserInfo(res.data.userdetails));
          setTimeout(() => {
            setloading(false);
          }, 2000);
        }
      } catch (error) {
        if (error) {
          setTimeout(() => {
            dispatch(setUserInfo(undefined));
            setisError(true);
            setTimeout(() => {
              setloading(false);
            }, 2000);
          }, 3000);
        }
      }
    };
    if (!userinfo) {
      getUserData();
    }
  }, [userinfo]);

  const isAuths =
    location.pathname === "/login" || location.pathname === "/signup";
  if (loading && !isAuths) {
    return <LoadingScreen isError={isError} />;
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectAdminRoutes>
              <Admin />
            </ProtectAdminRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
