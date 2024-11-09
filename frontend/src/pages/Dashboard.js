import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            const emailName = currentUser.email.split('@')[0].split('.')[0];
            const welcomeMessage = `🌟Welcome to your Dashboard, ${emailName}😊 `;
            let currentIndex = 0;
            let typingSpeed = 100;
            let typingInterval;

            const typeEffect = () => {
                if (currentIndex < welcomeMessage.length) {
                    setTypedMessage((prev) => prev + welcomeMessage[currentIndex]);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            };

            setTypedMessage(''); 
            typingInterval = setInterval(typeEffect, typingSpeed);

            return () => {
                clearInterval(typingInterval);
            };
        }
    }, [currentUser]);

    const handleReportClick = () => {
        navigate('/report'); 
    };

    return (
        <Box 
            className="dashboard-background" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                padding: '20px', 
                textAlign: 'center' 
            }}
        >
            <div>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="bubble"></div>
                ))}
            </div>

            <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                    color: '#f4f26c', 
                    marginBottom: 2, 
                    fontWeight: 'bold', 
                    fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' } 
                }}
            >
                {typedMessage}
            </Typography>

            <Button
                variant="contained" 
                color="primary" 
                onClick={handleReportClick} 
                sx={{ 
                    mt: 2, 
                    backgroundColor: '#f4f26c', 
                    '&:hover': {
                        backgroundColor: '#357ABD' 
                    },
                    padding: '10px 20px', 
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    color: '#000000',
                    width: '100%', 
                    maxWidth: '200px'
                }}
            >
                Report
            </Button>
        </Box>
    );
};

export default Dashboard;
