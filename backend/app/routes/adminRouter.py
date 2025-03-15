# app/routes/UserRouter.py

from fastapi import APIRouter , HTTPException , Request
from bson import ObjectId 
from app.database import db
from app.models import UserModel, ResourceModel
from pymongo import ReturnDocument
from passlib.context import CryptContext
import uuid 
from typing import List
from app.utils import add_new_resource, update_resource_mapping, delete_resource_mapping, delete_user_mapping


adminRouter = APIRouter()
pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

	
@adminRouter.get("/userList")
async def get_all_users(request: Request):
	if request.state.username != "__admin__":
		raise HTTPException(status_code=401,details="Unauthorized")
	users = await db.users.find().to_list(None)
	if not users:
		raise HTTPException(status_code=404,detail="Users not Found")
	return users

@adminRouter.get("/resourceList")
async def get_all_resources(request: Request):
	if request.state.username != "__admin__":
		raise HTTPException(status_code=401,details="Unauthorized")
	resources = await db.resources.find().to_list(None)
	if not resources :
		raise HTTPException(status_code=404,detail="resources not found")
	return resources

@adminRouter.delete("/resource/{resourceId}")
async def delete_resource(request: Request,resourceId : str):
	if request.state.username != "__admin__":
		raise HTTPException(status_code=401,details="Unauthorized")
	# try:
	# 	body = await request.json()
	# except Exception:
	# 	raise HTTPException(status_code=400, detail="Invalid or missing JSON body")
	# resourceId = body.get("resourceId")
	result = await db.resources.delete_one({"_id":resourceId})
	if result.deleted_count==0:
		raise HTTPException(status_code=404,detail="Resource not Found")
	delete_resource_mapping(resourceId)
	return {"message":"Resource Deleted Succesfully"}

@adminRouter.post("/resource",response_model=ResourceModel)
async def create_resource(request: Request):
	if request.state.username != "__admin__":
		raise HTTPException(status_code=401,details="Unauthorized")
	try:
		body = await request.json()
	except Exception:
		raise HTTPException(status_code=400, detail="Invalid or missing JSON body")
	resource: ResourceModel
	resource = ResourceModel.parse_obj(body)
	resource.id = str(uuid.uuid4())[:8]
	result = await db.resources.insert_one(resource.dict(by_alias=True))
	new_resource = await db.resources.find_one({"_id":result.inserted_id})
	add_new_resource()
	update_resource_mapping(new_resource["_id"])
	return new_resource

@adminRouter.delete("/user/{userId}")
async def delete_user(userId: str, request: Request):
	if request.state.username != "__admin__":
		raise HTTPException(status_code=401,details="Unauthorized")
	
	result = await db.users.delete_one({"_id" : userId})
	if result.deleted_count == 0:
			raise HTTPException(status_code=404,detail="User not Found")
	delete_user_mapping(userId)
	return {"message":"User Deleted Succesfully"}