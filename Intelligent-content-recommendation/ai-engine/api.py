import os
import pickle
import logging
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
import uvicorn
from sklearn.metrics.pairwise import cosine_similarity

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Initialize FastAPI application
app = FastAPI(title="AI Content Recommendation API", version="1.1")

# Configuration: Use environment variables with defaults
MODEL_FILE = os.getenv("MODEL_FILE", "models/recommendation_model.pkl")
DATA_PATH = os.getenv("DATA_PATH", "data/user_interactions.csv")

# Global variables to cache the loaded model and data
model = None
data = None

def load_resources():
    """
    Load the trained recommendation model and user interaction data.
    Raises:
        RuntimeError: If loading fails.
    """
    global model, data
    try:
        with open(MODEL_FILE, "rb") as f:
            model = pickle.load(f)
        data = pd.read_csv(DATA_PATH)
        logging.info("Model and data loaded successfully.")
    except Exception as e:
        logging.error(f"Error loading model/data: {e}")
        raise RuntimeError(f"Error loading model/data: {e}")

@app.on_event("startup")
def startup_event():
    """Event handler for application startup to load resources."""
    load_resources()

def recommend_content(content_id: str, top_n: int = 5):
    """
    Generate top-N content recommendations based on cosine similarity scores.
    
    Parameters:
        content_id (str): The ID of the content item for which to get recommendations.
        top_n (int): Number of recommendations to return.
        
    Returns:
        list: A list of recommended content details.
        
    Raises:
        ValueError: If the content ID is not found.
    """
    if model is None or data is None:
        raise RuntimeError("Model or data is not loaded.")
    
    if content_id not in model.get("content_ids", []):
        raise ValueError("Content ID not found in dataset.")
    
    # Get the index of the content
    index = model["content_ids"].index(content_id)
    
    # Retrieve similarity scores and get top-N recommendations (excluding itself)
    similarity_scores = model["similarity_matrix"][index]
    top_indices = np.argsort(similarity_scores)[::-1][1:top_n+1]
    recommended_ids = [model["content_ids"][i] for i in top_indices]
    
    # Retrieve content details from data
    recommendations = data[data["content_id"].isin(recommended_ids)][["content_id", "title", "description"]]
    return recommendations.to_dict(orient="records")

@app.get("/")
def home():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to the AI Content Recommendation API 🚀"}

@app.get("/recommend/{content_id}")
def get_recommendations(content_id: str, top_n: int = 5):
    """
    API endpoint to fetch recommendations for a given content ID.
    
    Parameters:
        content_id (str): The ID of the content item.
        top_n (int): Number of recommendations to return.
    
    Returns:
        dict: A JSON response containing the original content ID and the list of recommendations.
    
    Raises:
        HTTPException: 404 if content_id is not found, or 500 for server errors.
    """
    try:
        recommendations = recommend_content(content_id, top_n)
        return {"content_id": content_id, "recommendations": recommendations}
    except ValueError as ve:
        logging.error(f"ValueError: {ve}")
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        logging.error(f"Error during recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Server error: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
