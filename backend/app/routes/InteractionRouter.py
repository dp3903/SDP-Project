from fastapi import APIRouter , HTTPException 
from typing import List 
from app.database import db 
from app.models import InteractionModel
import uuid
import threading
from app.utils import process_new_interaction

interactionRouter = APIRouter()

@interactionRouter.post("/",response_model=InteractionModel)
async def create_interacction(interaction : InteractionModel):
	interaction.id = str(uuid.uuid4())[:8]
	already_created = await db.interactions.find_one({"userId" : interaction.userId , "resourceId" : interaction.resourceId , "interactionType" : interaction.interactionType})
	if not already_created:
		result = await db.interactions.insert_one(interaction.dict(by_alias=True))
		new_interaction = await db.interactions.find_one({"_id":result.inserted_id})
		thread = threading.Thread(target=process_new_interaction, args=(new_interaction))
		thread.start()
		return new_interaction
	else:
		return already_created

@interactionRouter.get("/users/{userId}",response_model=List[InteractionModel])
async def get_interaction_by_user(userId : str):
	interactions = await db.interactions.find({"userId":userId}).to_list(None)
	if not interactions :
		raise HTTPException(status_code=404,detail="no interactions found by this user")
	return interactions 

@interactionRouter.get("/resources/{resourceId}",response_model=List[InteractionModel])
async def get_interaction_by_resource(resourceId : str):
	interactions = await db.interactions.find({"resourceId":resourceId}).to_list(None)
	if not interactions :
		raise HTTPException(status_code=404,detail="no interaction found for this resource")
	return interactions 

@interactionRouter.delete("/{interactionId}")
async def delete_interaction_by_id(interactionId : str):
	result = await db.interactions.delete_one({"_id":interactionId})
	if result.deleted_count == 0:
		raise HTTPException(status_code=404,detail="interaction not Found")
	return {"message":"interaction deleted succesfully"}
	