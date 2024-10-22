import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SlideNavigator = ({ currentIndex, totalSlides, onNavigate }) => {
  // Handle key press events
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      onNavigate(currentIndex - 1); // Navigate to previous slide
    } else if (event.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
      onNavigate(currentIndex + 1); // Navigate to next slide
    }
  };

  // Add and remove event listener for key presses
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, totalSlides, onNavigate]); // Dependencies

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '0 10px' }}>
      {currentIndex > 0 && (
        <Button
          variant="contained"
          onClick={() => onNavigate(currentIndex - 1)}
          sx={{ width: '100px' }}
        >
          ◀ Prev
        </Button>
      )}
      {currentIndex < totalSlides - 1 && (
        <Button
          variant="contained"
          onClick={() => onNavigate(currentIndex + 1)}
          sx={{ width: '100px' }}
        >
          Next ▶
        </Button>
      )}
    </Box>
  );
};

export default SlideNavigator;
