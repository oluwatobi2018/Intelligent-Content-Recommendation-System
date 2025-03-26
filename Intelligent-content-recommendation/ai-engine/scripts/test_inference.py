import tensorflow as tf
import numpy as np

# Load model
model = tf.keras.models.load_model("../models/content_recommender.h5")

# Dummy user-item pair
test_user_id = np.array([5])
test_item_id = np.array([12])

# Predict recommendation score
score = model.predict([test_user_id, test_item_id])
print(f"Predicted Recommendation Score: {score[0][0]}")
