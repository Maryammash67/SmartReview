from flask import Blueprint, request, jsonify
from .chatbot import Chatbot
from .summarybot import Summarybot

api_bp = Blueprint('api', __name__)

# Initialize the Chatbot instance
chatbot = Chatbot()
summarybot = Summarybot()

@api_bp.route('/chatbot', methods=['POST'])
def chat():
    data = request.json
    description = data.get('description')
    question = data.get('question')

    print(description)

    if not description or not question:
        return jsonify({"error": "Description and question are required"}), 400

    response = chatbot.chatbot_prompt(description, question)
    return jsonify({"answer": response})

@api_bp.route('/clear-history', methods=['POST'])
def clear_history():
    chatbot.clear_history()
    return jsonify({"message": "Conversation history cleared"})


@api_bp.route('/summarybot', methods=['POST'])
def analyze_reviews():
    data = request.json
    reviews = data.get('reviews')

    if not reviews or not isinstance(reviews, list):
        return jsonify({"error": "A list of reviews is required"}), 400

    # Analyze the reviews using the chatbot instance
    summary = summarybot.analyze_reviews(reviews)
    #kalla call ekak nova

    return jsonify({"summary": summary})