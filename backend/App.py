from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set your OpenAI API key
openai.api_key = "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"

# Define prompts for each field
prompts = {
    "Writing": "You are a professional writing assistant. Provide ideas for a new novel.",
    "Music": "You are a music composer. Suggest melodies or lyrics for a new song.",
    "Digital Art": "You are an AI artist. Describe an artwork idea based on nature.",
    "Videography": "You are a videography expert. Suggest concepts for a short film.",
    "Graphic Design": "You are a graphic designer. Provide a logo concept for a tech startup.",
    "Game Development": "You are a game developer. Suggest ideas for a puzzle adventure game.",
    "Photography": "You are a photography expert. Suggest themes for a photoshoot.",
    "Poetry": "You are a poet. Write a short poem about love and resilience."
}

@app.route('/process-field', methods=['POST'])
def process_field():
    data = request.json
    field = data.get('field')

    if not field or field not in prompts:
        return jsonify({"error": "Invalid field selected"}), 400

    # Get the prompt for the selected field
    prompt = prompts[field]

    try:
        # Call OpenAI ChatGPT API
        response = openai.Completion.create(
            engine="text-davinci-003",  # Use the desired model
            prompt=prompt,
            max_tokens=150
        )

        # Extract response
        message = response.choices[0].text.strip()

        return jsonify({"message": message}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
