import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import fetchData from "../share/fetchData";

const FormularioCierre = (props) => {
    const { items, ordenArrastrada, restartOrden, eventDrag, handlerEventDrag, handlerMostrarAlerta, getOrdenes } = props
    const [formularioCierre, setFormularioCierre] = useState(false)
    const [rptaFormulario, setRptaFormulario] = useState({});

    const [estructuraFormulario, setEstructuraFormulario] = useState(undefined)
    console.log("Mi Orden", ordenArrastrada)

    const getFormulario = async () => {
        let params = { idFormulario:  ordenArrastrada.idFormulario};
        const dataFormulario = await fetchData.postDataPromise (
            "http://192.237.253.176:2850",
            "/formulario/obtenerFormularioPorId", params, 3000
        );
        const miFormulario = await dataFormulario.json()
        console.log(JSON.parse(miFormulario.resultado.formulario)[0])
        setEstructuraFormulario(JSON.parse(miFormulario.resultado.formulario)[0])
    }

    useEffect(() => {getFormulario(); setFormularioCierre(true)}, [props])

    const llenarCampos = (evt, key) => {
        let constante = rptaFormulario;
        constante[key] = evt.target.value 
        setRptaFormulario(constante)
    }

    const cerrarIncidencia = async (idOrden, dataFormulario) => {
        let params = { id: idOrden, rptaOrden: JSON.stringify(dataFormulario) };
        console.log(idOrden, dataFormulario)
        const rptaCierre = await fetchData.postDataPromise (
            "http://192.237.253.176:2850",
            "/orden/cerrarOrden", params, 3000
        );
        const rpta = await rptaCierre.json()
    }

    const validarCampos = async () => {
        let keysFormulario = []
        let keysLlenadosForm = []
        // eslint-disable-next-line 
        JSON.parse(estructuraFormulario.body).map(field => {
            // eslint-disable-next-line 
            Object.entries(field).map(([key, value]) => {
                keysFormulario.push(key)
            })
        })

        console.log(rptaFormulario)

        for (let key in rptaFormulario) {
            if (!(rptaFormulario[key] === "" || rptaFormulario[key] === undefined)) {
                keysLlenadosForm.push(key)
            }
        }

        if (keysFormulario.length === keysLlenadosForm.length) {
            handlerEventDrag(eventDrag);
            handlerMostrarAlerta({success: true, error: false})
            await cerrarIncidencia(ordenArrastrada.id, rptaFormulario);   
            await getOrdenes()
        } else handlerMostrarAlerta({success: false, error: true})    
        setFormularioCierre(false);
        restartOrden();
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
            onClose={() => {setFormularioCierre(false); restartOrden(); }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                <Typography variant="body1" align="left">
                    LLENAR FORMULARIO
                </Typography>
                <Typography variant="h5" sx={{textDecoration: 'underline'}}>
                    {estructuraFormulario.nombre}
                </Typography>
            </DialogTitle>
            <DialogContent> 
                <Box sx={{display:"flex", flexDirection: "column", justifyContent:"center", rowGap: 3, p: 1}}>
                    {JSON.parse(estructuraFormulario.body).map(field => (
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
        }
        </>
    )
}

export default FormularioCierre