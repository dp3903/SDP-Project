from fastapi import APIRouter , HTTPException ,Request
from typing import List
from app.models import RoadmapModel,ResourceModel
from app.database import db
from pymongo import ReturnDocument
import uuid 

roadmapRouter = APIRouter()

@roadmapRouter.get("/{userId}")
async def get_all_roadmaps_by_userId(userId : str):
	roadmaps = await db.roadmaps.find({"userId": userId}).to_list(None) 
	if not roadmaps:
		raise HTTPException(status_code=404,detail="No Roadmap Found")
	return roadmaps

@roadmapRouter.post("/",response_model=RoadmapModel)
async def create_roadmap(roadmap:RoadmapModel):
	roadmap.id = str(uuid.uuid4())[:8]
	result = await db.roadmaps.insert_one(roadmap.dict(by_alias=True))
	new_roadmap = await db.roadmaps.find_one({"_id":result.inserted_id})
	return new_roadmap

@roadmapRouter.put("/{roadmapId}")
async def update_roadmap_by_id(roadmapId:str,roadmap:Request):
	roadmap_dict =await roadmap.json()
	print(roadmap_dict)
	roadmap_dict.pop('_id',None)
	updated_roadmap = await db.roadmaps.find_one_and_update({"_id":roadmapId},{"$set":roadmap_dict},return_document=ReturnDocument.AFTER)
	print(updated_roadmap)
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
	
