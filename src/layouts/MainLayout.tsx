import React from 'react';
import Navbar from '../components/NavBar';
import Container from '@mui/material/Container';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>{children}</Container>
        </>
    );
};

export default MainLayout;
