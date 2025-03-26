import os
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Define paths
DATA_PATH = "../data/user_interactions.csv"  # Update with your dataset path
MODEL_DIR = "../ai-engine/models"
MODEL_FILE = f"{MODEL_DIR}/recommendation_model.pkl"

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

def load_data():
    """ Load user interactions dataset """
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"❌ Data file not found: {DATA_PATH}")

    print("📥 Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    return df

def train_model(data):
    """ Train a content recommendation model using TF-IDF + Cosine Similarity """
    print("🛠️ Training recommendation model...")

    # Combine title and description for content similarity
    data["content"] = data["title"] + " " + data["description"]

    # Convert text to feature vectors using TF-IDF
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(data["content"])

    # Compute content similarity
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Store model data
    model = {
        "vectorizer": vectorizer,
        "similarity_matrix": similarity_matrix,
        "content_ids": data["content_id"].tolist(),
    }

    print("✅ Model training complete.")
    return model

def save_model(model):
    """ Save the trained model to disk """
    with open(MODEL_FILE, "wb") as f:
        pickle.dump(model, f)
    print(f"💾 Model saved at {MODEL_FILE}")

def main():
    """ Main training pipeline """
    try:
        data = load_data()
        model = train_model(data)
        save_model(model)
        print("🚀 Training pipeline completed successfully!")
    except Exception as e:
        print(f"❌ Training failed: {e}")

if __name__ == "__main__":
    main()
