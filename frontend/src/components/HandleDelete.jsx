// deletePresentation.js

const HandleDelete = async (id, token, navigate) => {
  if (window.confirm('Are you sure you want to delete this presentation?')) {
    try {
      const response = await fetch('http://localhost:5005/store', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve presentations for deletion');
      }

      const data = await response.json();
      const presentations = data.store.store.store;
      delete presentations[id];

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
        throw new Error('Failed to update presentations after deletion');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during deletion:', error);
      alert('Failed to delete presentation');
    }
  }
};

export default HandleDelete;
