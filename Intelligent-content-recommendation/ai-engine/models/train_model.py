import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset (Replace with actual dataset path)
df = pd.read_csv("data/content_data.csv")

# Convert content text to feature vectors
vectorizer = TfidfVectorizer(stop_words="english")
content_vectors = vectorizer.fit_transform(df["content_text"])

# Save the trained model
model_path = "ai-engine/models/model.pkl"
with open(model_path, "wb") as file:
    pickle.dump(content_vectors, file)

print(f"Model saved at {model_path}")
