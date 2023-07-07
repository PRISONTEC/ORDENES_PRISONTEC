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

  const [items, setItems] = useState(ordenes);
  const [llenoFormularioCierre, setLlenoFormularioCierre] = useState(false);
  const [ordenArrastrada, setOrdenArrastrada] = useState(undefined);
  const [dragEvent, setDragEvent] = useState(undefined);
  const [lanzarAlertas, setLanzarAlertas] = useState({success: false, error: false});
  const [open, setOpen] = useState(false);
  const theme = useTheme();
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
    console.log("entro por aca");
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
        <Header />
        <Divider />
      </Drawer>
      <Main open={open}>
        {ordenArrastrada && (
          <FormularioCierre
            {...{
              ...ordenArrastrada,
              ...{
                restartOrden: handleRestartOrdenArrastrada,
                eventDrag: dragEvent,
                handlerEventDrag: actualizarOrdenes,
                handlerMostrarAlerta: handlerMostrarAlerta,
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
              {items.asignadas.map((item, index) => (
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
                      <Cards {...item} />
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
              {items.realizadas.map((item, index) => (
                <Draggable key={item.id} draggableId={item.uuid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Cards {...item} />
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
