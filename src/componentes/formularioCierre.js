import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const FormularioCierre = (props) => {
    const { restartOrden, eventDrag, handlerEventDrag, estructuraFormulario, handlerMostrarAlerta } = props
    const [formularioCierre, setFormularioCierre] = useState(false)
    const [rptaFormulario, setRptaFormulario] = useState({});

    useEffect(() => {setFormularioCierre(true)}, [props])

    const llenarCampos = (evt, key) => {
        let constante = rptaFormulario;
        constante[key] = evt.target.value 
        setRptaFormulario(constante)
    }

    const validarCampos = () => {
        let keysFormulario = []
        let keysLlenadosForm = []
        // eslint-disable-next-line 
        estructuraFormulario.bodyFormulario.map(field => {
            // eslint-disable-next-line 
            Object.entries(field).map(([key, value]) => {
                keysFormulario.push(key)
            })
        })

        for (let key in rptaFormulario) {
            if (!(rptaFormulario[key] === "" || rptaFormulario[key] === undefined)) {
                keysLlenadosForm.push(key)
            }
        }

        if (keysFormulario.length === keysLlenadosForm.length) {
            handlerEventDrag(eventDrag);
            handlerMostrarAlerta({success: true, error: false})   
        } else handlerMostrarAlerta({success: false, error: true})    
        setFormularioCierre(false);
        restartOrden();
    }

    return (
        <>
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
            onClose={() => {setFormularioCierre(false); restartOrden(); }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                <Typography variant="body1" align="left">
                    LLENAR FORMULARIO
                </Typography>
                <Typography variant="h5" sx={{textDecoration: 'underline'}}>
                    {estructuraFormulario.nombreFormulario}
                </Typography>
            </DialogTitle>
            <DialogContent> 
                <Box sx={{display:"flex", flexDirection: "column", justifyContent:"center", rowGap: 3, p: 1}}>
                    {estructuraFormulario.bodyFormulario.map(field => (
                        Object.entries(field).map(([key, value]) => (
                            <TextField onChange={(evt) => {llenarCampos(evt, key)}} 
                                id={key} label={key} variant="outlined" required />
                        ))
                    ))
                    }
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'right', pt: 5}}>
                    <Button onClick={() => validarCampos() }
                        variant="contained" sx={{backgroundColor: "#687DB2", borderRadius: 5}}>
                        GUARDAR
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default FormularioCierre