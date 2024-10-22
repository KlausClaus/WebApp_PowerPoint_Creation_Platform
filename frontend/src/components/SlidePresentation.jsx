import React, { useState } from 'react';
import { addNewSlide, deleteSlide } from './HandleChangeOnSlides';
import { Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import SlideNavigator from './SlideNavigator';
import SlideContainer from './SlideContainer';
import TextInsertModal from './TextInsertModal';
import ImageInsertModal from './ImageInsertModal';
import VideoInsertModal from './VideoInsertModal';
import CodeInsertModal from './CodeInsertModal';
import BackgroundSettingsModal from './BackgroundSettingsModal';

const SlidePresentation = ({ id, token, presentation, setPresentation, currentSlide, setCurrentSlide }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openTextModal, setOpenTextModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pageKey, setPageKey] = useState('');
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openCodeModal, setOpenCodeModal] = useState(false);
  const [openBackgroundModal, setOpenBackgroundModal] = useState(false);
  const handleOpenImageInsertModal = (editMode, key) => {
    setIsEditing(editMode);
    setPageKey(key);
    setOpenImageModal(true);
  };
  const handleOpenTextInsertModal = (editMode, key) => {
    setIsEditing(editMode);
    setPageKey(key);
    setOpenTextModal(true);
  };
  const handleOpenVideoInsertModal = (editMode, key) => {
    setIsEditing(editMode);
    setPageKey(key);
    setOpenVideoModal(true);
  };
  const handleOpenCodeInsertModal = (editMode, key) => {
    setIsEditing(editMode);
    setPageKey(key);
    setOpenCodeModal(true);
  };

  const slidesArray = Object.entries(presentation.slides).map(([key, value]) => ({
    id: key,
    ...value
  }));

  const handleAddSlide = () => {
    addNewSlide(id, token, presentation, setPresentation);
  };

  const handleDeleteSlide = () => {
    if (slidesArray.length > 1) {
      // 获取当前幻灯片的键
      const slideKey = slidesArray[currentSlide].id;
      deleteSlide(id, token, presentation, setPresentation, slideKey, setCurrentSlide, currentSlide);
    } else {
      alert('Cannot delete the only slide in the presentation.');
    }
  };

  const slideContent = slidesArray[currentSlide].content || 'Empty slide content';
  const slideNumber = `page ${currentSlide + 1}`;

  return (
    <Box sx={{ display: 'flex', height: '80vh', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 10 }}>
          <Button variant="contained" color="primary" onClick={handleAddSlide} fullWidth>Add New Slide</Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteSlide} disabled={slidesArray.length <= 1} fullWidth>Delete This Slide</Button>
          <Button variant="contained" color="success" onClick={() => setOpenBackgroundModal(true)} fullWidth>Set Background</Button>
        </Box>
      <Box sx={{ width: isMobile ? '100%' : '100%', maxWidth: '1200px', height: '100%', p: 2, overflowY: 'auto', ml: 5 }}> {/* Adjusted width and added maxWidth */}
        {slidesArray.length > 0
          ? (
            <>
              <SlideContainer slide={slidesArray[currentSlide]} content={slideContent} slideNumber={slideNumber} onOpenTextInsertModal={handleOpenTextInsertModal} onOpenImageInsertModal={handleOpenImageInsertModal} onOpenVideoInsertModal={handleOpenVideoInsertModal} onOpenCodeInsertModal={handleOpenCodeInsertModal} id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation}/>
              <SlideNavigator currentIndex={currentSlide} totalSlides={slidesArray.length} onNavigate={setCurrentSlide} />
              <BackgroundSettingsModal open={openBackgroundModal} onClose={() => setOpenBackgroundModal(false)}/>
              <TextInsertModal id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation} isEditing={isEditing} setIsEditing={setIsEditing} pageKey={pageKey} openModal={openTextModal} setOpenModal={setOpenTextModal} />
              <ImageInsertModal id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation} isEditing={isEditing} pageKey={pageKey} openModal={openImageModal} setOpenModal={setOpenImageModal} setIsEditing={setIsEditing} />
              <VideoInsertModal id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation} isEditing={isEditing} pageKey={pageKey} openModal={openVideoModal} setOpenModal={setOpenVideoModal} setIsEditing={setIsEditing}/>
              <CodeInsertModal id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation} isEditing={isEditing} pageKey={pageKey} openModal={openCodeModal} setOpenModal={setOpenCodeModal} setIsEditing={setIsEditing} />
              <BackgroundSettingsModal id={id} token={token} slideId={slidesArray[currentSlide].id} presentation={presentation} setPresentation={setPresentation} open={openBackgroundModal} onClose={() => setOpenBackgroundModal(false)}/>
              </>
            )
          : (
              <Typography>No slides available.</Typography>
            )}
          </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 10 }}>
          <Button variant="contained" onClick={() => setOpenTextModal(true)}>Insert Text</Button>
          <Button variant="contained" onClick={() => setOpenImageModal(true)}>Insert Image</Button>
          <Button variant="contained" onClick={() => setOpenVideoModal(true)}>Insert Video</Button>
          <Button variant="contained" onClick={() => setOpenCodeModal(true)}>Insert Code</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SlidePresentation;
