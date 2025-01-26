// Importing necessary modules
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreativeFields from "./CreativeFields"; // Ensure the path is correct
import "./App.css"; // You can define styles here

// Defining the HomePage component
function App() {
  return (
    <Router>
      <div className="homepage">
        <header className="header">
          <h1>Welcome to Idea Incubator</h1>
          <p>Your AI companion for creative brainstorming</p>
        </header>

        <main className="main-content">
          <section className="get-started">
            <h2>Get Started</h2>
            <Link className="start-button" to="/creative-fields">
              Start Chatting
            </Link>
          </section>

          <section className="introduction">
            <h2>About the Chatbot</h2>
            <p>
              Idea Incubator helps creators bring their visions to life. Whether you're a writer,
              artist, or musician, our AI can help you brainstorm, refine, and start your
              creative projects.
            </p>
          </section>

          <section className="features">
            <h2>Features</h2>
            <ul>
              <li>Generate ideas across multiple domains</li>
              <li>Get step-by-step guidance for your projects</li>
              <li>Save and revisit your brainstormed ideas</li>
            </ul>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Idea Incubator. All rights reserved.</p>
        </footer>

        <Routes>
          <Route path="/creative-fields" element={<CreativeFields />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
