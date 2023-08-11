import * as React from "react";
import fetchData from "./share/fetchData";
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
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./App.css";
import MuiAlert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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

const epoch2Date = (epoch) => {
  let date = new Date(epoch * 1000);
  return (
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":" +
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
  );
};

const Alert = React.forwardRef(function Alert(props1, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props1} />;
});

export default function PersistentDrawerLeft() {
  const { state } = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [misOrdenes, setMisOrdenes] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [historia, setHistoria] = useState([]);
  const [estructuraFormulario, setEstructuraFormulario] = useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);

  const uuid = state[0].resultado.idUsuario;

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleClickOpenDialog = (props) => {
    setOpenDialog(true);
    if (!props[0].notas) {
      setHistoria([]);
    } else {
      setHistoria(props);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogForm = () => {
    setOpenDialogForm(false);
  };

  React.useEffect(() => {
    const getMisOrdenesCreadas = async () => {
      let params = { idUsuario: uuid };
      const ordenesData = await fetchData.postDataPromise(
        "http://192.237.253.176:2850",
        "/reporte/obtenerRespuestasOrdenesCreadasPorIdUsuario",
        params,
        3000
      );
      const ordenes = await ordenesData.json();
      setMisOrdenes(JSON.parse(ordenes.resultado.listaOrdenes));
    };
    getMisOrdenesCreadas();
  }, []);

  const columns = [
    { field: "motivo", headerName: "MOTIVO ORDEN", width: 200 },
    {
      field: "usuarios",
      headerName: "USUARIO ASIGNADO",
      width: 170,
      valueGetter: (params) => params.row.usuarios.ejecutor.usuario,
    },
    {
      field: "fhCreacion",
      headerName: "FECHA",
      width: 130,
      valueGetter: (params) => {
        const unixTimestamp = params.row.fhCreacion;
        const date = new Date(unixTimestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
        return format(date, "yyyy-MM-dd");
      },
    },
    {
      field: "area",
      headerName: "ÁREA",
      width: 130,
      valueGetter: (params) => params.row.usuarios.ejecutor.area,
    },
    {
      field: "listaHistorias",
      headerName: "NOTAS",
      width: 80,
      /* renderCell: RenderNote,
        valueGetter: params => params.row.listaHistorias.notas */
      renderCell: (params) => (
        <Button
          onClick={() => handleClickOpenDialog(params.row.listaHistorias)}
        >
          <VisibilityIcon />
        </Button>
      ),
    },
    {
      field: "rptaOrden",
      headerName: "FORMULARIO",
      width: 110,
      valueGetter: (params) => params.row.rptaOrden,
      renderCell: (params) => (
        <Button
          onClick={() => handleClickOpenForm(JSON.parse(params.row.rptaOrden))}
        >
          <SummarizeIcon />
        </Button>
      ),
    },
  ];

  const getRowClassName = (params) => {
    let data = JSON.parse(params.row.rptaOrden);

    let valor = Array.isArray(data);

    if (valor == false) {
      return "it-row";
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOpenForm = (props) => {
    
    let valor = Array.isArray(props);
   

    if (valor == false) {
    
      setOpenDialogForm(true);
      setEstructuraFormulario(props);
   
    } else {
      const nuevoDiccionario = {};

      props.forEach(objeto => {
          const clave = Object.keys(objeto)[0];
          nuevoDiccionario[clave] = "null";
      });

      setOpenDialogForm(true);
      setEstructuraFormulario(nuevoDiccionario);
      setOpenAlert(true);
    }
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
            Mis Ordenes Creadas
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
      <Main
        open={open}
        sx={{
          flexDirection: "column-reverse",
          display: "flex",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
          height: "100vh",
          width: "auto",
          backgroundImage: `url("https://phonoteka.org/uploads/posts/2021-05/1620150863_37-phonoteka_org-p-fon-dlya-prezentatsii-neitralnii-minimaliz-39.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <DrawerHeader />
        <Box sx={{ height: 400, width: 1000 }}>
          <DataGrid
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(255,255,255,0.4)",
              backdropFilter: "blur(25px)",
              borderRadius: 7,
            }}
            rows={misOrdenes}
            getRowClassName={getRowClassName}
            getRowId={(row) => row.idOrden}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            //checkboxSelection
          />
        </Box>
      </Main>

      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "100vh",
              backgroundColor: "#E2EFF2",
            },
          },
        }}
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography
            variant="h5"
            align="center"
            sx={{ textDecoration: "underline" }}
          >
            HISTORIA TAREAS
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ backgroundColor: "#393636" }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#B3B8BD", width: 90 }}
                    align="center"
                  >
                    <b>Fecha</b>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#B3B8BD", display: "flex" }}
                    align="left"
                  >
                    <b>Notas</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historia.map((row) => (
                  <TableRow
                    key={row.nota}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ backgroundColor: "#B3B8BD" }}
                      align="center"
                    >
                      {epoch2Date(row.fhNota)}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#B3B8BD" }} align="left">
                      {row.notas}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "100vh",
              backgroundColor: "#E2EFF2",
            },
          },
        }}
        open={openDialogForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialogForm}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          <Typography variant="body1" align="left">
            FORMULARIO
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              rowGap: 3,
              p: 1,
            }}
          >
            {Object.entries(estructuraFormulario).map(([key, value]) => (
              <TextField
                id={key}
                label={key}
                value={value}
                variant="outlined"
                disabled
              />
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialogForm}>OK</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          No ha llenado el formulario aún.
        </Alert>
      </Snackbar>
    </Box>
  );
}
