import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  )
};


export default AuthLayout;