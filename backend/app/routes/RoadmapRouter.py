from fastapi import APIRouter , HTTPException
from typing import List
from app.models import RoadmapModel,ResourceModel
from app.database import db
from pymongo import ReturnDocument
import uuid 

roadmapRouter = APIRouter()

@roadmapRouter.get("/{userId}",response_model=List[RoadmapModel])
async def get_all_roadmaps_by_userId(userId : str):
	roadmaps = await db.roadmaps.find({"userId":userId})
	if not roadmaps:
		raise HTTPException(status_code=404,detail="No Roadmap Found")
	return roadmaps

@roadmapRouter.post("/",response_model=RoadmapModel)
async def create_roadmap(roadmap:RoadmapModel):
	roadmap.id = str(uuid.uuid4())[:8]
	result = await db.roadmaps.insert_one(roadmap.dict(by_alias=True))
	new_roadmap = await db.roadmaps.find_one({"_id":result.inserted_id})
	return new_roadmap

@roadmapRouter.put("/{roadmapId}",response_model=RoadmapModel)
async def update_roadmap_by_id(roadmapId:str,roadmap:RoadmapModel):
	roadmap_dict = roadmap.dict(by_alias=True)
	roadmap_dict.pop('_id',None)
	updated_roadmap = await db.roadmaps.find_one_and_update({"_id":roadmapId},{"$set":roadmap_dict},return_document=ReturnDocument.AFTER)
	if updated_roadmap :
		return {"updated_roadmap":updated_roadmap}
	else : 
		raise HTTPException(status_code=404,detail="Something went wrong please try again later")

@roadmapRouter.delete("/{roadmapId}")
async def delete_roadmap_by_id(roadmapId):
	result = await db.roadmaps.delete_one({"_id":roadmapId})
	if result.deleted_count == 0:
		raise HTTPException(status_code=404,detail="roadmap not found")
	return {"message":"roadmap deleted succesfully"}
	
