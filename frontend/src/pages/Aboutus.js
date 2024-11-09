import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const AboutUs = () => {
    const navigate = useNavigate();
    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {
        const welcomeMessage = "🌟Welcome to the About Us page! 😊";
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
    }, []);

    const handleDashboardClick = () => {
        navigate('/dashboard');
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

            <Container maxWidth="md" sx={{ marginBottom: 4 }}>
                <Typography 
                    variant="body1" 
                    align="center" 
                    sx={{ 
                        color: '#ffffff', 
                        marginBottom: 1, 
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' }, 
                        lineHeight: 1.5,
                    }}
                >
                    At Campus Metrics Maestro, we are dedicated to providing the best service for our users, creating a platform that connects people and enhances their experience. We are passionate about empowering our college community through data-driven insights, transforming the way faculty and students engage with events and activities. By leveraging cutting-edge business intelligence tools, our user-friendly interface allows effortless monitoring of attendance, evaluation of engagement levels, and collection of feedback to ensure every event is a success. Join us on our journey to revolutionize event management at our college, unlocking the potential of data and building a vibrant community that thrives on connection and collaboration!
                </Typography>
            </Container>

            <Button
                variant="contained" 
                color="primary" 
                onClick={handleDashboardClick} 
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
                Go to Login Page
            </Button>
        </Box>
    );
};

export default AboutUs;
