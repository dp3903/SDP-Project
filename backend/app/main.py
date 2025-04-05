from fastapi import FastAPI,Request,Depends,HTTPException
from fastapi.responses import RedirectResponse
import os , httpx
from dotenv import load_dotenv
from passlib.context import CryptContext
from app.helpers.JWTHelpers import create_access_token
from app.database import test_connection
from app.routes.UserRouter import userRouter
from app.routes.ResourceRouter import resourceRouter
from app.routes.InteractionRouter import interactionRouter 
from app.routes.ReviewRouter import reviewRouter 
from app.routes.RoadmapRouter import roadmapRouter
from app.routes.adminRouter import adminRouter
from app.middlewares.AuthMiddleware import AuthMiddleware
from authlib.integrations.starlette_client import OAuth
from app.database import db
from passlib.context import CryptContext
from app.models import UserModel,UserPrefrences
import uuid
from fastapi.middleware.cors import CORSMiddleware
from app.utils import add_new_user, update_user_mapping
from google.oauth2 import id_token 
from google.auth.transport import requests  
import datetime
pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")
app = FastAPI()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URL= os.getenv("REDIRECT_URL")
@app.post("/auth/login/")
async def user_login(request:Request):
	try:
		body = await request.json()
	except Exception:
		raise HTTPException(status_code=400, detail="Invalid or missing JSON body")
	username = body.get("username")
	print(username)
	password = body.get("password")
	if not username or not password:
		raise HTTPException(status_code=400,detail="Bad Request:Username or Password parameter is wrong")
	user = await db.users.find_one({"name":username})
	print(user)
	if user and pswd_context.verify(password,user["password"]):
		token = create_access_token(data={"sub":user["name"]})
		return {"access_token": token, "token_type": "bearer", "username": user["name"], "email": user["email"], "userId": user["_id"]}
	elif user is None:
		raise HTTPException(status_code=404,detail="User not found")
	else:
		raise HTTPException(status_code=401,detail="Invalid Credentials")

@app.post("/auth/signup/")
async def user_signup(request:Request):
	try:
		body = await request.json()
	except Exception:
		raise HTTPException(status_code=400, detail="Invalid or missing JSON body")
	username = body.get("name")
	print(username)
	password = body.get("password")
	email = body.get("email")
	if not username or not password or not email:
		raise HTTPException(status_code=400,detail="Bad Request:Username or Password or email parameter is wrong")
	user = await db.users.find_one({"name":username})
	print(user)
	if user:
		raise HTTPException(status_code=409,detail="Username Already exists!")
	user: UserModel
	user = UserModel.parse_obj(body)
	user.id = str(uuid.uuid4())[:8] #generates new str id every time new user is created
	user.password = pswd_context.hash(user.password)
	result = await db.users.insert_one(user.dict(by_alias=True))
	new_user = await db.users.find_one({ "_id" : result.inserted_id})
	add_new_user()
	update_user_mapping(new_user["_id"])
	token = create_access_token(data={"sub":new_user["name"]})
	return {"access_token": token, "token_type": "bearer", "username": new_user["name"], "email": new_user["email"], "userId": new_user["_id"]}

	
oauth = OAuth()
oauth.register(
	name="google",
	client_id=os.getenv("GOOGLE_CLIENT_ID"),
	client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
	server_metadata_url = "https://accounts.google.com/well-known/openid-configuration",
	client_kwargs = {"scope":"openid email profile"}
)

@app.get("/auth/callback")
async def google_callback(code : str):
	decoded_token = id_token.verify_oauth2_token(
		code, requests.Request(),GOOGLE_CLIENT_ID
	)
	user_email = decoded_token.get("email")
	user_name = decoded_token.get("name")

	user = await db.users.find_one({"email": user_email})
	if user is None:
		prefrences = UserPrefrences(skillLevel="beginner",preferredFormat=["video"],interests=["C"])
		id = str(uuid.uuid4())[:8]
		print(id)
		user = UserModel(name=user_name, email=user_email,_id=id,password="",prefrences=prefrences,joinedat=datetime.datetime.now())
		result = await db.users.insert_one(user.dict(by_alias=True))
		new_user = await db.users.find_one({ "_id" : result.inserted_id})
		add_new_user()
		update_user_mapping(new_user["_id"])
		token = create_access_token(data={"sub":new_user["name"]}) 
		return {"access_token": token, "token_type": "bearer", "username": new_user["name"], "email": new_user["email"], "userId": new_user["_id"],"isNew":True}
	token = create_access_token(data={"sub":user["name"]})
	return {"access_token": token, "token_type": "bearer", "username": user["name"], "email": user["email"], "userId": user["_id"],"isNew":False}



origins = [
    "http://localhost:5173",  
    "http://localhost:3000",  
]
app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowed frontend origins
    allow_credentials=True,  # Allow cookies/authentication
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(userRouter,prefix="/api/users")
app.include_router(resourceRouter,prefix="/api/resources")
app.include_router(interactionRouter,prefix="/api/interactions")
app.include_router(reviewRouter,prefix="/api/reviews")
app.include_router(roadmapRouter,prefix="/api/roadmaps")
app.include_router(adminRouter,prefix="/api/admin")
pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

@app.on_event("startup")
async def check_db_connection():
	await test_connection()

@app.get("/")
async def root():
	return "backend api is up and running" 

 
