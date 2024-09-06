import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/auth';
import { Routes } from './Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer position='bottom-center' theme='dark'/>
    </BrowserRouter>
  </React.StrictMode>,
);
