from fastapi import APIRouter , HTTPException
from app.database import db 
from app.models import ResourceModel
from typing import List
import uuid
resourceRouter = APIRouter()

@resourceRouter.post("/",response_model=ResorceModel)
async def create_resource(resource : ResourceModel):
	resource.id = str(uuid.uuid4())[:8]
	result = await db.resources.insert_one(resource.dict(by_alias=True))
	new_resource = await db.resources.find_one({"_id":result.inserted_id})
	return new_resource

@resourceRouter.get("/{resourceId}",response_model=ResourceModel)
async def get_resource(resourceId : str):
	resource = awair db.resources.find_one({"_id":resourceId})
	if not resource:
		raise HTTPException(status_code=404,detail="Resource not found")
	return resource

@resourceRouter.get("/",response_model=List[ResourceModel])
async def get_all_resources():
	resources = await db.resources.find().to_list(None)
	if not resources :
		raise HTTPException(status_code=404,detail="resources not found")
	return resources


