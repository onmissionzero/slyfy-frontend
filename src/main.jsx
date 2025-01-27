import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'; // I guess SSR is necessary for this to work (window title still works tho so I guess I might keep it)

import Layout from './Layout';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Home from './pages/Home';
import Faq from './pages/Faq';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

import { ProfileProvider } from "./contexts/profile";
import { PlayerProvider } from "./contexts/player";

import './index.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
      <Route index element={<Home />} />
      <Route path="faq" element={<Faq />} />
      <Route path="stats" element={<Stats />} />
      <Route path="login" element={<Login />} />
      <Route path="callback" element={<Callback />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
      <ProfileProvider>
        <PlayerProvider>
          <RouterProvider router={router} />
        </PlayerProvider>
      </ProfileProvider>
    </HelmetProvider>
)