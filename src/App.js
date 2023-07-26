import React from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

import Orden from "./Orden";
import Formulario from "./Fomulario";
import MisOrdenes from "./componentes/misOrdenes";
import Login from "./Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/orden" element={<Orden />} />
        <Route path="/formulario" element={<Formulario/>} />
        <Route path="/misOrdenes" element={<MisOrdenes/>} />
      </Routes>
    </BrowserRouter>
  );
}
