import React, { useState, useEffect } from 'react';
import PresentationCard from './PresentationCard';
import NewPresentationModal from './NewPresentationModal';
import AddPresentationToDashboard from './AddPresentationToDashboard'; // Import the new hook
import { Button, Grid, Container } from '@mui/material';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { presentations, addPresentation } = AddPresentationToDashboard(); // Use the hook

  // Effect to load presentations when the component mounts
  useEffect(() => {
    addPresentation();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Container>
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
            New Presentation
        </Button>
        {isModalOpen && (
            <NewPresentationModal
                onCreate={addPresentation}
                onClose={() => setIsModalOpen(false)}
            />
        )}
        <Grid container spacing={2} style={{ paddingTop: '20px' }}>
          {presentations.map(presentation => (
                <Grid item xs={12} sm={6} md={4} key={presentation.id}>
                    <PresentationCard presentation={presentation} />
                </Grid>
          ))}
        </Grid>
    </Container>
  );
};

export default Dashboard;
