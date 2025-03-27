import tensorflow as tf
import numpy as np

def load_recommender_model(model_path="../models/content_recommender.h5"):
    try:
        model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully.")
        return model
    except Exception as e:
        raise RuntimeError(f"Failed to load model from {model_path}: {e}")

def predict_recommendation(model, user_id, item_id):
    # Ensure inputs are numpy arrays and have the correct shape
    user_input = np.array([user_id])
    item_input = np.array([item_id])
    
    try:
        prediction = model.predict([user_input, item_input])
        return prediction[0][0]  # Assuming prediction returns a 2D array
    except Exception as e:
        raise RuntimeError(f"Prediction failed: {e}")

if __name__ == "__main__":
    model = load_recommender_model()
    test_user_id = 5
    test_item_id = 12
    score = predict_recommendation(model, test_user_id, test_item_id)
    print(f"Predicted Recommendation Score: {score}")

