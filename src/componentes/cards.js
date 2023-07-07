import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Historia from './historia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Cards = (props) => {
    const {title, subtitle, updatedAt, estructuraFormulario, historia} = props
    const [ openHistoria, setOpenHistoria ] = useState(false)

    //console.log(title, subtitle, updatedAt, estructuraFormulario)
    const handlerOpenHistoria = () =>  {
        setOpenHistoria(false)
    }
    
    return (
        <>
        {openHistoria && <Historia {...{historia: historia, ...{handlerOpenHistoria: handlerOpenHistoria}}}/>}
        <Box sx={{display: 'flex', justifyContent: 'center', p: 1}}>
            <Card sx={{ width: '40vh', boxShadow: 2, cursor: 'pointer' }}>
                <CardContent sx={{p:'5px'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Motivo: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {title} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Asignado: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {subtitle} 
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            Fecha Inicio: 
                        </Typography>
                        <Typography sx={{ fontSize: '2vh' }} color="text.primary">
                            {updatedAt} 
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{p:'1px', justifyContent:"right"}}>
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