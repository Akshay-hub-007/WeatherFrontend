import { useTheme } from "@/context/theme-provider";
import { isDraft } from "@reduxjs/toolkit";
import axios from "axios";
import { CloudSun, Eye, EyeOff, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [mobile,setMobile]=useState(null)
  const { theme, setTheme } = useTheme()
  const [image, setImage] = useState()
  const isDark = theme == "dark"
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
  }

  useEffect(() => {
    document.title = 'Sign Up | Weather App';
    async function authenticate() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/isLogged`, { withCredentials: true })
      console.log(response)
      if (response.status = 200) {
        navigate("/dashboard")
      }
    }
    authenticate()
  }, []);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    const user = {
      username: userName,
      email: email,
      password: password,
      mobile: mobile,
    };

    formData.append("user", new Blob([JSON.stringify(user)], { type: "application/json" }));
    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    if (response.status === 200) {
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 ">
      <div className="border-[2px] border-gray-300 dark:border-gray-600 w-[500px] h-fit lg:w-[400px] rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <div className="p-6 flex flex-col space-y-4 gap-5">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Sign Up
          </h2>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-4 mt-3 gap-5">
            <div className="w-full relative">
              <label
                htmlFor="name"
                className="absolute top-0 left-0 text-gray-700 dark:text-gray-300 font-medium mb-1 translate-y-[-100%]"
              >
                Username:
              </label>
              <input
                type="text"
                required
                name="name"
                id="name"
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 border-t-0 border"
              />
            </div>
            <div className="w-full relative">
              <label
                htmlFor="email"
                className="absolute top-0 left-0 text-gray-700 dark:text-gray-300 font-medium mb-1 translate-y-[-100%]"
              >
                Email:
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
            <div className="w-full relative">
              <label
                htmlFor="mobile"
                className="absolute top-0 left-0 text-gray-700 dark:text-gray-300 font-medium mb-1 translate-y-[-100%]"
              >
                Mobile:
              </label>
              <input
                type="text"
                required
                name="mobile"
                id="mobile"
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 border-t-0 border"
              />
            </div>
            <div className="w-full relative bg-white flex items-center gap-3  dark:text-gray-500  ">
              <div>
                <label
                  htmlFor="file"
                  className=" text-gray-700 dark:text-gray-500 font-medium mb-1 translate-y-[-100%] p-2 border mt-2"
                >
                  Upload
                </label>
                <input
                  type="file"
                  required
                  name="file"
                  id="file"
                  className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 border-t-0 border hidden"
                  onChange={handleImage}
                />
              </div>
              <div>
                {image && <img src={URL.createObjectURL(image)} alt="s" className="w-[50px] h-[50px] rounded-full" />}
              </div>
            </div>

            <div>
              <div className="text-center mt-4">
                <input
                  type="submit"
                  value="Sign Up"
                  className={`${isDark ? "bg-sky-700" : "bg-sky-700"} w-full h-[50px] rounded-full cursor-pointer text-black`}

                />
                <span className="block mt-2 text-sm text-gray-600">
                  Already have an account? <a href="/login" className="text-sky-500 hover:underline">Log in</a>
                </span>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
