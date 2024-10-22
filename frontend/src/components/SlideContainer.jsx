import React, { useState } from 'react';
import { deleteTextComponent } from './HandleTextOperations';

const SlideContainer = ({ slide, content, slideNumber, onOpenTextInsertModal, onOpenImageInsertModal, onOpenVideoInsertModal, onOpenCodeInsertModal, id, token, slideId, presentation, setPresentation }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleDoubleClick = (key, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedComponent(key);
    const isText = key.startsWith('Text');
    const isImage = key.startsWith('Image');
    const isVideo = key.startsWith('Video');
    const isCode = key.startsWith('Code');
    if (isText) {
      onOpenTextInsertModal(true, key);
    } else if (isImage) {
      onOpenImageInsertModal(true, key);
    } else if (isVideo) {
      onOpenVideoInsertModal(true, key);
    } else if (isCode) {
      onOpenCodeInsertModal(true, key);
    }
  };
  const handleRightClick = (key, event) => {
    event.preventDefault();
    deleteTextComponent(id, token, slideId, key, presentation, setPresentation);
  };
  const renderContentBlocks = () => {
    return Object.entries(content).map(([key, data]) => {
      if (key.startsWith('Text')) {
        const { text, fontSize, color, width, height, x, y, fontFamily } = data;
        return (
                <div key={key} style={{
                  position: 'absolute',
                  top: `${y}%`,
                  left: `${x}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                  border: '1px solid #ccc',
                  color,
                  fontSize,
                  fontFamily,
                  padding: '10px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  backgroundColor: selectedComponent === key ? 'lightyellow' : 'transparent'
                }} onDoubleClick={() => handleDoubleClick(key, event)} onContextMenu={(event) => handleRightClick(key, event)}>
                    {text}
                </div>
        );
      } else if (key.startsWith('Image')) {
        const { imageUrl, altText, width, height, x, y } = data;
        return (
                <img key={key} src={imageUrl} alt={altText} style={{
                  position: 'absolute',
                  top: `${y}%`,
                  left: `${x}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                  border: '1px solid #ccc',
                  backgroundColor: selectedComponent === key ? 'lightyellow' : 'transparent'
                }} onDoubleClick={() => handleDoubleClick(key, event)} onContextMenu={(event) => handleRightClick(key, event)} />
        );
      } else if (key.startsWith('Video')) {
        const { videoUrl, width, height, autoplay, x, y } = data;
        return (
            <video key={key} src={videoUrl} style={{
              width: `${width}%`,
              height: `${height}%`,
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              border: '1px solid #ccc',
              backgroundColor: selectedComponent === key ? 'lightyellow' : 'transparent'
            }}
              onDoubleClick={() => handleDoubleClick(key, event)} onContextMenu={(event) => handleRightClick(key, event)}
              controls autoPlay={autoplay ? 'autoplay' : undefined}>
                Your browser does not support the video tag.
            </video>
        );
      } else if (key.startsWith('Code')) {
        const { code, width, height, x, y, fontSize } = data;
        return (
            <pre key={key} style={{
              width: `${width}%`,
              height: `${height}%`,
              position: 'absolute',
              top: `${y}%`,
              left: `${x}%`,
              border: '1px solid #ccc',
              backgroundColor: selectedComponent === key ? 'lightyellow' : 'transparent',
              fontSize, // Apply the dynamic font size here
              fontFamily: 'monospace', // Typically code is best represented in monospace
              overflow: 'auto', // Ensures that all code is accessible within the container
              whiteSpace: 'pre-wrap', // Maintains whitespace formatting
              padding: '10px' // Adds padding for better readability
            }}
              onDoubleClick={(event) => handleDoubleClick(key, event)} onContextMenu={(event) => handleRightClick(key, event)}>
                {code}
            </pre>
        );
      }
      return null;// Ensure all paths return a value, null for unmatched conditions
    });
  };

  return (
    <div style={{
      width: '97%',
      paddingTop: '53%',
      position: 'relative',
      border: '1px solid #ccc',
      overflow: 'hidden',
      background: slide.background || 'white'
    }}>
        {renderContentBlocks()}
        <div style={{
          position: 'absolute',
          left: '10px',
          bottom: '10px',
          color: '#333',
          fontSize: '1em'
        }}>
            {slideNumber}
        </div>
    </div>
  );
};

export default SlideContainer;
