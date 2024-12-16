import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnableSequence

load_dotenv()

class Summarybot:
    def __init__(self):
        self.chat_model = ChatOpenAI(
            model_name="gpt-4",
            temperature=0.1,
            max_tokens=100
        )

    def analyze_reviews(self, reviews_list):
        # Prepare the reviews text for analysis
        reviews_text = "\n".join([f"- {review}" for review in reviews_list])

        # Create the chat prompt template
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", """You are a sentiment analyst. Your task is to analyze the following product reviews and provide a summary.
                The summary should highlight the overall sentiment, common themes, and any notable positive or negative feedback."""),
                ("user", reviews_text)
            ]
        )

        # Create the RunnableSequence with the necessary components
        chain = RunnableSequence(prompt, self.chat_model)

        # Invoke the chain to get the response
        response = chain.invoke({})
        summary_text = response.content  # Correctly access the 'content' attribute

        return summary_text

        