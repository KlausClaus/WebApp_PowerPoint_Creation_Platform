import { useState } from 'react';

const AddPresentationToDashboard = () => {
  const [presentations, setPresentations] = useState([]);

  const addPresentation = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    try {
      const response = await fetch('http://localhost:5005/store', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // Use the token in the Authorization header
        }
      });

      if (response.ok) {
        const data = await response.json(); // Assuming the data format matches your needs
        // Transform the data into the expected format for presentations
        const loadedPresentations = Object.entries(data.store.store.store).map(([id, details]) => ({
          id,
          name: details.presentationName,
          slides: details.slides ? Object.keys(details.slides).length : 0, // Counts the number of pages
          description: details.description || '', // Default to empty string if no description
          thumbnail: details.thumbnail || '' // Use a placeholder if no thumbnail
        }));
        setPresentations(loadedPresentations);
      } else {
        throw new Error('Failed to fetch presentations');
      }
    } catch (error) {
      console.error('Error fetching presentations:', error);
      // The alert is commented out because handling errors should be done in a more user-friendly way in production
      // alert('No presentation slides under this account');
    }
  };

  return { presentations, addPresentation };
};

export default AddPresentationToDashboard
