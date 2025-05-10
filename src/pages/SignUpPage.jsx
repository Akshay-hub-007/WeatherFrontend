import SignUp from '@/auth/SignUp'
import React, { useEffect } from 'react'

function SignUpPage() {
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);
  return (
     <SignUp/>
  )
}

export default SignUpPage