import { React, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import ShowBox from './Components/ShowBox'
import { Box, Typography, Grid } from "@mui/material";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);  // Update state to trigger re-fetch
  };


  return (
    <>
      <div>
        <Box>
          <Navbar refreshData={refreshData} />
          <ShowBox refreshTrigger={refreshTrigger} />
        </Box>
      </div>

    </>
  )
}

export default App
