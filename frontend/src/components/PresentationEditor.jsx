import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditTitleModal from './EditTitleModal';
import handleEditTitle from './HandleEditTitle';
import handleDelete from './HandleDelete';
import { fetchPresentations } from './FetchPresentation';
import SlidePresentation from './SlidePresentation';
import { Button, Typography, CircularProgress, Box } from '@mui/material';

const PresentationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchPresentations(id, token, setPresentation, navigate, setLoading);
  }, [id, navigate, token]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  }

  if (!presentation) {
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography>Presentation not found or could not be loaded.</Typography></Box>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: 2 }} onClick={() => setEditTitleOpen(true)}>
        <span style={{ marginRight: '10px' }}>➡️</span> {/* Replacing the icon with a Unicode arrow */}
        Editing Presentation: {presentation.presentationName}
      </Typography>
      <EditTitleModal
        isOpen={editTitleOpen}
        initialTitle={presentation.presentationName}
        onSave={(newTitle) => handleEditTitle(id, token, newTitle, presentation, setPresentation, navigate)}
        onClose={() => setEditTitleOpen(false)}
      />
      <SlidePresentation
        id={id}
        token={token}
        presentation={presentation}
        setPresentation={setPresentation}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <Box sx={{ position: 'fixed', bottom: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        <Button variant="contained" color="error" onClick={() => handleDelete(id, token, navigate)}>
          Delete Presentation
        </Button>
      </Box>
    </Box>
  );
};

export default PresentationEditor;
