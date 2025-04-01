# app/routes/UserRouter.py

from fastapi import APIRouter , HTTPException ,Request
from bson import ObjectId 
from app.database import db
from app.models import UserModel
from pymongo import ReturnDocument
from passlib.context import CryptContext
import uuid 
from typing import List
from app.utils import delete_user_mapping


userRouter = APIRouter()
pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")


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
	delete_user_mapping(userId)
	return {"message":"User Deleted Succesfully"}

@userRouter.put("/{userId}")
async def update_user(userId : str,request:Request):
	user_dict = await request.json()
	user_dict.pop('_id', None) # _id is immutable so remove it 
	if 'password' in user_dict:
		user_dict['password'] = pswd_context.hash(user_dict['password'])
	updated_user = await db.users.find_one_and_update({"_id" : userId},{"$set" : user_dict},return_document=ReturnDocument.AFTER)
	if updated_user : 
		return {"updated_user":updated_user}
	else :
		raise HTTPException(status_code=404,detail="User not Found")
