import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Auth } from "./Components/Auth";

import Home from "./Components/Home";

import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
        <Container>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/applied" element={<h1>Applied</h1>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
