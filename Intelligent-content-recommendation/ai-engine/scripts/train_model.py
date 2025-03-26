import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Flatten, Dense
import pickle

# Load dataset
data = pd.read_csv("../data/user_interactions.csv")

# Preprocessing
num_users = data["user_id"].nunique()
num_items = data["content_id"].nunique()

# Create training data
user_ids = data["user_id"].values
item_ids = data["content_id"].values
ratings = data["interaction_score"].values

# Build a simple recommendation model
model = Sequential([
    Embedding(input_dim=num_users, output_dim=50, input_length=1),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit([user_ids, item_ids], ratings, epochs=10, batch_size=32)

# Save model
model.save("../models/content_recommender.h5")
print("✅ Model trained and saved successfully.")
