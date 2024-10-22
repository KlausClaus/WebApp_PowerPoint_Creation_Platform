export const addNewSlide = async (id, token, presentation, setPresentation) => {
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

    // 创建新幻灯片
    const newPageKey = `page${Object.keys(currentPresentation.slides).length + 1}`;
    currentPresentation.slides[newPageKey] = { content: '' };

    // 更新后端存储
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
      throw new Error('Failed to update presentations after adding a slide');
    }

    setPresentation({ ...presentation, slides: currentPresentation.slides });
  } catch (error) {
    console.error('Error during slide addition:', error);
    alert('Failed to add new slide');
  }
};

export const deleteSlide = async (id, token, presentation, setPresentation, slideKey, setCurrentSlide, currentSlide) => {
  try {
    const totalSlides = Object.keys(presentation.slides).length;
    if (totalSlides <= 1) {
      alert('Cannot delete the only slide in the presentation.');
      return;
    }

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

    delete currentPresentation.slides[slideKey];

    const newSlides = {};
    let newKeyIndex = 1;
    for (const key in currentPresentation.slides) {
      if (key !== slideKey) {
        newSlides[`page${newKeyIndex}`] = currentPresentation.slides[key];
        newKeyIndex++;
      }
    }

    currentPresentation.slides = newSlides;

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
      throw new Error('Failed to update presentations after deleting a slide');
    }

    if (currentSlide === totalSlides - 1) {
      setCurrentSlide(currentSlide - 1);
    }

    setPresentation({ ...presentation, slides: currentPresentation.slides });
  } catch (error) {
    console.error('Error during slide deletion:', error);
    alert('Failed to delete slide');
  }
};
