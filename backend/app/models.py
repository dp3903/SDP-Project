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
    AMETHYST = "AMETHYST"
    SWIFTUI = "SWIFTUI"
    OPENMP = "OPENMP"
    UI_UX = "UI_UX"
    KTOR = "KTOR"
    ML_NET = "ML_NET"
    NOSQL = "NOSQL"
    IOT = "IOT"
    AI = "AI"
    ANGULAR = "ANGULAR"
    GAME_DEVELOPMENT = "GAME_DEVELOPMENT"
    BACKEND = "BACKEND"
    UNITY = "UNITY"
    ROCKET = "ROCKET"
    SQLITE = "SQLITE"
    NUXT_JS = "NUXT_JS"
    JAKARTA_EE = "JAKARTA_EE"
    MACHINE_LEARNING = "MACHINE_LEARNING"
    APACHE_HADOOP = "APACHE_HADOOP"
    COCOS2D_X = "COCOS2D_X"
    FLASK = "FLASK"
    UNREAL_ENGINE = "UNREAL_ENGINE"
    WINFORMS = "WINFORMS"
    MONGODB = "MONGODB"
    SPRING_BOOT = "SPRING_BOOT"
    GO = "GO"
    CLOUD_MICROSERVICES = "CLOUD_MICROSERVICES"
    OPERATING_SYSTEM = "OPERATING_SYSTEM"
    DEVOPS = "DEVOPS"
    DATA_SCIENCE = "DATA_SCIENCE"
    BLOCKCHAIN = "BLOCKCHAIN"
    SCENEKIT = "SCENEKIT"
    CLOUD_COMPUTING = "CLOUD_COMPUTING"
    PYGAME = "PYGAME"
    PYTORCH = "PYTORCH"
    ALGORITHMS = "ALGORITHMS"
    CPP = "CPP"
    MYSQL = "MYSQL"
    KIVY = "KIVY"
    GIN = "GIN"
    EXPRESS_JS = "EXPRESS_JS"
    WXWIDGETS = "WXWIDGETS"
    DJANGO = "DJANGO"
    VAPOR = "VAPOR"
    POSTGRESQL = "POSTGRESQL"
    CYBERSECURITY = "CYBERSECURITY"
    SFML = "SFML"
    DESKTOP_APPLICATIONS = "DESKTOP_APPLICATIONS"
    MLPACK = "MLPACK"
    FASTAPI = "FASTAPI"
    COBRA = "COBRA"
    BEVY = "BEVY"
    CUDA = "CUDA"
    FRONTEND = "FRONTEND"
    SEABORN = "SEABORN"
    SVELTE = "SVELTE"
    PYTHON = "PYTHON"
    TENSORFLOW_CPP = "TENSORFLOW_CPP"
    GRPC = "GRPC"
    NUMPY = "NUMPY"
    THREE_JS = "THREE_JS"
    JETPACK_COMPOSE = "JETPACK_COMPOSE"
    FULL_STACK = "FULL_STACK"
    JMONKEYENGINE = "JMONKEYENGINE"
    NATURAL_LANGUAGE_PROCESSING = "NATURAL_LANGUAGE_PROCESSING"
    DATA_STRUCTURES = "DATA_STRUCTURES"
    SPRITEKIT = "SPRITEKIT"
    FIREBASE = "FIREBASE"
    SQL = "SQL"
    MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT"
    CLI_DEVELOPMENT = "CLI_DEVELOPMENT"
    GUI_DEVELOPMENT = "GUI_DEVELOPMENT"
    LIBGDX = "LIBGDX"
    ACTIX = "ACTIX"
    PANDAS = "PANDAS"
    KUBERNETES = "KUBERNETES"
    ECHO = "ECHO"
    WEB_DEVELOPMENT = "WEB_DEVELOPMENT"
    EMBEDDED_SYSTEMS = "EMBEDDED_SYSTEMS"
    CSHARP = "CSHARP"
    JAVASCRIPT = "JAVASCRIPT"
    QT = "QT"
    APACHE_SPARK = "APACHE_SPARK"
    MATPLOTLIB = "MATPLOTLIB"
    REACT = "REACT"
    PHASER_JS = "PHASER_JS"
    WPF = "WPF"
    UIKIT = "UIKIT"
    HIGH_PERFORMANCE_COMPUTING = "HIGH_PERFORMANCE_COMPUTING"
    NESTJS = "NESTJS"
    REDIS = "REDIS"
    BIG_DATA = "BIG_DATA"
    SWIFT = "SWIFT"
    DATABASES = "DATABASES"
    IOS_DEVELOPMENT = "IOS_DEVELOPMENT"
    MACHINE_LEARNING_2 = "MACHINE_LEARNING_2"
    VUE_JS = "VUE_JS"
    RUST = "RUST"
    KOTLIN = "KOTLIN"
    COMPUTER_VISION = "COMPUTER_VISION"
    KOA = "KOA"
    PYGLET = "PYGLET"
    JAVA = "JAVA"
    NEXT_JS = "NEXT_JS"
    SPRING_BOOT_KOTLIN = "SPRING_BOOT_KOTLIN"
    ASP_NET_CORE = "ASP_NET_CORE"
    TENSORFLOW = "TENSORFLOW"
    FIBER = "FIBER"
    NETWORK = "NETWORK"
    ANDROID_SDK = "ANDROID_SDK"
    SCIKIT_LEARN = "SCIKIT_LEARN"



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
	
