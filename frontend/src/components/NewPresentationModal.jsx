import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Typography, Box } from '@mui/material';
import handleCreatePresentation from './createPresentation'; // Import the new function

const NewPresentationModal = ({ onCreate, onClose }) => {
  const [presentationName, setPresentationName] = useState('');
  // This function wraps the imported handleCreatePresentation with the current state and props
  const handleCreate = async (e) => {
    e.preventDefault();
    await handleCreatePresentation(presentationName, onCreate, onClose);
  };

  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
      <Box component="form" onSubmit={handleCreate} sx={{ minWidth: 300 }}>
        <DialogContent>
          <Typography variant="h6">Create New Presentation</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Presentation Name"
            type="text"
            fullWidth
            value={presentationName}
            onChange={e => setPresentationName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default NewPresentationModal;
