import Box from "@mui/material/Box";
import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/joy/Chip";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/joy/Avatar";

const usuarios = [
  {
    id: '1',
    nombre: 'Maribel Huaman',
    idArea: '1',
  },
  {
    id: '2',
    nombre: 'Pedro Perez',
    idArea: '2'
  },
  {
    id: '3',
    nombre: 'Lucia Caceres',
    idArea: '3'
  }
]

const style = {
  width: "100%",
  maxWidth: 360,
  color: "white",
};

function Header() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#393636",
      }}
    >
      <Box sx={{ display: "flex"}}>
        <Chip
        label="Chip Filled"
          color="neutral"
          size="lg"
          startDecorator={<Avatar size="sm" />}
          endDecorator={<CheckIcon fontSize="sm" />}
          onClick={() => alert("CERRANDO SESIÓN")}
        >
          {usuarios[0].nombre}
        </Chip>
      </Box>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="PRINCIPAL" onClick={() => navigate("/")} />
        </ListItem>
        <Divider color="white" />
        <ListItem button onClick={() => navigate("/formulario",{state: usuarios[0]})}>
          <ListItemText primary="CREAR FORMULARIO" />
        </ListItem>
        <Divider color="white" />
        <ListItem button divider onClick={() => navigate("/orden",{state: usuarios[0]})}>
          <ListItemText primary="CREAR ORDEN" />
        </ListItem>
        <Divider color="white" />
      </List>
    </Box>
  );
}

export default Header;