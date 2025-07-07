import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './Router/router.jsx';
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './Contexts/AuthContexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastClassName="!text-lg !text-center"
        />
      </AuthProvider>
    </div>
  </StrictMode>,
)
