from fastapi import APIRouter , HTTPException
from app.database import db 
from app.models import ReviewModel 
from typing import List 
import uuid 

reviewRouter = APIRouter()

@reviewRouter.post("/",response_model=ReviewModel)
async def create_review(review : ReviewModel):
	review.id = str(uuid.uuid4())[:8]
	result = await db.reviews.insert_one(review.dict(by_alias=True))
	new_review = await db.reviews.find_one({"_id":result.inserted_id})
	return new_review

@reviewRouter.get("/users/{userId}",response_model=List[ReviewModel])
async def get_review_by_userId(userId:str):
	reviews = await db.reviews.find({"userId":userId}).to_list(None)
	if not reviews :
		raise HTTPException(status_code=404,detail="no reviews found by this user")
	return reviews 

@reviewRouter.get("/resources/{resourceId}",response_model=List[ReviewModel])
async def get_review_by_resourceId(resourceId : str):
	reviews = await db.reviews.find({"resourceId":resourceId}).to_list(None)
	if not reviews :
		raise HTTPException(status_code=404,detail="no reviews found for this resource")
	return reviews

