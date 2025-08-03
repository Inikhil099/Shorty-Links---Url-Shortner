import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserInfo } from '../redux/slices/UserSlice';
import { toast } from 'sonner';

const Signup = () => {
  const [userData, setuserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate()
  const userinfo = useSelector((state)=>state.userinfo.uservalue)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setuserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", { userData }, { withCredentials: true })
      dispatch(setUserInfo(res.data.newuser))
      navigate("/")


    } catch (error) {
      toast.error(error.response.data)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <div className="space-y-5">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              required
              value={userData.firstname}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              required
              value={userData.lastname}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={userData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={userData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={userData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />
          </div>
          <button
            onClick={() => {
              handleSubmit()
            }}
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account? <Link to={"/login"} className="text-purple-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
