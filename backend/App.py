import os
from flask import Flask, request, jsonify
from groq import Groq
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("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"),
)

# Example prompts for different fields
prompts = {
    "Writing": "Help me create a writing prompt.",
    "Music": "Suggest ideas for composing music.",
    "Digital Art": "Generate a concept for digital art.",
    "Videography": "Provide a creative idea for a video project.",
    "Photography": "Suggest photography themes.",
    "Animation": "Give me ideas for an animation storyline.",
    "Sketching": "What should I sketch today?",
    "Game Development": "Suggest a unique concept for a game."
}

# Define a route to test the server with GET requests
@app.route('/')
def home():
    return jsonify({"message": "Flask server is running!"}), 200

# Route to handle POST requests from the frontend (for chatbot functionality)
@app.route('/get-chat-response', methods=['POST'])
def get_chat_response():
    # Get prompt from the request body (assumes JSON payload)
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Generate a response using Groq API
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": prompt,
            }],
            model="llama-3.3-70b-versatile",
        )

        # Extract and return the response message
        response_message = chat_completion.choices[0].message.content
        return jsonify({"response": response_message}), 200
    except Exception as e:
        print("Error in get_chat_response:", str(e))  # Log errors
        return jsonify({"error": str(e)}), 500

# Route to handle field selection (from CreativeFields)
@app.route('/process-field', methods=['GET', 'POST'])
@app.route('/process-field', methods=['POST'])
def process_field():
    data = request.json
    print("Received data:", data)  # Log received data

    field = data.get('field')
    if not field or field not in prompts:
        return jsonify({"error": "Invalid field selected"}), 400

    try:
        # Generate a response using the selected field prompt
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompts[field]}],
            model="llama-3.3-70b-versatile"
        )
        message = response.choices[0].message.content
        print("Generated response:", message)  # Log generated response
        return jsonify({"field": field, "message": message}), 200
    except Exception as e:
        print("Error:", str(e))  # Log errors
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
