export const fetchPresentations = async (id, token, setPresentation, navigate, setLoading) => {
  setLoading(true);
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
    const presentations = data.store.store.store; // Adjust based on actual structure
    const specificPresentation = presentations[id];
    if (specificPresentation) {
      setPresentation(specificPresentation);
    } else {
      throw new Error('Presentation not found');
    }
  } catch (error) {
    console.error(error);
    navigate('/dashboard');
  } finally {
    setLoading(false);
  }
};
