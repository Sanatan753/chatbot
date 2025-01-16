// Importing necessary modules
import React from 'react';
import './App.css'; // You can define styles here

// Defining the HomePage component
function App() {
    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Idea Incubator</h1>
                <p>Your AI companion for creative brainstorming</p>
            </header>

            <main className="main-content">
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

                <section className="get-started">
                    <h2>Get Started</h2>
                    <button className="start-button">Start Chatting</button>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2025 Idea Incubator. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
