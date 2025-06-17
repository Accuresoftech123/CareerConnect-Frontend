import "./App.css";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmailVerificationPopup from "./Components/EmailVerification";
import React from "react";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/EmailVerification" element={<EmailVerificationPopup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
