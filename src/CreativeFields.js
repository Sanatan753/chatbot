import React from "react";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import "./CreativeFields.css"; // Optional: For styling

// Importing images for each field
import writingImage from './images/Writing.png';
import musicImage from './images/Music.png';
import digitalArtImage from './images/Digital-Art.png';
import videographyImage from './images/Videography.png';
import photographyImage from './images/Photography.png';
import animationImage from './images/Animation.jpg';
import sketchingImage from './images/Sketching.png';
import gameDevImage from './images/Game-development.png';

// Defining the fields array
const fields = [
  { id: 1, name: "Writing", description: "Explore the world of storytelling and literature.", background: writingImage },
  { id: 2, name: "Music", description: "Create melodies, beats, and compositions.", background: musicImage },
  { id: 3, name: "Digital Art", description: "Design stunning visuals and digital artwork.", background: digitalArtImage },
  { id: 4, name: "Videography", description: "Dive into filmmaking and video production.", background: videographyImage },
  { id: 5, name: "Photography", description: "Capture moments and tell stories through photos.", background: photographyImage },
  { id: 6, name: "Animation", description: "Bring characters and scenes to life through animation.", background: animationImage },
  { id: 7, name: "Sketching", description: "Learning the Fundamentals of sketching.", background: sketchingImage },
  { id: 8, name: "Game Development", description: "Build and design interactive games.", background: gameDevImage },
];

function CreativeFields() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleFieldClick = async (field) => {
    try {
      // Make a POST request to the backend
      const response = await fetch("http://127.0.0.1:5000/process-field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field: field.name }),
      });

      if (!response.ok) {
        // Handle server errors with detailed message
        const errorDetails = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorDetails}`);
      }

      const data = await response.json();

      // Redirect to Chatbot page and pass data as state
      navigate("/chatbot", {
        state: { selectedField: field.name, response: data.message },
      });
    } catch (error) {
      console.error("Error:", error);
      alert(`Something went wrong: ${error.message}`);
    }    
  };

  return (
    <div className="creative-fields">
      <h1>Choose Your Creative Field</h1>
      <div className="fields-grid">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`field-card field-card-${field.id}`}
            onClick={() => handleFieldClick(field)}
            style={{ backgroundImage: `url(${field.background})` }}
          >
            <h2>{field.name}</h2>
            <p>{field.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreativeFields;
