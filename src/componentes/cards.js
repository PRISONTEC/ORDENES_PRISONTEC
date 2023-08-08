import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Historia from './historia';
import MyFormularioCierre from './checkFormularioInc';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';

import fetchData from "../share/fetchData";

const Cards = (props) => {
    const { id, motivo, asignadoPor, idFormulario, fhCreacionDate, fhFin, fhFinDate, myItem, nombreUsuario } = props
    const [ historia, setHistoria ] = useState([])
    const [ openHistoria, setOpenHistoria ] = useState(false)
    const [ openFormulario, setOpenFormulario ] = useState(false)

    const handlerOpenHistoria = () =>  {
        setOpenHistoria(false)
    }

    const handlerOpenFormularioCierre = () =>  {
        setOpenFormulario(false)
    }

    const getHistoria = async () => {
        let params = { idOrden:  id};
        const dataHistoria = await fetchData.postDataPromise (
            "http://192.237.253.176:2850",
            "/historia/obtenerHistoriaPorIdOrden", params, 3000
        );
        const miHistoria = await dataHistoria.json()
        console.log("trayendo historias: ", id, miHistoria.resultado.historia)
        if (JSON.parse(miHistoria.resultado.historia) !== null ) 
            setHistoria(JSON.parse(miHistoria.resultado.historia))
        else 
            setHistoria([])
    }

    useEffect(() => {
        getHistoria()
    }, [])
    
    return (
        <>
        {openHistoria && <Historia {...{myItem: myItem, nombreUsuario: nombreUsuario, historia: historia, setHistoria: setHistoria, ...{handlerOpenHistoria: handlerOpenHistoria}}}/>}
        {openFormulario && <MyFormularioCierre {...{myItem: myItem, handlerOpenFormularioCierre: handlerOpenFormularioCierre}} />}
        <Box sx={{display: 'flex', justifyContent: 'center', p: 1}}>
            <Card sx={{ width: '40vh', boxShadow: 2, cursor: 'pointer' }}>
                <CardContent sx={{p:'5px'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Motivo: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {motivo} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Asign Por: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {asignadoPor} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Fecha Inicio: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {fhCreacionDate} 
                        </Typography>
                    </Box>
                    { fhFin !== null && 
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Fecha Fin: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {fhFinDate} 
                        </Typography>
                    </Box>
                    }
                </CardContent>
                <CardActions sx={{p:'1px', justifyContent:"right"}}>
                    { fhFin !== null && 
                    <IconButton onClick={() => setOpenFormulario(true)} sx={{display: 'flex'}}>
                        <AssignmentIcon/>
                    </IconButton>
                    }
                    <IconButton onClick={() => setOpenHistoria(true)} sx={{display: 'flex'}}>
                        <VisibilityIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
        </>
    )
}

export default Cards;