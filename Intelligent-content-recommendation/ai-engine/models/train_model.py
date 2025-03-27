import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

# Load dataset (Replace with actual dataset path)
df = pd.read_csv("data/content_data.csv")

# Initialize and fit the TF-IDF vectorizer
vectorizer = TfidfVectorizer(stop_words="english")
content_vectors = vectorizer.fit_transform(df["content_text"])

# Define the paths to save the vectorizer and feature matrix
vectorizer_path = "ai-engine/models/tfidf_vectorizer.pkl"
model_path = "ai-engine/models/tfidf_features.pkl"

# Save the fitted vectorizer
with open(vectorizer_path, "wb") as file:
    pickle.dump(vectorizer, file)

# Save the feature matrix
with open(model_path, "wb") as file:
    pickle.dump(content_vectors, file)

print(f"Vectorizer saved at {vectorizer_path}")
print(f"TF-IDF features saved at {model_path}")


