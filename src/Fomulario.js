import * as React from "react";
import FetchData from "./share/fetchData";
import { styled, useTheme } from "@mui/material/styles";
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
import alertasForm from "./alertasForm"
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
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

function Formulario() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [textFields, setTextFields] = useState([]);
  const [preguntasAlmacenadas, setPreguntasAlmacenadas] = useState([]);
  const [pregunta, setPreguntas] = useState([]);
  const [inputList, setInputList] = useState([{}]);
  const [respuesta, setRespuesta] = useState("");
  const [nombreFormulario, setNombreFormulario] = useState("");
  const [area, setAreas] = useState([]);
  const [registroFormulario, setRegistroFormulario] = useState([]);
  const [id, setID] = useState("");
  const [newInput, setNewInput] = useState([]);
  const [turnOn, setTurnOn] = useState(false);
  const [buttonGuardar, setButtonGuardar] = useState(true);
  const [dataState, setDataState] = useState([]);
  const { state } = useLocation();
  
  const enviarState = () => {
    setDataState(state[0].resultado.idArea);
  };

  const crearFormulario = async () => {
    let params = {
      idArea: state[0].resultado.idArea,
      nombreFormulario: nombreFormulario,
      bodyFormulario: JSON.stringify(inputList),
    };
    const myData = await FetchData.postDataPromise(
      "http://192.237.253.176:2850",
      "/formulario/crearFormulario",
      params,
      3000
    );
    const data = await myData.json();
    console.log("se creó el formulario!", data);
    setRegistroFormulario(data);
    alert("Se creó");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleEliminar = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAgregar = () => {
    setButtonGuardar(false);
    setInputList([...inputList, { pregunta: "" }]);
    console.log(inputList);
  };

  const guardar = () => {
    setTurnOn(true);
    for (let i = 0; i < inputList.length; i++) {
      let obj = inputList[i];
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let value = obj[key];
          delete obj[key];
          obj[value] = "";
        }
      }
    }
    const last = inputList.pop();
    setInputList(inputList);
    crearFormulario();
  };

  /*   const addTextField = () => {
    if (count === 1 || pregunta.length === count - 1) {
      setCount(Math.max(count + 1, 0));
      setTextFields([
        ...textFields,
        <Box sx={{ display: "flex", pt: 1 }}>
          <TextField
            onChange={(e) => setPreguntas([...pregunta, e.target.value])}
            sx={{ width: 500 }}
            label={"Pregunta " + count}
          />
          <Button onClick={removeTextField}>x</Button>
        </Box>,
      ]);
    } else {
      alert("Ingrese la pregunta");
      return;
    }

    if (pregunta.length > 0) {
      let jsonArray = [];

      for (let i = 0; i < pregunta.length; i++) {
        let json = {};
        json[pregunta[i]] = respuesta;
        jsonArray.push(json);
      }
      console.log("preguntas", jsonArray);
      setPreguntasAlmacenadas(jsonArray);
    }
  };

  const removeTextField = (i) => {
    const textInput = [...textFields];
    textInput.splice(i, 0);
    setTextFields(textInput);
    console.log(textFields);
  };
 */
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
            Creación de Formulario
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
            height: "100vh",
            width: "auto",
            backgroundImage: `url("https://phonoteka.org/uploads/posts/2021-05/1620150863_37-phonoteka_org-p-fon-dlya-prezentatsii-neitralnii-minimaliz-39.jpg")`,
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
                    : "rgba(0, 0, 0, 0.19)",
                backdropFilter: "blur(40px)",
                maxHeight: 650,
                overflow: "auto",
              }}
            >
              <TextField
                sx={{ width: 500 }}
                disabled={turnOn}
                id="standard-basic"
                label="Ingrese el nombre de la plantilla"
                variant="standard"
                onChange={(e) => setNombreFormulario(e.target.value)}
              />
              <Typography sx={{ pt: 5 }}>Cuestionario: </Typography>
              {inputList.map((x, i) => {
                return (
                  <Box>
                    <Box>
                      <TextField
                        multiline
                        maxRows={4}
                        disabled={turnOn}
                        sx={{ width: 450 }}
                        name="pregunta"
                        value={x.pregunta}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      {inputList.length !== 1 && (
                        <Button
                          disabled={turnOn}
                          onClick={() => handleEliminar(i)}
                        >
                          <DeleteIcon sx={{ color: "black" }} />
                        </Button>
                      )}
                    </Box>
                    <Box sx={{ pt: 2 }}>
                      {inputList.length - 1 === i && (
                        <Button
                          disabled={turnOn}
                          sx={{ width: 450 }}
                          variant="contained"
                          onClick={handleAgregar}
                        >
                          AGREGAR
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })}
              <Box sx={{ pt: 6, justifyContent: "right", display: "flex" }}>
                <Fab disabled={turnOn} variant="extended" onClick={guardar}>
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
}

export default Formulario;
