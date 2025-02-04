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
            setImage(null); // Reset the image when opening the modal (if editing)
        } else {
            setTitle('');
            setDescription('');
            setImage(null); // Reset image if creating a new post
        }
    }, [imageId, imageData, open]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };
    const handleSave = async () => {
        const formData = new FormData();

        // Only append title if it has changed
        if (title !== (imageData?.title || '')) {
            formData.append('title', title);
        }

        // Only append description if it has changed
        if (description !== (imageData?.description || '')) {
            formData.append('description', description);
        }

        // Append the new image if it's been changed
        if (image) {
            formData.append('image', image);
        } else if (imageData?.image) {
            // If the image hasn't changed, add the existing image URL (or file identifier)
            formData.append('image', imageData.image);
        }

        try {
            let response;
            const API_BASE_URL = import.meta.env.VITE_API_URL; // Use environment variable
        
            if (imageId) {
                // Update existing post
                response = await axios.put(
                    `${API_BASE_URL}/posts/${imageId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            } else {
                // Create new post
                response = await axios.post(
                    `${API_BASE_URL}/posts`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }
        
            // Clear fields after success
            setTitle('');
            setDescription('');
            setImage(null);
        
            // Show success message
            setSnackbarMessage('Image uploaded successfully!');
            setOpenSnackbar(true);
        
            // Close modal
            handleClose();
        } catch (error) {
            console.error('Error saving image:', error);
        
            // Show error message
            setSnackbarMessage('Failed to upload image.');
            setOpenSnackbar(true);
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
                                color: 'white',
                                backgroundColor: 'black',
                            },
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
                                '& .MuiInputBase-input': {
                                    color: 'white',
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
