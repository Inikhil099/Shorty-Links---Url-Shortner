import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setUserInfo } from '../redux/slices/UserSlice';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const userinfo = useSelector((state) => state.userinfo.uservalue)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password }, { withCredentials: true })
      dispatch(setUserInfo(res.data.user))
      navigate("/")
    } catch (error) {
       toast.error(error.response.data)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <div onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <button
            onClick={() => {
              handleSubmit()
            }}
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300"
          >
            Log In
          </button>
        </div>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account? <Link to={"/signup"} className="text-pink-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
