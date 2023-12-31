import * as React from "react";
import FetchData from "./share/fetchData";
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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const drawerWidth = 240;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        terminó: "",
      },
      {
        dificultad: "",
      },
    ],
  },
  {
    id: "2",
    idArea: "4",
    nombreForm: "REUNION",
    body: [
      {
        terminó: "",
      },
      {
        dificultad: "",
      },
    ],
  },
  {
    id: "3",
    idArea: "1",
    nombreForm: "CONSULTAS",
    body: [
      {
        terminó: "",
      },
      {
        dificultad: "",
      },
    ],
  },
  {
    id: "4",
    idArea: "1",
    nombreForm: "SERVICIOS",
    body: [
      {
        terminó: "",
      },
      {
        dificultad: "",
      },
    ],
  },
  {
    id: "5",
    idArea: "2",
    nombreForm: "MANTENIMIENTO",
    body: [
      {
        terminó: "",
      },
      {
        dificultad: "",
      },
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
  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [nombreOrden, setNombreOrden] = useState("");
  const [nombreFormulario, setNombreFormulario] = useState("");
  const [usuarios, setUsuarios] = useState("");
  const [dataFormulario, setDataFormulario] = useState([]);
  const [registroOrden, setRegistroOrden] = useState([]);
  const [plantillaFiltrada, setPlantillaFiltrada] = useState([]);
  const [usuariosData, setUsuariosData] = useState([]);
  const [dataState, setDataState] = useState([]);
  const[idUsuario, setIdUsuario]=useState([]);
  const { state } = useLocation();

  const enviarState = () => {
    setDataState(state);
  };

  const crearOrden = async () => {
    let params ={idFormulario:nombreFormulario.id, idCreador:idUsuario, idEjecutor:usuarios.uuid, rptaOrden: nombreFormulario.body, motivo: nombreOrden}
  
    const myData = await FetchData.postDataPromise(
        "http://192.237.253.176:2850",
        "/orden/crearOrden",params,3000
      );
      const data = await myData.json();
      setRegistroOrden(data);
      setOpenAlert(true)
      setNombreOrden("")
      setNombreFormulario("")
      setUsuarios("")
  }; 

  React.useEffect(() => {
    setIdUsuario(state[0].resultado.idUsuario)
    let params = { idArea: state[0].resultado.idArea };
    const getFormulario = async () => {
      const myData = await FetchData.postDataPromise(
        "http://192.237.253.176:2850",
        "/formulario/obtenerFormulario",
        params,
        3000
      );
      const data = await myData.json();
      const parse = JSON.parse(data.resultado.formularios);
      setDataFormulario(parse);
    };

    const getUsuarios = async () => {
      const myDataUsuario = await FetchData.getDataPromise(
        "http://192.237.253.176:2850",
        "/usuario/obtenerUsuario"
      );
      const dataUsuario = await myDataUsuario.json();
      const parse1 = JSON.parse(dataUsuario.resultado.usuarios);
      setUsuariosData(parse1);
    };
    getUsuarios();
    getFormulario();
  }, []);

  /*   React.useEffect(() => {
    const getUsuarios = async () => {
      const myDataUsuario = await FetchData.getDataPromise(
        "http://192.237.253.176:2850",
        "/usuario/obtenerUsuario"
      );
      const dataUsuario = await myDataUsuario.json();
      const parse1=JSON.parse(dataUsuario.resultado.usuarios)
      console.log('todos los Usuarios',parse1)
      setUsuariosData('usuarios:',parse1);
    };
    getUsuarios();
  }, []); */

  /* React.useEffect(() => {
    console.log("llega la data", state);
    if (state && dataFormulario) {
      const filtrarPlantillas = () => {
        const filtrarArea = nombrePlantilla.filter(
          (a) => a.idArea === state.idArea
        );
        console.log(filtrarArea);
        setPlantillaFiltrada(filtrarArea);
      };
      filtrarPlantillas();
    }
  }, [state]); */

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };  
  /* const revisar = () => {
    console.log("aqui", nombreFormulario);
    console.log(nombreOrden)
  }; */

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
        <Header enviarState={dataState} />
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
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
                    key={nombreFormulario}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nombreFormulario || ""}
                    label="Plantilla"
                    onChange={(e) => setNombreFormulario(e.target.value)}
                  >
                    {dataFormulario &&
                      dataFormulario.map((n) => (
                        <MenuItem value={n}>{n.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Typography sx={{ pt: 5 }}>Asignar a: </Typography>
              <Box sx={{ pt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                  <Select
                    key={usuarios}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={usuarios || ""}
                    label="Usuario"
                    onChange={(e) => setUsuarios(e.target.value)}
                  >
                    {usuariosData &&
                      usuariosData.map((a) => (
                        <MenuItem value={a}>{a.usuario}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ pt: 6, justifyContent: "right", display: "flex" }}>
                <Fab variant="extended"  onClick={crearOrden}>
                  <SaveIcon sx={{ mr: 1 }} />
                  Guardar
                </Fab>
              </Box>
            </Box>
          </Box>
        </Box>
      </Main>

      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Se creó la orden.
        </Alert>
      </Snackbar>                 

    </Box>
  );
};

export default Orden;
