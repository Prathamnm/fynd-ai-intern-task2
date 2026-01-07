import os
import json
from google import genai
from google.genai import types

# -------------------------------
# Gemini Client
# -------------------------------

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-1.5-flash"

# -------------------------------
# In-memory prompt history
# -------------------------------

_prompt_history = []


def save_prompt(prompt: str, response: dict):
    _prompt_history.append({
        "prompt": prompt,
        "response": response
    })


def get_prompt_history():
    return _prompt_history


# -------------------------------
# Main LLM Function
# -------------------------------

def generate_ai_outputs(review: str, rating: int):
    prompt = f"""
You are an AI feedback system.

User rating: {rating}/5
User review: {review}

Tasks:
1. Write a polite response to the user
2. Summarize the feedback in 1 line for admin
3. Suggest a concrete next action for internal teams

Return ONLY valid JSON in this exact format:
{{
  "user_response": "...",
  "admin_summary": "...",
  "recommended_action": "..."
}}
"""

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=300
            )
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.split("```")[1]

        data = json.loads(text)

        # ✅ SAVE HISTORY FOR ADMIN
        save_prompt(prompt, data)

        return data

    except Exception:
        fallback = {
            "user_response": "Thank you for your feedback!",
            "admin_summary": "AI summary unavailable",
            "recommended_action": "Manual review required"
        }

        save_prompt(prompt, fallback)
        return fallback
