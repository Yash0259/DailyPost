import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import ImageComponent from "./ImageComponent";

const ShowBox = () => {
    const [imageData, setImageData] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger refresh

    const fetchImages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/posts");
            setImageData(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchImages(); // Fetch on mount

        const interval = setInterval(fetchImages, 2000); // Fetch every 2 seconds

        return () => clearInterval(interval); // Cleanup when unmounted
    }, [refreshTrigger]); // Also fetch if refreshTrigger updates

    return (
        <Box sx={{ m: 3, maxHeight: "100vh", overflowY: "auto", height: '85vh' }}>
            {imageData && imageData.length > 0 ? (
                <Grid
                    container
                    spacing={1} // Decreased spacing between grid items
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row by default (for large screens)
                        gap: '1px', // smaller gap between items
                        height: '100%', // Use full height of the container
                        '@media (max-width: 1024px)': {
                            gridTemplateColumns: 'repeat(2, 1fr)', // 2 items per row (vertical tablet screens)
                        },
                        '@media (max-width: 600px)': {
                            gridTemplateColumns: '1fr', // 1 item per row (mobile)
                        },
                    }}
                >
                    {imageData.map((image) => (
                        <Grid
                            item
                            key={image._id}
                            sx={{
                                m: 1, mb: 3,
                                p: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px', // Reduced padding around the card
                                '&:hover': {
                                    transform: 'scale(1.05)', // Slight scale effect on hover
                                    transition: 'transform 0.3s ease', // Smooth transition
                                },
                                height: '100%', // Ensure each grid item uses full available height
                            }}
                        >
                            <ImageComponent
                                sx={{  height: '100%' }} // Make sure ImageComponent fills the height
                                imageData={image}
                                refreshTrigger={refreshTrigger}
                                setRefreshTrigger={setRefreshTrigger}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" color="white">
                    No Images
                </Typography>
            )}
        </Box>

    );
};

export default ShowBox;
