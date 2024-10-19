'use client'; // Add this line at the top

import React, { useState, useEffect } from 'react';
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
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
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
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        setError('Failed to load attractions. Please try again later.');
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
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TravelTech
          </Typography>
          {!isMobile && (
            <TextField
              variant="outlined"
              placeholder="Search attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: <SearchIcon />,
                style: { backgroundColor: 'white', borderRadius: '4px' },
              }}
            />
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {isMobile && (
          <TextField
            variant="outlined"
            placeholder="Search attractions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredData.map((a: Attraction) => (
              <Grid item xs={12} sm={6} md={4} key={a.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={a.coverimage}
                    alt={a.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {a.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
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
