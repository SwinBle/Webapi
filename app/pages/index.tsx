"use client";

import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ padding: '40px 0' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Our Startup
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Innovating the Future
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Get Started
          </Button>
        </header>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/feature1.jpg"
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 1
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description of feature 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/feature2.jpg"
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 2
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description of feature 2.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/images/feature3.jpg"
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 3
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description of feature 3.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
