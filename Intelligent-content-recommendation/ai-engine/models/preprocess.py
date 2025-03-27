import re
import nltk
from nltk.corpus import stopwords

# Download stopwords only if not already downloaded
nltk.download("stopwords", quiet=True)
stop_words = set(stopwords.words("english"))

def clean_text(text: str) -> str:
    """
    Preprocess text by removing special characters and stopwords.

    Parameters:
        text (str): The input string to be cleaned.

    Returns:
        str: The cleaned text with special characters removed, lowercased,
             and without common English stopwords.
    """
    # Remove all non-word characters (punctuation, special symbols, etc.)
    text = re.sub(r"\W+", " ", text)
    # Convert the text to lowercase for normalization
    text = text.lower()
    # Tokenize the text into words
    words = text.split()
    # Filter out stopwords from the token list
    words = [word for word in words if word not in stop_words]
    # Rejoin the words into a single string and return
    return " ".join(words)
