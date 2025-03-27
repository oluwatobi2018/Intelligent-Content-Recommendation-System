import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, Embedding, Flatten, Concatenate, Dense
from tensorflow.keras.models import Model

# Paths and directories
DATA_PATH = "../data/user_interactions.csv"
MODEL_DIR = "../models"
MODEL_PATH = os.path.join(MODEL_DIR, "content_recommender.h5")

# Ensure the models directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

def load_data(data_path):
    """Load user interaction data from CSV."""
    try:
        df = pd.read_csv(data_path)
        print(f"Loaded dataset with {df.shape[0]} rows and {df.shape[1]} columns.")
        return df
    except Exception as e:
        raise RuntimeError(f"Failed to load data from {data_path}: {e}")

def build_model(num_users, num_items, embedding_dim=50):
    """
    Build a two-input recommendation model.
    
    Parameters:
        num_users (int): Number of unique users.
        num_items (int): Number of unique items.
        embedding_dim (int): Dimension of the embedding vectors.
    
    Returns:
        model (tf.keras.Model): Compiled Keras model.
    """
    # User input branch
    user_input = Input(shape=(1,), name="user_input")
    user_embedding = Embedding(input_dim=num_users, output_dim=embedding_dim, input_length=1, name="user_embedding")(user_input)
    user_vec = Flatten(name="flatten_user")(user_embedding)

    # Item input branch
    item_input = Input(shape=(1,), name="item_input")
    item_embedding = Embedding(input_dim=num_items, output_dim=embedding_dim, input_length=1, name="item_embedding")(item_input)
    item_vec = Flatten(name="flatten_item")(item_embedding)

    # Concatenate the user and item vectors
    concatenated = Concatenate(name="concatenate")([user_vec, item_vec])
    
    # Dense layers for prediction
    dense = Dense(128, activation="relu", name="dense_1")(concatenated)
    dense = Dense(64, activation="relu", name="dense_2")(dense)
    output = Dense(1, activation="sigmoid", name="output")(dense)

    # Build and compile model
    model = Model(inputs=[user_input, item_input], outputs=output)
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
    return model

def main():
    # Load data
    data = load_data(DATA_PATH)
    
    # Preprocess data: compute number of users and items
    num_users = data["user_id"].nunique()
    num_items = data["content_id"].nunique()
    
    # Create training inputs
    user_ids = data["user_id"].values
    item_ids = data["content_id"].values
    ratings = data["interaction_score"].values
    
    print(f"Number of unique users: {num_users}")
    print(f"Number of unique items: {num_items}")
    
    # Build the recommendation model
    model = build_model(num_users, num_items, embedding_dim=50)
    model.summary()
    
    # Train the model
    try:
        model.fit([user_ids, item_ids], ratings, epochs=10, batch_size=32, validation_split=0.1)
    except Exception as e:
        raise RuntimeError(f"Training failed: {e}")
    
    # Save the trained model
    try:
        model.save(MODEL_PATH)
        print(f"✅ Model trained and saved successfully at {MODEL_PATH}")
    except Exception as e:
        raise RuntimeError(f"Failed to save model at {MODEL_PATH}: {e}")

if __name__ == "__main__":
    main()
