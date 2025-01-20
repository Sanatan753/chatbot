import React from "react";
import "./CreativeFields.css"; // Optional: For styling

const CreativeFields = () => {
  const fields = [
    { id: 1, name: "Writing", description: "Explore the world of storytelling and literature." },
    { id: 2, name: "Music", description: "Create melodies, beats, and compositions." },
    { id: 3, name: "Digital Art", description: "Design stunning visuals and digital artwork." },
    { id: 4, name: "Videography", description: "Dive into filmmaking and video production." },
    { id: 5, name: "Photography", description: "Capture moments and tell stories through photos." },
    { id: 6, name: "Animation", description: "Bring characters and scenes to life through animation." },
    { id: 7, name: "Graphic Design", description: "Design logos, posters, and visual identities." },
    { id: 8, name: "Game Development", description: "Build and design interactive games." },
  ];

  const handleFieldClick = (field) => {
    alert(`You chose ${field.name}!`);
    // You can add navigation or further logic here
  };

  return (
    <div className="creative-fields">
      <h1>Choose Your Creative Field</h1>
      <div className="fields-grid">
        {fields.map((field) => (
          <div
            key={field.id}
            className="field-card"
            onClick={() => handleFieldClick(field)}
          >
            <h2>{field.name}</h2>
            <p>{field.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeFields;
