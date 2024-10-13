import React, { useState } from 'react';

const MatchPage = () => {
  const [formData, setFormData] = useState({
    interests: '',
    goals: '',
    skills: ''
  });
  const [matchedProfiles, setMatchedProfiles] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/match-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMatchedProfiles(data);
    } catch (error) {
      console.error('Error matching profiles:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '900px',  // Wider layout
      margin: '0 auto',
      padding: '40px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
    }}>
      <h2 style={{
        textAlign: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px'
      }}>Find Matches</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Interests</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Enter interests"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Goals</label>
          <input
            type="text"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="Enter goals"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Enter skills"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
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
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}>
          Find Matches
        </button>
      </form>

      {matchedProfiles.length > 0 && (
        <div>
          <h3 style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '22px',
            color: '#333'
          }}>Matched Profiles</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            padding: '20px 0',
          }}>
            {matchedProfiles.map((profile) => (
              <div
                key={profile.id}
                style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease',
                }}
              >
                <strong>Name:</strong> {profile.name} <br />
                <strong>Interests:</strong> {profile.interests} <br />
                <strong>Goals:</strong> {profile.goals} <br />
                <strong>Skills:</strong> {profile.skills}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
