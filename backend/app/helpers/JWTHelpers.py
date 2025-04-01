import os 
from jose import jwt , JWTError 
from datetime import datetime , timedelta
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

def create_access_token(data : dict):
	to_encode = data.copy()
	expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
	to_encode.update({"exp":expire})
	return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
def verify_access_token(token : str):
	try:
		payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
		username:str = payload.get("sub")
		if username is None:
			raise ValueError("Invalid User")
		return payload
	except JWTError:
		raise ValueError("Invalid Token")

