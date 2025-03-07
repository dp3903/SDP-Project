from fastapi import APIRouter , HTTPException
from fastapi.responses import JSONResponse
from app.database import db 
from app.models import ResourceModel
from typing import List
from fuzzywuzzy import process
resourceRouter = APIRouter()


@resourceRouter.get("/search")
async def search(q: str = None):
	if q is None:
		return JSONResponse(status_code=401,content={"detail":"Please provide a search value!"})
	
	resources = await db.resources.find().to_list(None)
	titles = [doc["title"] for doc in resources]
	matches = process.extract(q, titles, limit=10)
	matches = [item[0] for item in matches]
	# print(matches)
	matches = [res for res in resources if res["title"] in matches]
	return matches

@resourceRouter.get("/{resourceId}",response_model=ResourceModel)
async def get_resource(resourceId : str):
	resource = await db.resources.find_one({"_id":resourceId})
	if not resource:
		raise HTTPException(status_code=404,detail="Resource not found")
	return resource
