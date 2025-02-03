import React,{useState} from 'react';
import { Box ,Button} from '@mui/material'; // Make sure Box is imported from MUI
import UploadModel from './UploadModel';

const Navbar = () => {
    const[open,setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
        refreshData();
    }
    return (
        <Box    
            sx={{
                color: 'white', // White text
                height: '4rem', // Adjusted height for visibility
                width: '100%', // Full width
                display: 'flex',
                alignItems: 'center', // Center the text vertically
                justifyContent: "space-around", // Center the text horizontally
                fontSize: '2rem', // Set font size
            }}>
            <Box>
                Compüt Labs
            </Box>
            <Button sx={{fontSize:'1.2rem'}} onClick={handleOpen}>
                Upload Image
            </Button>

            <UploadModel open={open} handleClose={handleClose}/>
        </Box>
    );
}

export default Navbar;
