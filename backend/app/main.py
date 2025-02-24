from fastapi import FastAPI,Request,Depends,HTTPException
from fastapi.responses import RedirectResponse
import os 
from dotenv import load_dotenv
from passlib.context import CryptContext
from app.helpers.JWTHelpers import create_access_token
from app.database import test_connection
from app.routes.UserRouter import userRouter
from app.routes.ResourceRouter import resourceRouter
from app.routes.InteractionRouter import interactionRouter 
from app.routes.ReviewRouter import reviewRouter 
from app.routes.RoadmapRouter import roadmapRouter
from app.middlewares.AuthMiddleware import AuthMiddleware
from authlib.integrations.starlette_client import OAuth
from app.database import db
from passlib.context import CryptContext

pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")
app = FastAPI()

app.add_middleware(AuthMiddleware)

app.include_router(userRouter,prefix="/api/users")
app.include_router(resourceRouter,prefix="/api/resources")
app.include_router(interactionRouter,prefix="/api/interactions")
app.include_router(reviewRouter,prefix="/api/reviews")
app.include_router(roadmapRouter,prefix="/api/roadmaps")
pswd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

@app.get("/auth/login")
async def user_login(request:Request):
	body = await request.json()
	username = body.get("username")
	print(username)
	password = body.get("password")
	if not username or not password:
		raise HTTPException(status_code=400,detail="Bad Request:Username or Password parameter is wrong")
	user = await db.users.find_one({"name":username})
	print(user)
	if user and pswd_context.verify(password,user["password"]):
		token = create_access_token(data={"sub":user["name"]})
		return {"access_token": token, "token_type": "bearer"}
	else:
		raise HTTPException(status_code=401,detail="Invalid Credentials")
	
oauth = OAuth()
oauth.register(
	name="google",
	client_id=os.getenv("GOOGLE_CLIENT_ID"),
	client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
	server_metadata_url = "https://accounts.google.com/well-known/openid-configuration",
	client_kwargs = {"scope":"openid email profile"}
)
@app.get("/auth/google")
async def google_login():
	redirect_url = "http://localhost:8000/auth/google/callback"
	return await oauth.google.authorize_redirect(redirect_url)

@app.get("/auth/google/callback")
async def google_callback():
		try:
			token = await oauth.google.authorize_access_token()
			user_info = await oauth.google.parse_id_token(token)
			return {"token":token,"user_info":user_info}
		except Exception as e:
			raise HTTPException(status_code=400,detail=str(e))

@app.on_event("startup")
async def check_db_connection():
	await test_connection()

@app.get("/")
async def root():
	return "backend api is up and running" 

 
