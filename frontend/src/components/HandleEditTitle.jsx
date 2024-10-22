const HandleEditTitle = async (id, token, newTitle, presentation, setPresentation) => {
  const updatedPresentation = { ...presentation, presentationName: newTitle };
  setPresentation(updatedPresentation);

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
    const presentations = { ...data.store.store.store };
    presentations[id] = updatedPresentation;

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
      throw new Error('Failed to update the presentation');
    }
  } catch (error) {
    console.error('Error updating the presentation:', error);
    alert('Failed to update presentation');
  }
};

export default HandleEditTitle;
