import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

import { ProfileProvider } from "./contexts/profile";
import CallbackHandler from './utils/CallbackHandler';

import './index.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound/>} >
      <Route path="" element={<Home />} />
      <Route path="faq" element={<Faq />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
      <Route path="callback" element={<CallbackHandler />} />
      <Route path="error" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </HelmetProvider>
  </React.StrictMode>
)