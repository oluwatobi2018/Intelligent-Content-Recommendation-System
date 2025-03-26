from fastapi import FastAPI, HTTPException
import uvicorn
import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Initialize FastAPI
app = FastAPI(title="AI Content Recommendation API", version="1.0")

# Define paths
MODEL_FILE = "models/recommendation_model.pkl"
DATA_PATH = "data/user_interactions.csv"

# Load model and data
try:
    with open(MODEL_FILE, "rb") as f:
        model = pickle.load(f)
    data = pd.read_csv(DATA_PATH)
    print("✅ Model and data loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model/data: {e}")

def recommend_content(content_id: str, top_n: int = 5):
    """ Get top-N recommended content based on similarity scores """
    if content_id not in model["content_ids"]:
        raise ValueError("Content ID not found in dataset.")

    # Get content index
    index = model["content_ids"].index(content_id)

    # Retrieve similarity scores
    similarity_scores = model["similarity_matrix"][index]

    # Get top-N recommendations (excluding itself)
    top_indices = np.argsort(similarity_scores)[::-1][1:top_n+1]
    recommended_ids = [model["content_ids"][i] for i in top_indices]

    # Retrieve content details
    recommendations = data[data["content_id"].isin(recommended_ids)][["content_id", "title", "description"]]

    return recommendations.to_dict(orient="records")

@app.get("/")
def home():
    return {"message": "Welcome to the AI Content Recommendation API 🚀"}

@app.get("/recommend/{content_id}")
def get_recommendations(content_id: str, top_n: int = 5):
    """ API Endpoint to fetch recommendations """
    try:
        recommendations = recommend_content(content_id, top_n)
        return {"content_id": content_id, "recommendations": recommendations}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {e}")

# Run the API
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
