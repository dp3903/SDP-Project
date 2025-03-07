from fastapi import FastAPI, HTTPException
import numpy as np 
import json
import asyncio
import os
from pymongo import MongoClient 
from dotenv import load_dotenv
import random
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import math
from collections import defaultdict
import scipy.stats as stats

load_dotenv()


MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URL or not DATABASE_NAME:
    raise ValueError("Provide appropriate URL and DB name")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]
collection = db["resources"]
app = FastAPI()

#model matrices 
user_matrix = np.load("shared_files/user_matrix.npy")
resource_matrix = np.load("shared_files/resource_matrix.npy")

#mapping objects 
user_map = None 
with open("shared_files/user_mappings.json") as f:
    user_map = json.load(f)
resource_map = None 
with open("shared_files/resource_mappings.json") as f:
    resource_map = json.load(f)

# dataframe and similarity matrix
df = pd.DataFrame(db.resources.find())
df = df.astype({'no_of_reviews': 'int64', 'averageRating': 'float64', 'title': pd.StringDtype(), 'tags': pd.StringDtype(), 'url': pd.StringDtype(), 'platform': pd.StringDtype(), 'type': pd.StringDtype()})
tfidf = TfidfVectorizer(stop_words='english')
resource_similarity_matrix = tfidf.fit_transform(df['title'] + ' ' + df['tags'])


@app.get("/")
async def root():
    return "rec_server is running"

@app.get("/api/recommendations/{userId}")
async def get_recommendations(userId):
    resource_intIds = await get_merged_recommendations(userId)
    if not resource_intIds or type(resource_intIds) is not list:
        raise HTTPException(status_code=500,detail="Error: some unkown error occured.")
    resource_id_list = list()
    for resource_id in resource_intIds:
        resource_id_list.append(resource_map[str(resource_id+1)])
    resources = list(collection.find({'_id':{'$in':resource_id_list}}))
    random.shuffle(resources)
    # print(resource_id_list)
    return {"recommended_resources":resources}

@app.get("/api/trending")
async def get_trending(count=10,history=20):
    # get last few resources from all sorted on timestamp with highest interaction value for liking/rating/commenting i.e 2-3-4
    # count = no. of resources required
    # history = no. of interactions to check

    # step-1 get latest interactions from now
    interactions = db.interactions.find({'interactionType': {'$in': ['like','reviewed']}}).sort('timestamp', -1).limit(history)
    interactions = list(interactions)
    # interactions

    # step-2 for all the involved resources, get their tags
    tags = []
    for i in interactions:
        rt = db.resources.find_one({'_id': i['resourceId']})
        tags += (rt['tags'])
    # tags

    # step-3 find the most common keywords and plug them to cosine_similarity like in the get_similar_resources function
    frequency_map = defaultdict(int)  
    for t in tags:
        frequency_map[t.lower()] += 1
    frequency_map = dict(sorted(frequency_map.items(), key=lambda item: item[1], reverse=True))
    keywords = list(frequency_map.keys())[:5]  # for top 5 topics
    resource_intIds = []
    for kw in keywords:
        resource_intIds += get_similar_resources(kw,top_n=2)
    resource_intIds = list(set(resource_intIds))[:count]

    # step-4 the returned resources can be considered trending topics' resources
    resource_id_list = list()
    for resource_id in resource_intIds:
        resource_id_list.append(resource_map[str(resource_id+1)])
    resources = list(collection.find({'_id':{'$in':resource_id_list}}))
    return resources

@app.get("/api/reload_files")
async def reload_files():
    global user_matrix,resource_matrix,user_map,resource_map 
    user_matrix = await asyncio.to_thread(np.load,"shared_files/user_matrix.npy")
    resource_matrix = await asyncio.to_thread(np.load,"shared_files/resource_matrix.npy")
    user_map = await asyncio.to_thread(lambda : json.load(open("shared_files/user_mappings.json")))
    resource_map = await asyncio.to_thread(lambda : json.load(open("shared_files/resource_mappings.json")))
    return {"msg":"files reloaded successfully"}


# to see user interactions
# @app.get("/api/test/{userId}")
# async def test(userId):
#     it = db.interactions.find({'userId':userId}).to_list(None)
#     rec = []
#     for i in it:
#         rec.append(db.resources.find_one({'_id': i['resourceId']}))
#     return rec



# to add dummy interactions
# @app.get("/api/go")
# async def fun1():
#     class InteractionTypeEnum(str,Enum):
#         like = "like"
#         click = "click"
#         reviewed = "reviewed"
#     class InteractionModel(BaseModel):
#         id : Optional[str] = Field(None,alias="_id")
#         userId : str 
#         resourceId : str
#         interactionType : InteractionTypeEnum
#         timestamp : datetime
#     interactions = []
#     num_entries=100
#     for _ in range(num_entries):
#         userId = random.randint(1, 10)
#         interaction = InteractionModel(
#             _id=str(uuid.uuid4())[:8],
#             userId=str([key for key,val in user_map.items() if val == userId][0]),
#             resourceId=str(resource_map[str(random.randint(1, 7239) - 1)]),
#             interactionType=random.choice(list(InteractionTypeEnum)),
#             timestamp=datetime.utcnow() - timedelta(days=random.randint(0, 365))
#         )
#         interactions.append(interaction.dict(by_alias=True))

