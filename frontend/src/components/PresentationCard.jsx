import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PresentationCard = ({ presentation }) => {
  const navigate = useNavigate();

  const CustomCard = styled(Card)(({ theme }) => ({
    maxWidth: 290, // Limiting width
    margin: theme.spacing(1), // Using theme spacing for consistent margins
    backgroundColor: '#FFF9C4' // Light yellow background
  }));

  const handleOpenPresentation = () => {
    navigate(`/presentation/${presentation.id}`);
  };

  return (
    <CustomCard>
      <CardActionArea onClick={handleOpenPresentation}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {presentation.name}
          </Typography>
          {presentation.thumbnail
            ? (
            <Box component="img" sx={{ height: 140, width: '100%', objectFit: 'cover' }} src={presentation.thumbnail} alt="Thumbnail" />
              )
            : (
            <Box sx={{ height: 80, width: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography>No Thumbnail</Typography>
            </Box>
              )}
          <Typography variant="body2" color="textSecondary">
            {presentation.description || 'No Description'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {presentation.slides} Slides
          </Typography>
        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
};

export default PresentationCard;
