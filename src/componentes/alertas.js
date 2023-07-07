import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alertas = (props) => {
    const [open, setOpen] = useState(true);
    const { msg, severity, handlerReiniciarEstadoAlertas } = props

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setOpen(false)
        handlerReiniciarEstadoAlertas()
    };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default Alertas;