# app/models.py 

from pydantic import BaseModel,EmailStr,Field
from typing import List,Optional
from datetime import datetime 
from enum import Enum

class SkillLevelEnum(str,Enum):
	beginner = "beginner"
	intermediate = "intermediate"
	advanced = "advanced"

class ResourceFormatEnum(str,Enum):
	video = "video"
	blog = "blog"
	pdf = "pdf"
	
class ResourceCategoryEnum(str , Enum):
	frontend = "frontend"
	backend = "backend"
	fullstack = "fullstack"
	machineLearning = "machineLearning"
	ai = "ai"
	dsa = "dsa"
	algorithms = "algorithms"
	dbms = "dbms"
	operatingSystem = "operatingSystem"
	networking = "networking"
	devops = "devops"
	blockchain = "blockchain"
	mobiledev = "mobiledev"
	IoT = "IoT"

class InteractionTypeEnum(str,Enum):
	like = "like"
	click = "click"
	saved = "saved"
	
class UserPrefrences(BaseModel):
	skillLevel : SkillLevelEnum
	preferredFormat : List[ResourceFormatEnum]
	interests : List[ResourceCategoryEnum] 

class UserModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	name : str
	email : EmailStr
	password : str 
	prefrences : UserPrefrences
	joinedat : datetime 
	lastlogin : Optional[datetime] = None
 
class ResourceModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	title : str 
	type : ResourceFormatEnum
	category : ResourceCategoryEnum 
	url : str 
	platform : str # youtube , coursera , offical docs , author name if the book 
	tags : List[str] # list of keyword assoiciated with Resources
	averageRating : float
	no_of_reviews : float = Field(0,ge=0)

class InteractionModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	userId : str 
	resourceId : str
	interactionType : InteractionTypeEnum
	timestamp : datetime
	
class ReviewModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	userId : str
	username : str
	resourceId : str 
	rating : float =Field(ge=0,le=5)
	comment : str 
	timestamp : datetime

class RoadmapModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	title : str 
	userId : str 
	resourceList : List[ResourceModel]
	createdAt : datetime 
	progress : float = Field(ge=0,le=100) 
	
