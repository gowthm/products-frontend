import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import PublicRoute from './authLayout/publicRoute';
import PrivateRoute from './authLayout/privateRoute';
import { getPrivateRoutes, getPublicRoutes } from './constants/routerLayout';
import Loader from './components/loader/loader';
import Navbar from './components/header/header';


function App() {
  return (
    <div className="">
      <Suspense fallback={<Loader />}>
        <Navbar/>
        <Routes>
          <Route element={<PublicRoute />}>{getPublicRoutes()}</Route>
          <Route element={<PrivateRoute />}>{getPrivateRoutes()}</Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
