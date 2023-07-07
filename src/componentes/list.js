import React from "react";
import Box from '@mui/material/Box';
import {Droppable} from "react-beautiful-dnd";
import Typography from '@mui/material/Typography';

const List = ({ children, name, title }) => {
    return (
        <div className="">
          <Droppable droppableId={name}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <Box sx={{flexDirection: 'column',  justifyContent: 'center', overflow: 'scroll',
                  width: '50vh', boxShadow: 3, height: '70vh', borderRadius: 3, 
                  backgroundColor: '#393636', p: 2}}>
                  <Typography sx={{ display:'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '2vh', 
                      color: '#FEFCFC' }} color="text.primary">
                      {title}
                  </Typography>
                  {children}
                  {provided.placeholder}
                </Box>
              </div>
            )}
          </Droppable>
        </div>
    );
};

export default List;
