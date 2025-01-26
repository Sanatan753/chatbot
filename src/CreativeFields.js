import React from "react";
import "./CreativeFields.css"; // Optional: For styling

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

class CreativeFields extends React.Component {
  handleFieldClick = async (field) => {
    try {
      // Sending selected field to the Flask backend using fetch
      const response = await fetch("http://localhost:5000/process-field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field: field.name }),
      });

      // Checking if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch the response from the server");
      }

      const data = await response.json();
      alert(`You chose ${field.name}! Response: ${data.message}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  render() {
    return (
      <div className="creative-fields">
        <h1>Choose Your Creative Field</h1>
        <div className="fields-grid">
          {fields.map((field) => (
            <div
              key={field.id}
              className="field-card"
              onClick={() => this.handleFieldClick(field)}
            >
              <h2>{field.name}</h2>
              <p>{field.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CreativeFields;
