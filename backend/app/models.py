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
    AMETHYST = "Amethyst"
    SWIFTUI = "SwiftUI"
    OPENMP = "OpenMP"
    UI_UX = "UI/UX"
    KTOR = "Ktor"
    ML_NET = "ML.NET"
    NOSQL = "NoSQL"
    IOT = "IoT"
    AI = "ai"
    ANGULAR = "Angular"
    GAME_DEVELOPMENT = "Game Development"
    BACKEND = "Backend"
    UNITY = "Unity"
    ROCKET = "Rocket"
    SQLITE = "SQLite"
    NUXT_JS = "Nuxt.js"
    JAKARTA_EE = "Jakarta EE"
    MACHINE_LEARNING = "Machine Learning"
    APACHE_HADOOP = "Apache Hadoop"
    COCOS2D_X = "Cocos2d-x"
    FLASK = "Flask"
    UNREAL_ENGINE = "Unreal Engine"
    WINFORMS = "WinForms"
    MONGODB = "MongoDB"
    SPRING_BOOT = "Spring Boot"
    GO = "Go"
    CLOUD_MICROSERVICES = "Cloud & Microservices"
    OPERATING_SYSTEM = "operating System"
    DEVOPS = "devops"
    DATA_SCIENCE = "Data Science"
    BLOCKCHAIN = "blockchain"
    SCENEKIT = "SceneKit"
    CLOUD_COMPUTING = "Cloud Computing"
    PYGAME = "Pygame"
    PYTORCH = "PyTorch"
    ALGORITHMS = "algorithms"
    CPP = "C++"
    MYSQL = "MySQL"
    KIVY = "Kivy"
    GIN = "Gin"
    EXPRESS_JS = "Express.js"
    WXWIDGETS = "wxWidgets"
    DJANGO = "Django"
    VAPOR = "Vapor"
    POSTGRESQL = "PostgreSQL"
    CYBERSECURITY = "cybersecurity"
    SFML = "SFML"
    DESKTOP_APPLICATIONS = "Desktop Applications"
    MLPACK = "MLpack"
    FASTAPI = "FastAPI"
    COBRA = "Cobra"
    BEVY = "Bevy"
    CUDA = "CUDA"
    FRONTEND = "Frontend"
    SEABORN = "Seaborn"
    SVELTE = "Svelte"
    PYTHON = "Python"
    TENSORFLOW_CPP = "TensorFlow C++"
    GRPC = "gRPC"
    NUMPY = "NumPy"
    THREE_JS = "Three.js"
    JETPACK_COMPOSE = "Jetpack Compose"
    FULL_STACK = "Full-Stack"
    JMONKEYENGINE = "jMonkeyEngine"
    NATURAL_LANGUAGE_PROCESSING = "natural Language Processing"
    DATA_STRUCTURES = "data Structures"
    SPRITEKIT = "SpriteKit"
    FIREBASE = "Firebase"
    SQL = "SQL"
    MOBILE_DEVELOPMENT = "Mobile Development"
    CLI_DEVELOPMENT = "CLI Development"
    GUI_DEVELOPMENT = "GUI Development"
    LIBGDX = "libGDX"
    ACTIX = "Actix"
    PANDAS = "Pandas"
    KUBERNETES = "Kubernetes"
    ECHO = "Echo"
    WEB_DEVELOPMENT = "Web Development"
    EMBEDDED_SYSTEMS = "Embedded Systems"
    CSHARP = "C#"
    JAVASCRIPT = "JavaScript"
    QT = "Qt"
    APACHE_SPARK = "Apache Spark"
    MATPLOTLIB = "Matplotlib"
    REACT = "React"
    PHASER_JS = "Phaser.js"
    WPF = "WPF"
    UIKIT = "UIKit"
    HIGH_PERFORMANCE_COMPUTING = "High-Performance Computing"
    NESTJS = "NestJS"
    REDIS = "Redis"
    BIG_DATA = "Big Data"
    SWIFT = "Swift"
    DATABASES = "Databases"
    IOS_DEVELOPMENT = "iOS Development"
    MACHINE_LEARNING_2 = "machine Learning"
    VUE_JS = "Vue.js"
    RUST = "Rust"
    KOTLIN = "Kotlin"
    COMPUTER_VISION = "computer Vision"
    KOA = "Koa"
    PYGLET = "Pyglet"
    JAVA = "Java"
    NEXT_JS = "Next.js"
    SPRING_BOOT_KOTLIN = "Spring Boot (Kotlin)"
    ASP_NET_CORE = "ASP.NET Core"
    TENSORFLOW = "TensorFlow"
    FIBER = "Fiber"
    NETWORK = "network"
    ANDROID_SDK = "Android SDK"
    SCIKIT_LEARN = "Scikit-Learn"



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
	
