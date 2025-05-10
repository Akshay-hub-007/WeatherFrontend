import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUp from './auth/SignUp'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'sonner'
import History from './pages/history'
// import Chat from './components/Chat'
function App() {


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='dark'>
            <Layout>
              <Routes>
                <Route path='/' element={<LandingPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route
                  path="/dashboard"
                  element={<WeatherDashboard /> }
                />
                <Route
                  path="/city/:cityName"
                  element={ <CityPage />  }
                />
                <Route
                  path="/ProfilePage"
                  element={ <ProfilePage />  }
                />
                <Route
                  path="/history"
                  element={ <History />  }
                />
                 <Route
                  path="/profile"
                  element={ <ProfilePage />  }
                />
              </Routes>
            </Layout>
            <Toaster richColors/>
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />

      </QueryClientProvider>

    </>
  )
}

export default App
