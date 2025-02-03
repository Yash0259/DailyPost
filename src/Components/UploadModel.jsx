import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Snackbar } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    color: 'white',
    border: '2px solid #444',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

const UploadModel = ({ open, handleClose, imageId, imageData }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (imageId && imageData) {
            setTitle(imageData.title || '');
            setDescription(imageData.description || '');
        } else {
            setTitle('');
            setDescription('');
            setImage(null); // Reset the image
        }
    }, [imageId, imageData, open]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSave = async () => {
        const formData = new FormData();

        if (title !== (imageData?.title || '')) {
            formData.append('title', title);
        }

        if (description !== (imageData?.description || '')) {
            formData.append('description', description);
        }

        if (image) {
            formData.append('image', image);
        }

        try {
            let response;
            if (imageId) {
                response = await axios.put(
                    `http://localhost:5000/posts/${imageId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            } else {
                response = await axios.post('http://localhost:5000/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            setTitle('');
            setDescription('');
            setImage(null);

            // Show Snackbar message on success
            setSnackbarMessage('Image uploaded successfully!');
            setOpenSnackbar(true);

            handleClose();
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style, color: 'white' }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>Upload an Image</Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ color: 'white' }}
                    />
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            mt: 2,
                            input: { color: 'white' },
                            label: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{
                            mt: 2,
                            input: {
                                color: 'white', // Set the text color to white
                                backgroundColor: 'black', // Set background color of the input field
                            },
                            label: { color: 'white' }, // Set label color to white
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Set border color to white
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Set border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Set border color when focused
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white', // Override dynamically generated class and set text color to white
                                },
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ color: 'white' }}>
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </>
    );
};

export default UploadModel;
