import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { updateBackgroundInSlide } from './HandleBackgroundOperations';

const BackgroundSettingsModal = ({ id, token, slideId, presentation, setPresentation, open, onClose }) => {
  const [color, setColor] = useState('#FFFFFF');
  const [applyToAll, setApplyToAll] = useState(false);

  const handleSubmit = async () => {
    const background = `${color}`; // Example to handle gradient
    await updateBackgroundInSlide(id, token, slideId, background, presentation, setPresentation, applyToAll);
    onClose();
    handleClose();
  };

  const handleClose = () => {
    setApplyToAll(false);
    setColor('#FFFFFF')
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, border: '2px solid #000', boxShadow: 24 }}>
        <Typography variant="h6" component="h2">Set Background</Typography>
        <TextField
          fullWidth
          label="Solid Color (Hex)"
          value={color}
          onChange={e => setColor(e.target.value)}
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Apply To</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="current"
            onChange={(e) => setApplyToAll(e.target.value === 'all')}
          >
            <FormControlLabel value="current" control={<Radio />} label="Current Slide" />
            <FormControlLabel value="all" control={<Radio />} label="All Slides" />
          </RadioGroup>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" color="primary">Apply</Button>
      </Box>
    </Modal>
  );
};

export default BackgroundSettingsModal;
