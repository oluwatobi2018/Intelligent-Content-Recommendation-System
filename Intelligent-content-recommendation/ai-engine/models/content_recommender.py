import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class ContentRecommender:
    def __init__(self, model_path="ai-engine/models/model.pkl"):
        try:
            with open(model_path, "rb") as file:
                self.model = pickle.load(file)
            # Assuming the model contains a key 'content_ids'
            self.content_ids = self.model.get("content_ids", [])
        except Exception as e:
            raise RuntimeError(f"Failed to load model from {model_path}: {e}")

    def recommend(self, user_vector, content_vectors, top_n=5):
        """
        Generate content recommendations based on user interactions.
        
        Parameters:
            user_vector (array-like): The feature vector representing user preferences.
            content_vectors (array-like): A matrix of feature vectors for content items.
            top_n (int): The number of recommendations to return.
            
        Returns:
            list: A list of recommended content IDs.
        """
        try:
            # Compute cosine similarity between user vector and each content vector
            similarities = cosine_similarity([user_vector], content_vectors)
            # Get indices of top_n similar content
            top_indices = np.argsort(similarities[0])[::-1][:top_n]
            # Map indices to content IDs if available, otherwise return indices
            recommendations = [self.content_ids[i] if i < len(self.content_ids) else i for i in top_indices]
            return recommendations
        except Exception as e:
            raise RuntimeError(f"Failed to compute recommendations: {e}")
