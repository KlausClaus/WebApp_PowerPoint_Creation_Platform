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

const ImageInsertModal = ({ id, token, slideId, presentation, setPresentation, isEditing, pageKey, openModal, setOpenModal, setIsEditing }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('50');
  const [altText, setAltText] = useState('');
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  const handleClose = () => {
    setOpenModal(false);
    setImageUrl('');
    setWidth('50');
    setHeight('50');
    setAltText('');
    setX('0');
    setY('0');
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const contentId = isEditing ? pageKey : 'Image' + uuidv4();
    const imageData = {
      imageUrl,
      width,
      height,
      altText,
      x,
      y
    };

    try {
      await updateTextInSlide(id, token, slideId, { [contentId]: imageData }, presentation, setPresentation);
      handleClose();
    } catch (error) {
      console.error('Failed to add/update image:', error);
      alert('Failed to add/update image to slide.');
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
          <Typography id="modal-title" variant="h6">{isEditing ? 'Edit Image' : 'Add Image to Slide'}</Typography>
          <TextField fullWidth label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} margin="normal" />
          <TextField fullWidth label="Width (%)" value={width} onChange={(e) => setWidth(e.target.value)} margin="normal" />
          <TextField fullWidth label="Height (%)" value={height} onChange={(e) => setHeight(e.target.value)} margin="normal" />
          <TextField fullWidth label="Alt Text" value={altText} onChange={(e) => setAltText(e.target.value)} margin="normal" />
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

export default ImageInsertModal;
