import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';
import { updateTextInSlide } from './HandleTextOperations';
import { v4 as uuidv4 } from 'uuid';

const CodeInsertModal = ({ id, token, slideId, presentation, setPresentation, isEditing, pageKey, openModal, setOpenModal, setIsEditing }) => {
  const [code, setCode] = useState('');
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('50');
  const [fontSize, setFontSize] = useState('1em');
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  const handleClose = () => {
    setOpenModal(false);
    setCode('');
    setWidth('50');
    setHeight('50');
    setX('0');
    setY('0');
    setFontSize('1em');
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const contentId = isEditing ? pageKey : 'Code' + uuidv4();
    const codeData = {
      code,
      width,
      height,
      fontSize,
      x,
      y
    };

    try {
      await updateTextInSlide(id, token, slideId, { [contentId]: codeData }, presentation, setPresentation);
      handleClose();
    } catch (error) {
      console.error('Failed to add/update image:', error);
      alert('Failed to add/update image to slide.');
    }
  };

  return (
    <div>
        <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Typography id="modal-title" variant="h6">{isEditing ? 'Edit Code Block' : 'Add Code Block'}</Typography>
            <TextField
                fullWidth
                label="Code"
                multiline
                rows={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                margin="normal"
            />
            <TextField fullWidth label="Font Size (em)" value={fontSize} onChange={(e) => setFontSize(e.target.value)} margin="normal" />
            <TextField fullWidth label="Width (%)" value={width} onChange={(e) => setWidth(e.target.value)} margin="normal" />
            <TextField fullWidth label="Height (%)" value={height} onChange={(e) => setHeight(e.target.value)} margin="normal" />
            {isEditing && (
            <>
                <TextField
                fullWidth
                label="Position X (%)"
                value={x}
                onChange={(e) => setX(e.target.value)}
                margin="normal"
                />
                <TextField
                fullWidth
                label="Position Y (%)"
                value={y}
                onChange={(e) => setY(e.target.value)}
                margin="normal"
                />
            </>
            )}
            <Button onClick={handleSubmit} color="primary">Submit</Button>
        </Box>
        </Modal>
    </div>
  );
};

export default CodeInsertModal;
