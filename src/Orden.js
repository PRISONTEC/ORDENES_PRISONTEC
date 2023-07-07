import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const nombrePlantilla = [
  {
    id: "1",
    idArea: "1",
    nombreForm: "MANTENIMIENTO",
    body: [
      {
        terminó: ""
      },
      {
        dificultad: ""
      }
    ],
  },
  {
    id: "2",
    idArea: "4",
    nombreForm: "REUNION",
    body: [
      {
        terminó: ""
      },
      {
        dificultad: ""
      }
    ],
  },
  {
    id: "3",
    idArea: "1",
    nombreForm: "CONSULTAS",
    body: [
      {
        terminó: ""
      },
      {
        dificultad: ""
      }
    ],
  },
  {
    id: "4",
    idArea: "1",
    nombreForm: "SERVICIOS",
    body: [
      {
        terminó: ""
      },
      {
        dificultad: ""
      }
    ],
  },
  {
    id: "5",
    idArea: "2",
    nombreForm: "MANTENIMIENTO",
    body: [
      {
        terminó: ""
      },
      {
        dificultad: ""
      }
    ],
  },
];

const usuarios = [
  {
    id: "1",
    nombreArea: "Pedro",
  },
  {
    id: "2",
    nombreArea: "Pablo",
  },
  {
    id: "3",
    nombreArea: "Lucia",
  },
  {
    id: "4",
    nombreArea: "Melissa",
  },
];

const Orden = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [nombreOrden, setNombreOrden] = useState("");
  const [nombreFormulario, setNombreFormulario] = useState(undefined);
  const [usuario, setUsuarios] = useState(undefined);
  const [registroOrden, setRegistroOrden] = useState([]);
  const [plantillaFiltrada, setPlantillaFiltrada] = useState([]);
  const { state } = useLocation();

  /*  const crearOrden = async () => {
    let params = idFormulario;
    let params1 = idCreador;
    let params2= idEjecutor;
    let params3= nombreOrden
      const myData = await FetchData.postDataPromise(
        "http://xxx.x.x.x:xxxx",
        "/crearOrden/orden?idFormulario=" +
          params +
          "&idCreador" +
          params1+
          "&idEjecutor"+
          params2+
          "&nombreOrden"+
          params3
      );
      const data = await myData.json();
      console.log("creando...", data);
      setRegistroOrden(data);
      alert("Se creó");
  }; 

  React.useEffect(()=>{
    const cargarFormularios = async () =>{
      const myData1= await FetchData.postDataPromise(
        "http://xxx.x.x.x:xxxx",
        "/crearOrden/orden?idFormulario=" +
          params +
          "&idCreador" +
          params1+
          "&idEjecutor"+
          params2+
          "&nombreOrden"+
          params3
      );
    }
  })
 */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    console.log("llega la data", state);
    if (state) {
      const filtrarPlantillas = () => {
        const filtrarArea = nombrePlantilla.filter(
          (a) => a.idArea === state.idArea
        );
        console.log(filtrarArea);
        setPlantillaFiltrada(filtrarArea);
      };
      filtrarPlantillas();
    }
  }, [state]);

  const revisar = () => {
    console.log("aqui", nombreFormulario);
    console.log(nombreOrden)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#5C5B5B" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Creación Orden de Trabajo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#393636",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Header />
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader/>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            height: "98vh",
            width: "auto",
            backgroundImage: `url("https://wallpapercave.com/wp/wp3589939.jpg")`,
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
              <TextField
                sx={{ width: 500 }}
                id="standard-basic"
                label="Ingrese el motivo de la Orden de Trabajo"
                variant="standard"
                onChange={(e) => setNombreOrden(e.target.value)}
              />
              <Typography sx={{ pt: 5 }}>Formulario: </Typography>
              <Box sx={{ pt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Plantilla
                  </InputLabel>
                  <Select
                    key={nombrePlantilla.id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nombreFormulario || ""}
                    label="Plantilla"
                    onChange={(e) => setNombreFormulario(e.target.value)}
                  >
                    {plantillaFiltrada &&
                      plantillaFiltrada.map((n) => (
                        <MenuItem value={n}>{n.nombreForm}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Typography sx={{ pt: 5 }}>Asignar a: </Typography>
              <Box sx={{ pt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                  <Select
                    key={usuarios.id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={usuario || ""}
                    label="Usuario"
                    onChange={(e) => setUsuarios(e.target.value)}
                  >
                    {usuarios.map((a) => (
                      <MenuItem value={a.nombreArea}>{a.nombreArea}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ pt: 6, justifyContent: "right", display: "flex" }}>
                <Fab variant="extended" onClick={revisar}>
                  <SaveIcon sx={{ mr: 1 }} />
                  Guardar
                </Fab>
              </Box>
            </Box>
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default Orden;
