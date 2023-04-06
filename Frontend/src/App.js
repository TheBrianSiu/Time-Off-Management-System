import "./App.css";
import React from 'react';
import './index.css';
import Nav from './Pages/Nav/Nav';
import Recordview from './Pages/View/Recordview';
import Calview from './Pages/View/Calview';
import Create from './Pages/Create/Create';
import Submit from './Pages/Submit/Submit';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Empview from "./Pages/View/Empview";

function App() {
  return (
    <BrowserRouter>
     <Nav/>
      <Routes>
          <Route path='/' element={<Recordview/>} />
          <Route path="/calview" element={<Calview/>} />
          <Route path="viewpfo" element={<Empview/>} />
          <Route path="submitpto" element={<Submit/>} />
          <Route path="addemp" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
