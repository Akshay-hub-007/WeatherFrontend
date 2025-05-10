import { useTheme } from '@/context/theme-provider'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from "../assets/rainy-day.png"
import { Badge, CircleUserRound, Moon, PiggyBank, Sun } from 'lucide-react';
import { Button } from './ui/button';
import CitySearch from './city-search';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import axios from 'axios';

function Header() {

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark"
  const [isLogged, setIsLogged] = useState(false)
  const navigate=useNavigate()
  localStorage.setItem("isDark", isDark)
  useEffect(() => {
    document.title = 'Sign in';
    async function authenticate() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/isLogged`, {
          withCredentials: true
        })
        if (response.status == 200) {
          setIsLogged(true)
        }
        console.log(isLogged)
        console.log(response)
      } catch (error) {
        setIsLogged(false)
      }
    }
    authenticate()
  }, []);
const clearJwtCookie = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logoout`, {
    withCredentials: true, 
  });
  console.log(response);
  navigate("/");
};


  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={"/"}>
          <img src={icon} alt="" className='w-[50px] h-[50px]' />
        </Link>
        <div className="flex items-center gap-4">
          {isLogged && <Link to="/dashboard" className="text-sky-700 hover:text-sky-900">
            Dashboard
          </Link>}
          <Link to="/" className="text-sky-700 hover:text-sky-900">

          </Link>
          {!isLogged && <Button asChild variant="default">
            <Link to="/login">Sign In</Link>
          </Button>}

          <div className='flex gap-4 items-center'>
            {isLogged && <CitySearch />}
            <div onClick={() => setTheme(isDark ? "white" : "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>{
              isDark ?
                <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />
                : <Moon className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />}
            </div>
            <div >

              {isLogged && <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleUserRound className='w-7 h-7' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isLogged && <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>}
                  <DropdownMenuItem asChild>
                    <Link to="/history">History</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <div className='font-lg font-bold flex items-center p-2 space-x-1'>
                      <PiggyBank className="text-yellow-500 w-8 h-8" />
                      <span className="text-gray-700">Coins</span>
                      <div className="ml-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        10
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearJwtCookie} >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>}

            </div>
          </div>
        </div>

      </div>


    </header>
  )
}

export default Header