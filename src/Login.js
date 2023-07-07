import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";


export default function BoxSx() {
  const theme = useTheme();
  return (
    //BOX PRINCIPAL
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "auto",
        backgroundImage: `url("https://media-exp1.licdn.com/dms/image/C511BAQELESHF0a6xIQ/company-background_10000/0/1561700447433?e=2147483647&v=beta&t=H9YQS_N_Yt6k1SUsk-sRFLxsCSUgUgjxjayHH8Ao4jg")`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            p: 2,
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
          <Box sx={{height: 150}}>
          </Box>
          <FormControl variant="standard">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 4,
                flexDirection: "column",
              }}
            >
              <Typography>Usuario:</Typography>
              <Input
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
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
                <Button
                  sx={{ p: 2, pl: 3, pr: 3, borderRadius: 7, boxShadow: 10 }}
                  variant="contained"
                >
                  Ingresar
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
