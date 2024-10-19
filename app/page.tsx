'use client'; // Add this line at the top

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Modal,
  Box,
} from '@mui/material';
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

interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
}

export default function Page() {
  const [data, setData] = useState<Attraction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://www.melivecode.com/api/attractions');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredData = data.filter((a: Attraction) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleCloseModal = () => {
    setSelectedAttraction(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" style={{ padding: '40px 0' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
          }}
        >
          <Typography variant="h4" component="h1">
            Discover Attractions
          </Typography>
          <div>
            <TextField
              variant="outlined"
              placeholder="Search attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            {/* <Button variant="contained" color="primary">
              Website Tour
            </Button> */}
          </div>
        </header>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {filteredData.map((a: Attraction) => (
              <Grid item xs={12} md={4} key={a.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={a.coverimage}
                    title={a.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {a.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {a.detail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpenModal(a)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Modal
          open={!!selectedAttraction}
          onClose={handleCloseModal}
          aria-labelledby="attraction-modal-title"
          aria-describedby="attraction-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedAttraction && (
              <>
                <Typography
                  id="attraction-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {selectedAttraction.name}
                </Typography>
                <Typography id="attraction-modal-description" sx={{ mt: 2 }}>
                  {selectedAttraction.detail}
                </Typography>
                <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
