import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class ContentRecommender:
    def __init__(self, model_path="ai-engine/models/model.pkl"):
        with open(model_path, "rb") as file:
            self.model = pickle.load(file)

    def recommend(self, user_vector, content_vectors, top_n=5):
        """Generate content recommendations based on user interactions."""
        similarities = cosine_similarity([user_vector], content_vectors)
        top_indices = np.argsort(similarities[0])[::-1][:top_n]
        return top_indices  # Returns indices of recommended content
