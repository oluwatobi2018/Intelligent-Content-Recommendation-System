import os
import pickle
import logging
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Define paths (Environment variable support)
DATA_PATH = os.getenv("DATA_PATH", "../data/user_interactions.csv")
MODEL_DIR = os.getenv("MODEL_DIR", "../ai-engine/models")
MODEL_FILE = os.path.join(MODEL_DIR, "recommendation_model.pkl")

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

def load_data():
    """Load user interactions dataset."""
    if not os.path.exists(DATA_PATH):
        logging.error(f"❌ Data file not found: {DATA_PATH}")
        return None

    try:
        logging.info("📥 Loading dataset...")
        df = pd.read_csv(DATA_PATH)

        if df.empty:
            logging.warning("⚠ The dataset is empty.")
            return None

        return df
    except Exception as e:
        logging.error(f"❌ Error loading data: {e}")
        return None

def preprocess_data(data):
    """Preprocess dataset: Fill missing values and combine text features."""
    if data is None:
        return None

    # Check required columns
    required_columns = {"content_id", "title", "description"}
    if not required_columns.issubset(data.columns):
        logging.error(f"❌ Missing required columns: {required_columns - set(data.columns)}")
        return None

    # Fill missing values
    data.fillna("", inplace=True)

    # Combine text fields for feature extraction
    data["content"] = data["title"] + " " + data["description"]

    return data

def train_model(data):
    """Train a content recommendation model using TF-IDF & Cosine Similarity."""
    if data is None:
        logging.error("❌ No data available for training.")
        return None

    logging.info("🛠️ Training recommendation model...")

    # Convert text to feature vectors using TF-IDF
    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    tfidf_matrix = vectorizer.fit_transform(data["content"])

    # Compute content similarity
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Store model data
    model = {
        "vectorizer": vectorizer,
        "similarity_matrix": similarity_matrix,
        "content_ids": data["content_id"].tolist(),
    }

    logging.info("✅ Model training complete.")
    return model

def save_model(model):
    """Save the trained model to disk."""
    if model is None:
        logging.error("❌ No trained model to save.")
        return

    try:
        with open(MODEL_FILE, "wb") as f:
            pickle.dump(model, f)
        logging.info(f"💾 Model saved at {MODEL_FILE}")
    except Exception as e:
        logging.error(f"❌ Error saving model: {e}")

def main():
    """Main training pipeline."""
    try:
        data = load_data()
        data = preprocess_data(data)
        model = train_model(data)
        save_model(model)
        logging.info("🚀 Training pipeline completed successfully!")
    except Exception as e:
        logging.error(f"❌ Training failed: {e}")

if __name__ == "__main__":
    main()
