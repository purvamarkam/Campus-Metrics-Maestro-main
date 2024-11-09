import React from 'react';
import { Box } from '@mui/material';
import './Report.css'; 

const Report = () => {
  return (
    <Box className="report-background"> {
      
    }
      <iframe
        title="Report"
        src="/minipro.html" 
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </Box>
  );
};

export default Report;
