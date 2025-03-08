import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Memorial from "./pages/Memorial";
import About from "./pages/About"
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormPage from "./pages/FormPage";
import ProgramPage from "./pages/ProgramPage";

const App = () =>{
  return(
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/events" element={<Events/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/memorial" element={<Memorial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<FormPage />}/>
        <Route path="/program" element={<ProgramPage />}/>

      </Routes>

    </Router>
  );
};

export default App;