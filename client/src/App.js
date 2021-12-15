import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default App;
