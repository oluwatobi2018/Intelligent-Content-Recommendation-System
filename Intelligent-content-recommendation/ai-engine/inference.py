import os
import pickle
import pandas as pd
import numpy as np
import logging
import argparse

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Define paths
MODEL_FILE = os.getenv("MODEL_PATH", os.path.abspath("../ai-engine/models/recommendation_model.pkl"))
DATA_PATH = os.getenv("DATA_PATH", os.path.abspath("../data/user_interactions.csv"))

def load_model():
    """Load the trained recommendation model."""
    if not os.path.exists(MODEL_FILE):
        logging.error(f"❌ Model file not found: {MODEL_FILE}")
        return None
    
    try:
        with open(MODEL_FILE, "rb") as f:
            model = pickle.load(f)
        logging.info("✅ Model loaded successfully.")
        return model
    except Exception as e:
        logging.error(f"❌ Error loading model: {e}")
        return None

def load_data():
    """Load dataset to get content details."""
    if not os.path.exists(DATA_PATH):
        logging.error(f"❌ Data file not found: {DATA_PATH}")
        return None
    
    try:
        df = pd.read_csv(DATA_PATH)
        if df.empty:
            logging.warning("⚠ Data file is empty.")
            return None
        return df
    except Exception as e:
        logging.error(f"❌ Error loading data: {e}")
        return None

def recommend_content(content_id, model, data, top_n=5):
    """Generate top-N recommended content based on similarity scores."""
    if model is None or data is None:
        logging.error("❌ Model or data is not available.")
        return []
    
    content_ids = model.get("content_ids", [])
    if content_id not in content_ids:
        logging.warning(f"⚠ Content ID {content_id} not found in dataset.")
        return []

    # Get content index
    index = content_ids.index(content_id)

    # Retrieve similarity scores
    similarity_matrix = model.get("similarity_matrix", [])
    if not similarity_matrix:
        logging.error("❌ Similarity matrix is empty or missing.")
        return []

    similarity_scores = similarity_matrix[index]

    # Get top-N recommendations (excluding itself)
    top_indices = np.argpartition(-similarity_scores, min(top_n + 1, len(similarity_scores)))[1:top_n+1]
    recommended_ids = [content_ids[i] for i in top_indices]

    # Retrieve content details
    recommendations = data[data["content_id"].isin(recommended_ids)][["content_id", "title", "description"]]

    return recommendations.to_dict(orient="records")

def main(content_id=None):
    """Run the recommendation system."""
    model = load_model()
    data = load_data()

    if model and data:
        if content_id is None:
            content_id = model["content_ids"][0]  # Default to first content ID if not provided

        logging.info(f"🔍 Generating recommendations for content ID: {content_id}")
        recommendations = recommend_content(content_id, model, data)

        if recommendations:
            logging.info("🎯 Recommended Content:")
            for rec in recommendations:
                logging.info(f"- {rec['title']}: {rec['description']}")
        else:
            logging.warning("⚠ No recommendations found.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Content Recommendation System")
    parser.add_argument("--content_id", type=str, help="Content ID for generating recommendations")
    args = parser.parse_args()

    main(content_id=args.content_id)
