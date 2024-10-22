import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { updateTextInSlide } from './HandleTextOperations';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TextInsertModal = ({ id, token, slideId, presentation, setPresentation, isEditing, pageKey, openModal, setOpenModal, setIsEditing }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('1em');
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('50');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  const handleClose = () => {
    setOpenModal(false);
    setText('');
    setFontSize('1em');
    setColor('#000000');
    setWidth('50');
    setHeight('50');
    setX('0');
    setY('0');
    setFontFamily('Arial');
    setIsEditing(false);
  }

  const handleSubmit = async () => {
    const contentId = isEditing ? pageKey : 'Text' + uuidv4();
    const textData = {
      text,
      fontSize,
      color,
      width,
      height,
      fontFamily,
      x,
      y
    };

    try {
      await updateTextInSlide(id, token, slideId, { [contentId]: textData }, presentation, setPresentation);
      handleClose();
    } catch (error) {
      console.error('Failed to add text:', error);
      alert('Failed to add text to slide.');
    }
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6">
            {isEditing ? 'Edit Text' : 'Add Text to Slide'}
          </Typography>
          <TextField
            fullWidth
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Font Size (em)"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="TextArea Width (%)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="TextArea Height (%)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            margin="normal"
          />
          {isEditing && (
            <>
              <TextField
                fullWidth
                label="Font Family"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                margin="normal"
              />
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
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TextInsertModal;