#     # interactions = await db.interactions.insert_many(interactions, ordered=False)
#     interactions = db.interactions.find().to_list(None)
#     # interactions = db.interactions.delete_many({})
#     return interactions


async def get_merged_recommendations(userId,items_needed = 10, interaction_threshold = 10):
    form_items = await get_form_based(userId, top_n=2*items_needed)
    content_items = await get_content_based(userId, top_n=2*items_needed)
    # print(form_items)
    # print(content_items)
    n_interactions = db.interactions.count_documents({'userId': userId})
    # print(n_interactions)
    alpha_1 = min(1, (n_interactions / interaction_threshold))
    if alpha_1>0: 
        new_content_items = form_items[:math.floor(len(form_items)(1-alpha_1))] + content_items[:math.floor(len(form_items)(alpha_1))]
    else:
        new_content_items = form_items
        
    if(n_interactions <= interaction_threshold):
        random.shuffle(new_content_items)
        new_content_items = new_content_items[:items_needed]
        # print(new_content_items)
        # return
        return new_content_items

    x = (n_interactions / interaction_threshold) - 1
    x = 1 - math.exp(-x)
    alpha_2 = 0.5 * x               # this parameter represents fraction of collaborative recommendations on saturation
    user_items = await get_collaborative(userId, top_n=2*items_needed)
    # print(user_items)
    recommendations = new_content_items[:math.floor(len(new_content_items)*(1-alpha_2))] + user_items[:math.floor(len(user_items)*(alpha_2))]
    random.shuffle(recommendations)
    recommendations = recommendations[:items_needed]
    # print(recommendations)
    return recommendations

async def get_form_based(userId, top_n = 10):
    user = db.users.find_one({ "_id": userId })
    if not user:
        raise HTTPException(status_code=404,detail="User not Found with Given userId")
    keywords = ''
    for k in user['prefrences']['interests']:
        keywords += k
    # print(keywords)
    recommendations = get_similar_resources(keywords, top_n=top_n)
    return recommendations

async def get_collaborative(userId, top_n = 10):
    user_int_id = user_map.get(userId,-1)
    idx = user_int_id-1
    if idx<0 or idx>=user_matrix.shape[0]:
        raise HTTPException("Invalid user ID")
    resource_score_list = await asyncio.to_thread(np.dot,user_matrix[idx],resource_matrix.T)
    resource_intIds = await asyncio.to_thread(lambda: np.argsort(resource_score_list)[-1*top_n:][::-1].tolist())
    return resource_intIds

async def get_content_based(userId,top_n = 10):
    interactions = db.interactions.find({'userId': userId}).to_list(None)
    if not interactions :
        return None
    
    # print(interactions)
    # return interactions

    recommendations = set()
    int_count = len(interactions)
    weights = get_weights(int_count,top_n)
    for index,w in enumerate(weights):
        it = interactions[index]
        res_id = int([key for key,val in resource_map.items() if val == it['resourceId']][0])
        recommendations = recommendations.union(set(get_similar_resources(res_id, top_n = w)))
        
    # print(recommendations)
    return list(recommendations)[:top_n]

# Create a function to get similar resources based on a resource index or keywords
def get_similar_resources(resource: str|int, top_n=10):
    # Compute cosine similarity for one resource against all others
    similar_indices = []
    if type(resource) is str:
      sim_scores = cosine_similarity(tfidf.transform([resource]), resource_similarity_matrix).flatten()
      # Get indices sorted by similarity score
      similar_indices = sim_scores.argsort()[::][1:top_n+1]  # Skip the resource itself
    elif type(resource) is int:
      sim_scores = cosine_similarity(resource_similarity_matrix[resource], resource_similarity_matrix).flatten()
      # Get indices sorted by similarity score
      similar_indices = sim_scores.argsort()[::-1][1:top_n+1]  # Skip the resource itself    

    return list(similar_indices) # convert to list for return

# function for weight distribution of interactions
@app.get("/api/weights/{buckets}/{net}")
def get_weights(buckets: int, net: int):
    w = [1] * buckets
    if buckets < net:
        return w
    w = [0] * buckets
    low = 0
    high = buckets - 1
    lambda_ = 5 / buckets
    k = high - low  # The number of states
    samples = stats.boltzmann.rvs(lambda_, N=buckets, size=net)  # Generate Boltzmann-distributed random values
    samples = np.clip(samples, 0, k - 1)  # Ensure samples stay within range
    samples = (samples + low).tolist()  # Shift samples to match the given range
    s = 0
    for i in samples:
        if s >= net:
            break
        w[i] += 1
        s += 1
    return w


@app.on_event("startup")
async def init_server():
    print("starting rec_server")