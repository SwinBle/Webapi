'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
}

export default function AttractionPage({ params }: { params: { id: string } }) {
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAttraction() {
      try {
        const res = await fetch(`https://www.melivecode.com/api/attractions/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch attraction');
        }
        const result = await res.json();
        setAttraction(result.attraction);
      } catch (error) {
        console.error(error);
        setError('Failed to load attraction. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchAttraction();
  }, [params.id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!attraction) {
    return (
      <Container>
        <Typography align="center">Attraction not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button onClick={() => router.push('/')} sx={{ mb: 2 }}>
        Back to Home
      </Button>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={attraction.coverimage}
          alt={attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {attraction.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {attraction.detail}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
