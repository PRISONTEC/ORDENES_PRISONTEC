import { useState, useEffect } from 'react';
import Alertas from './alertas';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import Nota from './nota';

const Historia = (props) => {
    const { historia, handlerOpenHistoria } = props
    const [ openHistoria, setOpenHistoria ] = useState(true)
    const [ openNota, setOpenNota ] = useState(false)
    const [ nuevaHistoria, setNuevoHistoria ] = useState(historia)
    const [lanzarAlertas, setLanzarAlertas] = useState({success: false, error: false});

    useEffect(() => {setOpenHistoria(true)}, [props])

    const epoch2Date = (epoch) => {
        let date = new Date(epoch*1000)
        return (
            (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + "/" + 
            ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))  + "/" + 
            date.getFullYear() + " " + 
            (date.getHours() < 10 ? '0' + date.getHours(): date.getHours()) + ":" + 
            (date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()) + ":" +  
            (date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds())
        )
    }

    const handlerCerrarNota = () => {
        setOpenNota(false)
    }

    const addNota = (nota) => {
        if (nota && nota !== "") {
            setNuevoHistoria([...nuevaHistoria, {nota: nota, fechaHora: (Date.now() / 1000), usuario: "Educinho"}])
            setLanzarAlertas({success: true, error: false})
        }
        else {
            setLanzarAlertas({success: false, error: true})
        }
    }

    const handlerReiniciarEstadoAlertas = () => {
        setLanzarAlertas({success: false, error: false})
    }

    return (
        <>
        {openNota && <Nota {...{handlerCerrarNota, addNota}}/>}
        { lanzarAlertas.success && 
            <Alertas msg={"Nota Guardada"} severity={"success"} handlerReiniciarEstadoAlertas={handlerReiniciarEstadoAlertas}/> 
        }
        { lanzarAlertas.error && 
            <Alertas msg={"Campos vacios"} severity={"error"} handlerReiniciarEstadoAlertas={handlerReiniciarEstadoAlertas}/> 
        }
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
            open={openHistoria}
            onClose={() => {setOpenHistoria(false); handlerOpenHistoria()}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h5" align="center" sx={{textDecoration: 'underline'}}>
                    HISTORIA TAREAS
                </Typography>
            </DialogTitle>
            <DialogContent> 
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3} sx={{backgroundColor: "#393636"}}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{backgroundColor: "#B3B8BD"}} align="center"><b>Fecha</b></TableCell>
                                <TableCell sx={{backgroundColor: "#B3B8BD"}} align="center"><b>Usuario</b></TableCell>
                                <TableCell sx={{backgroundColor: "#B3B8BD"}} align="center"><b>Notas</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {nuevaHistoria.map((row) => (
                            <TableRow
                            key={row.nota}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell sx={{backgroundColor: "#B3B8BD"}} align="left">{epoch2Date(row.fechaHora)}</TableCell>
                            <TableCell sx={{backgroundColor: "#B3B8BD"}} align="left">{row.usuario}</TableCell>
                            <TableCell sx={{backgroundColor: "#B3B8BD"}} align="left">{row.nota}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{display:"flex", justifyContent: "space-around", pt: 5}}>
                    <Button onClick={() => {setOpenNota(true)}}
                        sx={{backgroundColor: "#477916", borderRadius: 35}} variant="contained">
                        AGREGAR NOTA
                    </Button> 
                </Box>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Historia