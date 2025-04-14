# 📚 Online Learning Resource Recommendation System

A smart, personalized learning recommendation system that helps students find the most relevant educational resources based on their interests, behavior, and global trends. Built using a hybrid model of Content-Based and Collaborative Filtering techniques.


---


## 📌 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Implemented Algorithms](#implemented-algorithms)
- [How It Works](#how-it-works)
- [Performance & Testing](#performance--testing)
- [Future Improvements](#future-improvements)
- [Detailed Project Report](https://docs.google.com/document/d/1Wk8Hguq3Nv0TKDjVvt3qmy88_iRDB8uhZGq21S8BFVE/edit?usp=sharing)
---

## 📖 Overview

In today's digital age, students are overwhelmed with countless online learning resources. This project solves that problem by using AI-driven techniques to **recommend the most relevant courses and tutorials** to users — making learning more personalized and efficient.

---

## ✨ Features

- ✅ Content-Based Filtering using NLP (TF-IDF + Cosine Similarity)
- ✅ Collaborative Filtering via Matrix Factorization
- ✅ Dynamic Hybrid Recommendation System
- ✅ Cold Start problem handling
- ✅ Trending resource engine
- ✅ JWT-based Authentication
- ✅ Sentiment analysis integration
- ✅ Admin panel with resource/user management
- ✅ RESTful API using FastAPI

---

## 🛠 Tech Stack

| Category       | Tools/Frameworks                 |
|----------------|----------------------------------|
| Backend        | Python, FastAPI                  |
| Machine Learning | scikit-learn, NumPy, Pandas     |
| Database       | MongoDB                          |
| Storage        | JSON, NumPy files                |
| Libraries      | TF-IDF, Cosine Similarity, SciPy |
| Authentication | JWT                             |

---

## 📊 Implemented Algorithms

### 🔹 1. Content-Based Filtering
- TF-IDF vectorization of resource metadata (titles + tags)
- Cosine similarity for finding related resources
- Boltzmann distribution to weigh recent user interactions more heavily

### 🔹 2. Collaborative Filtering
- Matrix Factorization-based user-resource interaction scoring
- Uses precomputed NumPy matrices for fast lookup
- Sigmoid-based transition from content to collaborative for cold start

### 🔹 3. Hybrid System
- Dynamic blending of both methods using:
- Final Recommendation = (1 - α) * Content-Based + α * Collaborative
- `α` calculated using sigmoid based on number of user interactions

### 🔹 4. Trending Resources
- Analyzes recent global user interactions to recommend hot/trending topics

  ---

## 🔄 How It Works

1. User logs in and gets a JWT token
2. Token is used to fetch personalized recommendations
3. Recommendation engine uses:
 - TF-IDF (content-based)
 - Matrix Factorization (collaborative)
 - Blending logic (hybrid)
4. Admin can manage users and resources
5. System adapts based on user behavior over time

---

**Metrics Used:**
- `Precision@K`
- `Recall@K`
- `F1-score`

**Key Observations:**
- Hybrid model outperformed individual models
- Cold start handled well via content-based start
- Trending system effectively reflected user interests

---

## 🚀 Future Improvements

- 🔄 Implement Approximate Nearest Neighbors (ANN) for faster similarity checks
- 🤝 Add real-time user feedback for active learning
- 🧠 Use user profile metadata for better cold start handling

