import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

load_dotenv()

class Chatbot:
    def __init__(self):
        self.conversation_history = []
        self.chat_model = ChatOpenAI(
            model_name="gpt-4",
            temperature=0.1,
            max_tokens=100
        )

    def chatbot_prompt(self, description, question):
        # Add user question to conversation history
        self.conversation_history.append({"role": "user", "content": question})

        # Create the prompt including conversation history
        full_conversation = self.conversation_history[-10:]  # Include last 10 exchanges
        formatted_conversation = "\n".join([f"{msg['role'].capitalize()}: {msg['content']}" for msg in full_conversation])

        # Create the chat prompt template
        prompt = ChatPromptTemplate.from_messages(
            [
                # ("system", f"""You are a sales assistant answering questions asked by the customers based on the product description given below.
                # Make sure you only use that product description. If you didn't find the answer, reply as 'contact the administration'.
                
                # Product Description: {{description}}"""),
                # ("system", f"Conversation History:\n{formatted_conversation}"),
                # ("user", "{user_question}")

                  (
                    "system",
                    f"""You are a product analyzer assisting customers with product inquiries.
                    Only answer questions strictly related to the product description below. 
                    If the question is unrelated to the product, respond with:
                    "I am a product analyzer. Please ask questions related to the product, or contact the administration."
                    
                    Product Description: {{description}}
                    """
                ),
                ("system", f"Conversation History:\n{formatted_conversation}"),
                ("user", "{user_question}")
            ]
        )

        # Create the chain with the chat model and prompt template
        chain = LLMChain(llm=self.chat_model, prompt=prompt)

        # Run the chain to get the response
        response = chain.run({
            "description": description,
            "user_question": question
        })

        # Add assistant response to the conversation history
        self.conversation_history.append({"role": "assistant", "content": response})
        print("Response 2:", self.conversation_history)

        return response

    def clear_history(self):
        self.conversation_history = []
        print("history cleared")