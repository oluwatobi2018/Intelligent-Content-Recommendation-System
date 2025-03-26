import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import os

# Define file paths
RAW_DATA_PATH = "../data/raw_user_interactions.csv"  # Input raw data file
PROCESSED_DATA_PATH = "../data/processed_user_interactions.csv"  # Output file

# Ensure the data folder exists
os.makedirs(os.path.dirname(PROCESSED_DATA_PATH), exist_ok=True)

def load_data():
    """ Load raw interaction data """
    try:
        df = pd.read_csv(RAW_DATA_PATH)
        print(f"✅ Loaded raw data: {df.shape[0]} rows, {df.shape[1]} columns")
        return df
    except FileNotFoundError:
        print("❌ Raw data file not found! Please ensure the file exists.")
        exit()

def clean_data(df):
    """ Handle missing values and drop duplicates """
    df.drop_duplicates(inplace=True)
    df.dropna(subset=['user_id', 'content_id', 'interaction_type'], inplace=True)
    print(f"✅ Cleaned data: {df.shape[0]} rows remaining")
    return df

def encode_data(df):
    """ Convert categorical variables to numerical representations """
    le_user = LabelEncoder()
    le_content = LabelEncoder()
    
    df["user_id"] = le_user.fit_transform(df["user_id"])
    df["content_id"] = le_content.fit_transform(df["content_id"])
    
    # Map interaction type to numerical score
    interaction_map = {
        "view": 1,
        "like": 2,
        "share": 3,
        "comment": 4
    }
    df["interaction_score"] = df["interaction_type"].map(interaction_map).fillna(0)
    
    print("✅ Encoded categorical data")
    return df

def normalize_data(df):
    """ Normalize interaction scores using MinMaxScaler """
    scaler = MinMaxScaler()
    df["interaction_score"] = scaler.fit_transform(df[["interaction_score"]])
    
    print("✅ Normalized interaction scores")
    return df

def save_data(df):
    """ Save the preprocessed data to a CSV file """
    df.to_csv(PROCESSED_DATA_PATH, index=False)
    print(f"✅ Processed data saved to {PROCESSED_DATA_PATH}")

def preprocess():
    """ Main preprocessing pipeline """
    df = load_data()
    df = clean_data(df)
    df = encode_data(df)
    df = normalize_data(df)
    save_data(df)

if __name__ == "__main__":
    print("🚀 Starting data preprocessing...")
    preprocess()
    print("🎯 Data preprocessing completed successfully!")
