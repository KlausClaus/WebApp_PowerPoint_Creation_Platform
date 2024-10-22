export const updateBackgroundInSlide = async (id, token, slideId, background, presentation, setPresentation, applyToAll) => {
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

    if (applyToAll) {
      Object.keys(currentPresentation.slides).forEach(key => {
        currentPresentation.slides[key].background = background;
      });
    } else {
      if (currentPresentation.slides[slideId]) {
        currentPresentation.slides[slideId].background = background;
      } else {
        throw new Error('Slide does not exist');
      }
    }

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
      throw new Error('Failed to update slide background');
    }
  } catch (error) {
    console.error('Error updating slide background:', error);
  }
};
