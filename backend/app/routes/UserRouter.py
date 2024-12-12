# app/routes/UserRouter.py

from fastapi import APIRouter , HTTPException
from bson import ObjectId 
from app.database import db
from app.models import UserModel
from pymongo import ReturnDocument
import uuid 
userRouter = APIRouter()

@userRouter.post("/",response_model=UserModel)
async def create_user(user : UserModel):
	user.id = str(uuid.uuid4())[:8] #generates new str id every time new user is created 
	result = await db.users.insert_one(user.dict(by_alias=True))
	new_user = await db.users.find_one({ "_id" : result.inserted_id})
	return new_user

@userRouter.get("/{userId}",response_model=UserModel)
async def get_user(userId : str):
	user = await db.users.find_one({ "_id": userId })
	if not user:
		raise HTTPException(status_code=404,detail="User not Found with Given userId")
	return user

@userRouter.delete("/{userId}")
async def delete_user(userId : str):
	result = await db.users.delete_one({"_id" : userId})
	if result.deleted_count == 0:
			raise HTTPException(status_code=404,detail="User not Found")	
	return {"message":"User Deleted Succesfully"}

@userRouter.put("/{userId}")
async def update_user(userId : str,user:UserModel):
	user_dict = user.dict(by_alias=True)
	user_dict.pop('_id', None) # _id is immutable so remove it 
	updated_user = await db.users.find_one_and_update({"_id" : userId},{"$set" : user_dict},return_document=ReturnDocument.AFTER)
	if updated_user : 
		return {"updated_user":updated_user}
	else :
		raise HTTPException(status_code=404,detail="User not Found")

