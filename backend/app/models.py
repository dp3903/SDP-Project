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
	
class ResourceKeyWordEnum(str , Enum):
    PYTHON = "PYTHON",
    ANGULAR = "ANGULAR",
    SEABORN = "SEABORN",
    RUST = "RUST",
    COMPUTER_VISION = "COMPUTER_VISION",
    PYGAME = "PYGAME",
    NUMPY = "NUMPY",
    CLOUD_COMPUTING = "CLOUD_COMPUTING",
    UNITY = "UNITY",
    ALGORITHMS = "ALGORITHMS",
    UNREAL_ENGINE = "UNREAL_ENGINE",
    GO = "GO",
    SVELTE = "SVELTE",
    JAVASCRIPT = "JAVASCRIPT",
    FRONTEND = "FRONTEND",
    QT = "QT",
    GUI_DEVELOPMENT = "GUI_DEVELOPMENT",
    DATA_SCIENCE = "DATA_SCIENCE",
    POSTGRESQL = "POSTGRESQL",
    NESTJS = "NESTJS",
    MYSQL = "MYSQL",
    SPRITEKIT = "SPRITEKIT",
    SCENEKIT = "SCENEKIT",
    DESKTOP_APPLICATIONS = "DESKTOP_APPLICATIONS",
    AI = "AI",
    BIG_DATA = "BIG_DATA",
    ASP_NET_CORE = "ASP_NET_CORE",
    COCOS2D_X = "COCOS2D_X",
    KTOR = "KTOR",
    SQL = "SQL",
    IOS_DEVELOPMENT = "IOS_DEVELOPMENT",
    APACHE_HADOOP = "APACHE_HADOOP",
    PYTORCH = "PYTORCH",
    GAME_DEVELOPMENT = "GAME_DEVELOPMENT",
    NEXT_JS = "NEXT_JS",
    SWIFTUI = "SWIFTUI",
    NOSQL = "NOSQL",
    FIREBASE = "FIREBASE",
    JAKARTA_EE = "JAKARTA_EE",
    FIBER = "FIBER",
    MONGODB = "MONGODB",
    BLOCKCHAIN = "BLOCKCHAIN",
    REDIS = "REDIS",
    TENSORFLOW = "TENSORFLOW",
    WINFORMS = "WINFORMS",
    SWIFT = "SWIFT",
    KIVY = "KIVY",
    REACT = "REACT",
    FULL_STACK = "FULL_STACK",
    GRPC = "GRPC",
    DATABASES = "DATABASES",
    SCIKIT_LEARN = "SCIKIT_LEARN",
    OPERATING_SYSTEM = "OPERATING_SYSTEM",
    APACHE_SPARK = "APACHE_SPARK",
    EMBEDDED_SYSTEMS = "EMBEDDED_SYSTEMS",
    PANDAS = "PANDAS",
    UI_UX = "UI_UX",
    WPF = "WPF",
    KUBERNETES = "KUBERNETES",
    JAVA = "JAVA",
    NATURAL_LANGUAGE_PROCESSING = "NATURAL_LANGUAGE_PROCESSING",
    SPRING_BOOT = "SPRING_BOOT",
    MACHINE_LEARNING = "MACHINE_LEARNING",
    GIN = "GIN",
    LIBGDX = "LIBGDX",
    JETPACK_COMPOSE = "JETPACK_COMPOSE",
    DEVOPS = "DEVOPS",
    C = "C",
    MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
    THREE_JS = "THREE_JS",
    UIKIT = "UIKIT",
    ML_NET = "ML_NET",
    CYBERSECURITY = "CYBERSECURITY",
    IOT = "IOT",
    FLASK = "FLASK",
    KOA = "KOA",
    ROCKET = "ROCKET",
    NETWORK = "NETWORK",
    BACKEND = "BACKEND",
    VUE_JS = "VUE_JS",
    FASTAPI = "FASTAPI",
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
    CUDA = "CUDA",
    DJANGO = "DJANGO",
    HIGH_PERFORMANCE_COMPUTING = "HIGH_PERFORMANCE_COMPUTING",
    SQLITE = "SQLITE",
    DATA_STRUCTURES = "DATA_STRUCTURES",
    KOTLIN = "KOTLIN",
    NUXT_JS = "NUXT_JS",
    EXPRESS_JS = "EXPRESS_JS",
    MATPLOTLIB = "MATPLOTLIB",
    VAPOR = "VAPOR",
    SFML = "SFML"



class InteractionTypeEnum(str,Enum):
	like = "like"
	click = "click"
	reviewed = "reviewed"
	
class UserPrefrences(BaseModel):
	skillLevel : SkillLevelEnum
	preferredFormat : List[ResourceFormatEnum]
	interests : List[ResourceKeyWordEnum]

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
	url : str 
	platform : str # youtube , coursera , offical docs , author name if the book 
	tags : List[ResourceKeyWordEnum] # list of keyword assoiciated with Resources
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
	sentimentLabel : Optional[str] =Field(None)
	sentimentScore : Optional[float] =Field(None)

class RoadmapModel(BaseModel):
	id : Optional[str] = Field(None,alias="_id")
	title : str 
	userId : str 
	completed : List[ResourceModel] # contains index of the completed resources 
	remaining : List[ResourceModel]
	ongoing : List[ResourceModel]	
	createdAt : datetime 
	progress : float = Field(ge=0,le=100) 
	
