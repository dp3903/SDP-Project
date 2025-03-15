import nltk 
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer

# Initialize sentiment analyzer
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(comment_text: str):
    """Analyzes sentiment and returns sentiment label & score."""
    score = sia.polarity_scores(comment_text)

    # Assign sentiment based on compound score
    if score['compound'] >= 0.05:
        sentiment = "positive"
    elif score['compound'] <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return {"sentiment": sentiment, "score": score['compound']}
