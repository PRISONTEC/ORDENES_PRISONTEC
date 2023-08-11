import { useEffect, useState } from "react";
import Alertas from './alertas';
import Box from "@mui/material/Box";
import Cards from "./cards";
import List from "./list";
import FormularioCierre from "./formularioCierre";
import Typography from "@mui/material/Typography";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Header from "../Header";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import fetchData from "../share/fetchData";
import {epoch2Date} from "../share/utils";

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

const MisOrdenes = () => {
  const ordenes = {
    asignadas: [
        {
            id: 1,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477",
            title: "What is Lorem Ipsum?",
            subtitle: "Lorem Ipsum is simply dummy",
            updatedAt: "6 days ago",
            estructuraFormulario: {nombreFormulario:"Mtto Preventivo", bodyFormulario:[{nombre:""},{apellidos: ""}, {cargo: ""}]},
            historia: [{nota: "something related to somebody", fechaHora: 1688401083, usuario: "Pedrito"},
              {nota: "something related to everybody", fechaHora: 1688401083, usuario: "Gustavo"},
              {nota: "someone calling you", fechaHora: 1688401083, usuario: "Miguel"},
              {nota: "better call saul", fechaHora: 1688401083, usuario: "Maribel"},
              {nota: "breaking bad", fechaHora: 1688401083, usuario: "Cielo"},
              {nota: "El marginal", fechaHora: 1688401083, usuario: "Ricardo"},
              {nota: "i dont know", fechaHora: 1688401083, usuario: "Oscar"},
              {nota: "oaskfpoafi0afkaslñdkasñdka{sdal{sdlñ", fechaHora: 1688401083, usuario: "Diego"}]
          },
          {
            id: 2,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
            title: "Why do we use it?",
            subtitle: "The point of using at its layout",
            updatedAt: "2 days ago",
            estructuraFormulario: {nombreFormulario:"Resp Social RS", bodyFormulario:[{nombre:""},{apellidos: ""}, {cargo: ""}]},
            historia: [{nota: "aaaaaaaaaaaaaaaaaaaa", fechaHora: 1688401083, usuario: "Pedrito"},
              {nota: "bbbbbbbbbbbbbbbbbvv", fechaHora: 1688401083, usuario: "Anastacio"},
              {nota: "cccccccccccccccc", fechaHora: 1688401083, usuario: "Pancracio"},
              {nota: "dddddddddddddddd", fechaHora: 1688401083, usuario: "Sulfitico"},
              {nota: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", fechaHora: 1688401083, usuario: "Pedrito"},
              {nota: "oooooooooooooooooooooooooooooooooooooooo", fechaHora: 1688401083, usuario: "Yupanqui"},
              {nota: "añlsdkañlskdalsifao´scklaskpásdkápsda´sdk", fechaHora: 1688401083, usuario: "Rigoberto"},
              {nota: "añlskfoasfka.mcñlaskda´sd{lasdlañsdlasdpoasfóf", fechaHora: 1688401083, usuario: "Pancracio"}]
          },
          {
            id: 3,
            uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449",
            title: "Where does it come from?",
            subtitle: "Contrary to popular belief, Lorem Ipsum is not simply",
            updatedAt: "3 days ago",
            estructuraFormulario: {nombreFormulario:"Ingenieria Mtto BQ", bodyFormulario:[{nombre:""},{apellidos: ""}, {cargo: ""}]},
            historia: [{nota: "", fechaHora: 1688401083, usuario: "Pedrito"},
              {nota: "klahsfña{sf", fechaHora: 1688401083, usuario: "Juanito"},
              {nota: "ñakfslkc{csc", fechaHora: 1688401083, usuario: "Pancracio"},
              {nota: "ñauifpaifa´psdoapsdo", fechaHora: 1688401083, usuario: "Rigoberto"},
              {nota: "opauvjopsdmvdcd", fechaHora: 1688401083, usuario: "Yupanqui"},
              {nota: "akshja´sdpi¿a0wq0was", fechaHora: 1688401083, usuario: "Anastacio"},
              {nota: "alncasncaposjda´sdapsdoas´dpoas´pdo", fechaHora: 1688401083, usuario: "Crenatino"},
              {nota: "añkjas´fia´sidpalsdka´sodiasodaksñodiasdoáñsldkó", fechaHora: 1688401083, usuario: "Sulfitico"}]
          },
    ],
    realizadas: [
    ],
  };

  //const [items, setItems] = useState(ordenes);
  const [llenoFormularioCierre, setLlenoFormularioCierre] = useState(false);
  const [ordenArrastrada, setOrdenArrastrada] = useState(undefined);
  const [dragEvent, setDragEvent] = useState(undefined);
  const [lanzarAlertas, setLanzarAlertas] = useState({success: false, error: false});
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { state } = useLocation();
  const [dataState, setDataState]=useState([])
  const [usuarios, setUsuarios] = useState(undefined);
  const [historias, setHistorias] = useState([]);
  const [ordenesReales, setOrdenesReales] = useState(undefined)
  const [items, setItems] = useState(undefined);

  //const ordenesA = JSON.parse(state[0].resultado.tareasAsignadas).filter((orden) => orden.fhFin === null)
  //const ordenesR = JSON.parse(state[0].resultado.tareasAsignadas).filter((orden) => orden.fhFin !== null)
  //console.log(ordenesA)
  //const ordenesX = {asignadas: [...ordenesA], realizadas: [...ordenesR]}

  const idUsuario = state[0].resultado.idUsuario
  const ordenesX = JSON.parse(state[0].resultado.tareasAsignadas)
  const miIDArea = state[0].resultado.idArea
  const nombreUsuario = state[1]

  const getUsuarios = async () => {
    const dataUsuarios = await fetchData.getDataPromise (
      "http://192.237.253.176:2850",
      "/usuario/obtenerUsuario", 3000
    );
    const usuarios = await dataUsuarios.json();
    setUsuarios(JSON.parse(usuarios.resultado.usuarios))
  }

  const getOrdenes = async () => {
    let params = { idUsuario:  idUsuario};
    const ordenesData = await fetchData.postDataPromise (
      "http://192.237.253.176:2850",
      "/orden/obtenerOrdenesPorIdUsuario", params, 3000
    );
    const ordenes = await ordenesData.json();
    console.log(JSON.parse(ordenes.resultado.tareasAsignadas))
    setOrdenesReales(JSON.parse(ordenes.resultado.tareasAsignadas))
  }

  const getHistorias = async (id) => {
    let params = { idHistoria:  id};
    const dataHistoria = await fetchData.postDataPromise (
      "http://192.237.253.176:2850",
      "/historia/obtenerHistoriaPorId", params, 3000
    );
    const historiasData = await dataHistoria.json();
    if (historiasData.resultado.historia !== null) {
      setHistorias (historiasData.resultado.historia);
    }
  }

  useEffect(() => {
    getUsuarios()
    getOrdenes()
  }, [])

  useEffect(() => {
    if (usuarios && ordenesReales) {
      // obtener los nombre de los usuarios a partir de su uuid
      for(let i=0; i<ordenesReales.length; i++) {
        for(let j=0; j<usuarios.length; j++) {
          if (ordenesReales[i].idCreador === usuarios[j].uuid) {
            ordenesReales[i].asignadoPor = usuarios[j].usuario
            ordenesReales[i].fhCreacionDate = epoch2Date(ordenesReales[i].fhCreacion)
            ordenesReales[i].fhFinDate = epoch2Date(ordenesReales[i].fhFin)
            break;
          }
        }
      }
      const asignadas = ordenesReales.filter(orden => orden.fhFin === null)
      const realizadas = ordenesReales.filter(orden => orden.fhFin !== null)
      const tmpOrdenesReales = {asignadas: asignadas, realizadas: realizadas}
      //console.log({ordenes: tmpOrdenesReales})
      setItems(tmpOrdenesReales)
    }
  }, [usuarios, ordenesReales])

  //useEffect(() => {console.log(items)}, [items])

  const enviarState = ()=>{
    setDataState(state)
  }
  
  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const actualizarOrdenes = (result) => {
    const listCopy = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setItems(listCopy);
  };

  const handleLlenarFormulario = () => {
    setLlenoFormularioCierre(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    setDragEvent(result);
    const isPermitted =
      result.destination.droppableId === "realizadas" ? true : false;

    if (isPermitted) {
      setOrdenArrastrada(items[result.source.droppableId][result.source.index]);
    } else {
      return;
    }
  };

  const handlerMostrarAlerta = (tipo) => {
    setLanzarAlertas(tipo)
  }

  const handlerReiniciarEstadoAlertas = () => {
    setLanzarAlertas({success: false, error: false})
  }

  const handleRestartOrdenArrastrada = () => {
    setOrdenArrastrada(undefined);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            PRINCIPAL
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
        <Header enviarState={dataState}/>
        <Divider />
      </Drawer>
      <Main open={open}>
        {ordenArrastrada && (
          <FormularioCierre
            {...{
              ordenArrastrada: ordenArrastrada,
              items: items,
              ...{
                restartOrden: handleRestartOrdenArrastrada,
                eventDrag: dragEvent,
                handlerEventDrag: actualizarOrdenes,
                handlerMostrarAlerta: handlerMostrarAlerta,
                getOrdenes: getOrdenes
              },
            }}
          />
        )}
        {lanzarAlertas.success && (
        <Alertas
          msg={"Ha completado su orden"}
          severity={"success"}
          handlerReiniciarEstadoAlertas={handlerReiniciarEstadoAlertas}
        />
      )}
      {lanzarAlertas.error && (
        <Alertas
          msg={"Campos vacios"}
          severity={"error"}
          handlerReiniciarEstadoAlertas={handlerReiniciarEstadoAlertas}
        />
      )}
        <Box
          sx={{
            backgroundImage:`url("https://phonoteka.org/uploads/posts/2021-05/1620150863_37-phonoteka_org-p-fon-dlya-prezentatsii-neitralnii-minimaliz-39.jpg")`,
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            columnGap: 10,
            pl: 40,
            pt: 15,
            justifyContent: "center",
          }}
        >
        
          <DragDropContext onDragEnd={onDragEnd}>
            <List
              onDragEnd={onDragEnd}
              name="asignadas"
              title="TAREAS PENDIENTES"
            >
              {items &&
              items.asignadas.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id + ""}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Cards {...{...item, myItem:item, nombreUsuario: nombreUsuario}} />
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
            <List
              onDragEnd={onDragEnd}
              name="realizadas"
              title="TAREAS REALIZADAS"
            >
              {items &&
              items.realizadas.map((item, index) => (
                <Draggable key={item.id} draggableId={item.uuid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Cards {...{...item, myItem:item, nombreUsuario: nombreUsuario}} />
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
          </DragDropContext>
        
        </Box>
      </Main>
    </>
  );
};

export default MisOrdenes;
