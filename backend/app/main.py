from fastapi import FastAPI
from app.database import test_connection
from app.routes.UserRouter import userRouter
app = FastAPI()

app.include_router(userRouter,prefix="/api/users")
@app.on_event("startup")
async def check_db_connection():
	await test_connection()

@app.get("/")
async def root():
	return "backend api is up and running" 

 
