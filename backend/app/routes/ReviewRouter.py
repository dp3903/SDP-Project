from fastapi import APIRouter , HTTPException
from app.database import db 
from app.models import ReviewModel , InteractionModel , InteractionTypeEnum
from typing import List 
from datetime import datetime
from app.helpers.sentiment_analysis import analyze_sentiment
import uuid 

reviewRouter = APIRouter()

@reviewRouter.post("/",response_model=ReviewModel)
async def create_review(review : ReviewModel):
	review.id = str(uuid.uuid4())[:8]
	sentiment_result = analyze_sentiment(review.comment)
	review.sentimentLabel = sentiment_result['sentiment']
	review.sentimentScore = sentiment_result['score']
	result = await db.reviews.insert_one(review.dict(by_alias=True))
	new_review = await db.reviews.find_one({"_id":result.inserted_id})
	# interaction = InteractionModel(
	# 	id = str(uuid.uuid4())[:8],
	# 	userId = review.userId,
	# 	resourceId =review.resourceId,
	# 	interactionType=InteractionTypeEnum.reviewed,
	# 	timestamp = datetime.now())
	# await db.interactions.insert_one(interaction.dict(by_alias=True))
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

