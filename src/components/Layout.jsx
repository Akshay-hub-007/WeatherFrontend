import React, { useEffect } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
    const navigate=useNavigate()
  
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            {/* {window.location.pathname == "/login" ? <></> : <Header />} */}
            <Header/>
            <main className='min-h-screen container mx-auto px-4 py-8'>
                {children}
            </main>
            {window.location.pathname == "/login" ? <></> : <footer className='border-t backdrop-blur py-1 supports-[backdrop-filter]:bg-background/60'>
                <div className='container mx-auto px-4 text-center text-gray-400'>
                    <p>Copy right</p>
                </div>
            </footer>}

        </div>
    )
}

export default Layout