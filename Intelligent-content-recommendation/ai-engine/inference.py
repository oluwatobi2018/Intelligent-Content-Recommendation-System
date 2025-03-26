import os
import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Define paths
MODEL_FILE = "../ai-engine/models/recommendation_model.pkl"
DATA_PATH = "../data/user_interactions.csv"

def load_model():
    """ Load the trained recommendation model """
    if not os.path.exists(MODEL_FILE):
        raise FileNotFoundError(f"❌ Model file not found: {MODEL_FILE}")
    
    with open(MODEL_FILE, "rb") as f:
        model = pickle.load(f)

    print("✅ Model loaded successfully.")
    return model

def load_data():
    """ Load dataset to get content details """
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"❌ Data file not found: {DATA_PATH}")
    
    df = pd.read_csv(DATA_PATH)
    return df

def recommend_content(content_id, model, data, top_n=5):
    """ Get top-N recommended content based on similarity scores """
    if content_id not in model["content_ids"]:
        raise ValueError("❌ Content ID not found in dataset.")
    
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

def main():
    """ Example inference function """
    try:
        model = load_model()
        data = load_data()
        
        # Example content_id (replace with actual ID from dataset)
        sample_content_id = model["content_ids"][0]

        print(f"🔍 Generating recommendations for content ID: {sample_content_id}")
        recommendations = recommend_content(sample_content_id, model, data)

        print("🎯 Recommended Content:")
        for rec in recommendations:
            print(f"- {rec['title']}: {rec['description']}")

    except Exception as e:
        print(f"❌ Inference failed: {e}")

if __name__ == "__main__":
    main()
