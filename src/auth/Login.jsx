import { useTheme } from "@/context/theme-provider";
import { isDraft } from "@reduxjs/toolkit";
import axios from "axios";
import { CloudSun, Eye, EyeOff, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme == "dark"
  useEffect(() => {
    document.title = 'Sign in';
    async function authenticate() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/isLogged`, {
        withCredentials: true
      })
      console.log(response)
      if (response.status === 200) {
        navigate("/dashboard")
      }
    } 
    authenticate()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("object")
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/authenticate`,
        {
          username: email,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 ">
      <div className="border-[2px] border-gray-300 dark:border-gray-600 w-[500px] h-[350px] lg:w-[400px] rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <div className="p-6 flex flex-col space-y-4 gap-5">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-3 gap-5">
            <div className="w-full relative">
              <label
                htmlFor="email"
                className="absolute top-0 left-0 text-gray-700 dark:text-gray-300 font-medium mb-1 translate-y-[-100%]"
              >
                Username:
              </label>
              <input
                type="text"
                required
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 border-t-0 border"
              />
            </div>
            <div className="w-full relative">
              <label
                htmlFor="password"
                className="absolute top-0 left-0 text-gray-700 dark:text-gray-300 font-medium mb-1 translate-y-[-100%]"
              >
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 border-t-0 border"
              />
              <span
                className="absolute top-2 right-3 cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <CloudSun className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </span>
            </div>
            <div className="text-center mt-4">
              <input
                type="submit"
                value="Login"
                className="bg-sky-700 w-full h-[50px] rounded-full cursor-pointer text-black"
              />
              <span className="block mt-2 text-sm text-gray-600">
                Don't have an account? <a href="/signup" className="text-sky-500 hover:underline">Create one</a>
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
