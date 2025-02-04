import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import UploadModel from './UploadModel';

const ImageComponent = ({ imageData, refreshTrigger, setRefreshTrigger }) => {
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imageDataState, setImageDataState] = useState(null);

  const handleDelete = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL; // Use environment variable

      const response = await axios.delete(`${API_BASE_URL}/posts/${imageData._id}`);
      console.log("Delete successful", response.data);

      // Alert for successful delete
      alert('Image successfully deleted.');

      // Trigger re-fetch after delete
      setRefreshTrigger(!refreshTrigger); // Toggle refresh trigger to re-fetch data
    } catch (error) {
      console.error("Error deleting post", error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleOpenUpdate = (id, data) => {
    setImageId(id);
    setImageDataState(data);
    setOpen(true); // Open the modal when the "Update" button is clicked
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: 'black',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column', // Stack the content vertically
        position: 'relative',
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: '70%', // Image takes up 70% of the box height
          backgroundImage: imageData.image
            ? `url(${import.meta.env.VITE_API_URL}${imageData.image})`
            : 'url(/placeholder.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px 8px 0 0', // Round the top corners of the image
        }}
      />


      {/* Content Section */}
      <Box
        sx={{
          height: '30%', // Content section takes up the remaining 30% space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center content vertically
          padding: 2,
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ color: 'white', marginBottom: 1 }}>
          {imageData.title || "Untitled"}
        </Typography>

        {/* Description */}
        <Typography variant="body2" sx={{ color: 'white', marginBottom: 2 }}>
          {imageData.description || "No description available."}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            sx={{ color: 'white' }}
            onClick={() => handleOpenUpdate(imageData._id, imageData)}
          >
            Update
          </Button>
          <Button
            size="small"
            sx={{ color: 'red' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <UploadModel
        open={open}
        handleClose={() => setOpen(false)}
        imageId={imageId}
        imageData={imageDataState}
      />
    </Box>


  );
};

export default ImageComponent;
