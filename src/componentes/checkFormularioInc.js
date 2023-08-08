import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import fetchData from "../share/fetchData";

const MyFormularioCierre = (props) => {

    const { myItem, handlerOpenFormularioCierre } = props;
    const [ estructuraFormulario, setEstructuraFormulario ] = useState(undefined)
    const [ formularioCierre, setFormularioCierre ] = useState(false)

    useEffect(() => {getFormulario(); setFormularioCierre(true)}, [props])

    const getFormulario = async () => {
        setEstructuraFormulario(myItem.rptaOrden)
    }

    return (
        <>
        {estructuraFormulario && 
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
            open={formularioCierre}
            onClose={() => { setFormularioCierre(false); handlerOpenFormularioCierre() }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                <Typography variant="body1" align="left">
                    FORMULARIO COMPLETADO
                </Typography>
                <Typography variant="h5" sx={{textDecoration: 'underline'}}>
                    {estructuraFormulario.nombre}
                </Typography>
            </DialogTitle>
            <DialogContent> 
                <Box sx={{display:"flex", flexDirection: "column", justifyContent:"center", rowGap: 3, p: 1}}>
                    {Object.entries(JSON.parse(estructuraFormulario)).map(([key, value]) => (
                        <TextField  
                            id={key} label={key} value = {value} variant="outlined" disabled />
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
        }
        </>
    )
}

export default MyFormularioCierre