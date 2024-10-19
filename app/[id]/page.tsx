import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface myParams {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const res = await fetch(`https://melivecode.com/api/attractions/` + id);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({ params }: myParams) {
  const data = await getData(params.id);
  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia
          component="img"
          image={data.attraction.coverimage}
          title={data.attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.attraction.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.attraction.detail}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
