from fastapi import FastAPI 
import numpy as np 
import json
import asyncio
import os
from pymongo import MongoClient 
from dotenv import load_dotenv
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


@app.get("/")
async def root():
    return "rec_server is running"

@app.get("/api/recommendations/{userId}")
async def get_recommendations(userId):
    user_int_id = user_map.get(userId,-1)
    idx = user_int_id-1
    if idx<0 or idx>=user_matrix.shape[0]:
        return {"error": "Invalid user id"}
    resource_score_list = await asyncio.to_thread(np.dot,user_matrix[idx],resource_matrix.T)
    resource_intIds = await asyncio.to_thread(lambda: np.argsort(resource_score_list)[-10:][::-1].tolist())
    resource_id_list = list()
    for resource_id in resource_intIds:
        resource_id_list.append(resource_map[str(resource_id+1)])
    resources = list(collection.find({'_id':{'$in':resource_id_list}}))
    print(resources)
    return {"resource_ids":resources} 

@app.get("/api/reload_files")
async def reload_files():
    global user_matrix,resource_matrix,user_map,resource_map 
    user_matrix = await asyncio.to_thread(np.load,"shared_files/user_matrix.npy")
    resource_matrix = await asyncio.to_thread(np.load,"shared_files/resource_matrix.npy")
    user_map = await asyncio.to_thread(lambda : json.load(open("shared_files/user_mappings.json")))
    resource_map = await asyncio.to_thread(lambda : json.load(open("shared_files/resource_mappings.json")))
    return {"msg":"files reloaded successfully"}

@app.on_event("startup")
async def init_server():
    print("starting rec_server")




