import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Firlogin from './component/firlogin';
import Login from './component/login';
import Register from './component/register';
import Mainpage from './component/Mainpage';
import Mealinfo from './component/Mealinfo';
import Recipe from './component/recipe';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Firlogin />} />
        <Route path="/f" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ae" element={<Mainpage />} />
        <Route path="/recipe" element={<Recipe />} />
       <Route path="/meal/:id" element={<Mealinfo />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
