import React, {useEffect} from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

import Orden from "./Orden";
import Formulario from "./Fomulario";
import MisOrdenes from "./componentes/misOrdenes";
import Login from "./Login"

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is the first load by seeing if our object exists in local storage
    if (localStorage.getItem('firstLoadDone') === null) {
      // If it's the first load, set the flag in local storage to true and reload the page
      localStorage.setItem('firstLoadDone', 1);
    } else {
      navigate("/")
    }
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/orden" element={<Orden />} />
        <Route path="/formulario" element={<Formulario/>} />
        <Route path="/misOrdenes" element={<MisOrdenes/>} />
      </Routes>
  );
}
