import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Room1 from './components/room1';
import Room2 from './components/room2';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room1" element={<Room1 />} />
          <Route path="/room2" element={<Room2 />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default App;
