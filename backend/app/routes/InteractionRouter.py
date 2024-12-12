from fastapi import APIRouter , HTTPException 
from typing import List 
from app.database import db 
from app.models import InteractionModel
import uuid 

interactionRouter = APIRouter()

@interactionRouter.post("/",response_model=InteractionModel)
async def create_interacction(interaction : InteactionModel):
	interaction.id = str(uuid.uuid4())[:8]
	result = await db.interactions.insert_one(interaction.dict(by_alias=True))
	new_interaction = await db.interactions.find_one({"_id":result.inserted_id})
	return new_interaction

@interactionRouter.get("/{userId}",response_model=List[InteractionModel])
async def get_interaction_by_user(userId : str):
	interactions = await db.interactions.find({"userId":userId}).to_list(None)
	if not interactions :
		raise HTTPException(status_code=404,detail="no interactions found by this user")
	return interactions 

@interactionsRouter.get("/{resourceId}",response_model=List[InteractionModel])
async def get_interaction_by_resource(resourceId : str):
	interactions = await db.interactions.find({"resourceId":resourceId}).to_list(None)
	if not interactions :
		raise HTTPException(status_code=404,detail="no interaction found for this resource")
	return interactions 

