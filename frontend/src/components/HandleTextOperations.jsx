export const updateTextInSlide = async (id, token, slideId, textData, presentation, setPresentation) => {
  try {
    const response = await fetch('http://localhost:5005/store', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve presentations');
    }
    const data = await response.json();
    const presentations = data.store.store.store;
    const currentPresentation = presentations[id];
    const currentSlide = currentPresentation.slides[slideId];

    if (!currentSlide.content) {
      currentSlide.content = {};
    }

    currentSlide.content = { ...currentSlide.content, ...textData };
    setPresentation({ ...presentation, slides: currentPresentation.slides });

    const updatedStore = { store: { store: presentations } };
    const putResponse = await fetch('http://localhost:5005/store', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedStore)
    });
    if (!putResponse.ok) {
      throw new Error('Failed to update slide text');
    }
  } catch (error) {
    console.error('Error updating text in slide:', error);
  }
};

export const deleteTextComponent = async (id, token, slideId, key, presentation, setPresentation) => {
  try {
    const response = await fetch('http://localhost:5005/store', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve presentation');
    }

    const data = await response.json();
    const presentations = data.store.store.store;
    const currentPresentation = presentations[id];
    const currentSlide = currentPresentation.slides[slideId];

    if (currentSlide && currentSlide.content[key]) {
      delete currentSlide.content[key];

      setPresentation({ ...presentation, slides: currentPresentation.slides });

      const updatedStore = { store: { store: presentations } };

      // Save the updated presentation back to the backend
      const putResponse = await fetch('http://localhost:5005/store', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedStore)
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update presentation');
      }
    } else {
      throw new Error('Component not found');
    }
  } catch (error) {
    console.error('Error deleting text component:', error);
  }
};
