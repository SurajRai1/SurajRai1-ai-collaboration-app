import React, { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    interests: '',
    goals: '',
    skills: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/submit-profile', { // Correct route here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Profile created successfully!');
        // Optionally clear the form
        setFormData({
          name: '',
          interests: '',
          goals: '',
          skills: ''
        });
      } else {
        setSuccessMessage('Error creating profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Error creating profile.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '40px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '24px',
        color: '#007BFF'
      }}>Create Your Profile</h2>
      
      {successMessage && (
        <p style={{
          textAlign: 'center',
          color: successMessage.includes('successfully') ? 'green' : 'red'
        }}>
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Interests:</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Your interests (e.g., AI, Web Development)"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Goals:</label>
          <input
            type="text"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="Your professional or personal goals"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Your skills (e.g., JavaScript, Python)"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
