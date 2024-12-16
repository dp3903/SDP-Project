from fastapi import FastAPI
from app.database import test_connection
from app.routes.UserRouter import userRouter
from app.routes.ResourceRouter import resourceRouter
from app.routes.InteractionRouter import interactionRouter 
from app.routes.ReviewRouter import reviewRouter 
from app.routes.RoadmapRouter import roadmapRouter
app = FastAPI()

app.include_router(userRouter,prefix="/api/users")
app.include_router(resourceRouter,prefix="/api/resources")
app.include_router(interactionRouter,prefix="/api/interactions")
app.include_router(reviewRouter,prefix="/api/reviews")
app.include_router(roadmapRouter,prefix="/api/roadmaps")
@app.on_event("startup")
async def check_db_connection():
	await test_connection()

@app.get("/")
async def root():
	return "backend api is up and running" 

 
