from fastapi import FastAPI,Request
from passlib.context import CryptContext
from app.helpers.JWTHelper import create_access_token
from app.database import test_connection
from app.routes.UserRouter import userRouter
from app.routes.ResourceRouter import resourceRouter
from app.routes.InteractionRouter import interactionRouter 
from app.routes.ReviewRouter import reviewRouter 
from app.routes.RoadmapRouter import roadmapRouter
from app.middlewares.AuthMiddleware import AuthMiddleware
pswd_context = CryptContext(schemas=["bcrypt"],deprecated="auto")
app = FastAPI()
app.add_middleware(AuthMiddleware)
app.include_router(userRouter,prefix="/api/users")
app.include_router(resourceRouter,prefix="/api/resources")
app.include_router(interactionRouter,prefix="/api/interactions")
app.include_router(reviewRouter,prefix="/api/reviews")
app.include_router(roadmapRouter,prefix="/api/roadmaps")
@app.get("auth/login")
async def user_login(request:Request):
	user = await db.users.find_one({"name":request.username})
	if user and pswd_context.verify(request.password,user["password"]):
		token = create_access_token(data={"sub":user["name"]})
	else:
		raise HTTPException(status_code=401,detail="Invalid Credentials")
@app.on_event("startup")
async def check_db_connection():
	await test_connection()

@app.get("/")
async def root():
	return "backend api is up and running" 

 
