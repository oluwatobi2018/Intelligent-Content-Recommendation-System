import re
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

def clean_text(text):
    """Preprocess text by removing special characters and stopwords."""
    text = re.sub(r"\W+", " ", text).lower()
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return " ".join(words)
