import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { FormGroup, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FetchData from "./share/fetchData";
import { useNavigate } from "react-router-dom";

export default function BoxSx() {
  const theme = useTheme();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [dataUsuario, setDataUsuario] = useState([]);
  const navigate = useNavigate();

  const validarUsuario = async () => {
    console.log("que llega?", nombreUsuario, password);
    let params = { usuario: nombreUsuario, contrasena: password };

    const myData = await FetchData.postDataPromise(
      "http://192.237.253.176:2850",
      "/usuario/validarUsuario",
      params,
      3000
    );
    const data = await myData.json();
    if (data["respuesta"] !== "KO") {
      setDataUsuario(data);
      navigate("/misOrdenes", { state: [data, nombreUsuario] });
    } else {
      alert("DATOS INVÁLIDOS");
      return;
    }
    /*   if (data === undefined) {
      alert('No hay data')
    } else {
      setDataUsuario(data);
      alert('ingresó!')
      navigate("/misOrdenes", { state: [data] });
    } */
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeNombreUsuario = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    //BOX PRINCIPAL
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url("https://media-exp1.licdn.com/dms/image/C511BAQELESHF0a6xIQ/company-background_10000/0/1561700447433?e=2147483647&v=beta&t=H9YQS_N_Yt6k1SUsk-sRFLxsCSUgUgjxjayHH8Ao4jg")`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "auto",
            p: 2,
            width: 300,
            boxShadow: 5,
            borderRadius: 5,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.6)"
                : "rgba(255,255,255,0.4)",
            backdropFilter: "blur(40px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
            <Typography variant="h4" gutterBottom>
              AGENDA
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom>
              PRISONTEC
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{
                display: "flex",
                justifyContent: "center",
                width: 450,
                height: 100,
              }}
              alt="Remy Sharp"
              src="/imagen/logop.png"
            />
          </Box>
          <FormGroup variant="standard">
            <Box
              sx={{
                display: "flex",
                p: 4,
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Usuario:</Typography>
              <Input
                onChange={handleChangeNombreUsuario}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  pt: 3,
                }}
              >
                <Typography>Contraseña:</Typography>
                <Input
                  onChange={handleChangePassword}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
                  <Button
                    sx={{ p: 2, pl: 3, pr: 3, borderRadius: 7, boxShadow: 10 }}
                    variant="contained"
                    onClick={validarUsuario}
                  >
                    Ingresar
                  </Button>
                </Box>
              </Box>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
