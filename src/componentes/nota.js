import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Nota = (props) => {
    const { handlerCerrarNota, addNota } = props
    const [ openNota, setOpenNota ] = useState(true)
    const [nota, setNota] = useState(undefined)

    return (
        
        <Dialog
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "60vh",  
                        backgroundColor: "#E2EFF2",
                    },
                },
            }}
            open={openNota}
            onClose={() => {setOpenNota(false); handlerCerrarNota()}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h5" align="center" sx={{textDecoration: 'underline'}}>
                    NOTA
                </Typography>
            </DialogTitle>
            <DialogContent> 
                <Box
                    sx={{
                        display:"flex",
                        justifyContent:"center",
                        pt: 3,
                        width: 500,
                        maxWidth: '100%',
                    }}
                    >
                    <TextField fullWidth multiline label="Nota" id="Nota" onChange={(evt) => {setNota(evt.target.value)}}/>
                </Box>

                <Box sx={{display:"flex", justifyContent: "right", pt: 5}}>
                    <Button onClick={() => {addNota(nota); handlerCerrarNota()}}
                        sx={{backgroundColor: "#687DB2", borderRadius: 35}} variant="contained">
                        GUARDAR
                    </Button> 
                    
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Nota