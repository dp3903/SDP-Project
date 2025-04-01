import os 
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient 
load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URL or not DATABASE_NAME:
	raise ValueError("Provide appropriate URL and DB name")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

async def test_connection():
	try : 
		await client.admin.command('ping')
		print('mongodb connected successfully')
	except Exception as e:
		print("Error connecting the mongodb ",e)
