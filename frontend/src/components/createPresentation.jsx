const HandleCreatePresentation = async (presentationName, onCreate, onClose) => {
  if (!presentationName.trim()) {
    alert('Please enter a name for the presentation.');
    return;
  }

  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    // First, retrieve existing presentations
    const response = await fetch('http://localhost:5005/store', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}` // Use the token in the Authorization header
      }
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve existing presentations');
    }

    // Parse the existing presentations
    const data = await response.json();
    const userKey = Object.keys(data)[0]; // Dynamic user key based on actual user's key
    let existingStore = data[userKey].store || {};

    if (existingStore.store && typeof existingStore.store === 'object') {
      existingStore = existingStore.store;
    }

    const presentationKey = `Presentation${Date.now()}`;

    // Add the new presentation
    existingStore[presentationKey] = {
      presentationName,
      slides: { page1: { content: '' } } // Start with one empty slide
    };

    // Ensure the structure passed to PUT is correct
    const updatedStore = {
      [userKey]: {
        ...data[userKey], // Spread existing user data
        store: existingStore // Updated store with new presentation
      }
    };

    // Now PUT the updated presentations back to the server
    const putResponse = await fetch('http://localhost:5005/store', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedStore) // Pass the entire user object with the updated store
    });

    if (putResponse.ok) {
      // If PUT response is empty, update front-end manually
      onCreate(existingStore); // Use local copy since PUT is confirmed OK
      onClose(); // Close the modal after success
    } else {
      const errorData = await putResponse.json();
      alert(`Failed to create presentation: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error saving the presentation:', error);
    alert('Error connecting to the server.');
  }
};

export default HandleCreatePresentation;
