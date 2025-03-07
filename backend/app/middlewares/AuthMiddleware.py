from fastapi import Request 
from fastapi.responses import JSONResponse 
from starlette.middleware.base import BaseHTTPMiddleware
from jose import JWTError 
from app.helpers.JWTHelpers import verify_access_token

EXCLUDED_PATHS = ["/auth/login","/auth/google","/auth/google/callback","/auth/signup"]

class AuthMiddleware(BaseHTTPMiddleware):
	async def dispatch(self,request:Request,call_next):
		if request.url.path in EXCLUDED_PATHS:
			return await call_next(request)
		auth_header = request.headers.get("Authorization")
		if not auth_header or not auth_header.startswith("Bearer "):
			return JSONResponse(status_code=401,content={"detail":"Not authenticated"})
		token = auth_header.split(" ")[1]
		try:
			# Assuming verify_access_token returns a payload dictionary
			payload = verify_access_token(token)
			if payload is None:
				return JSONResponse(status_code=401, content={"detail":"Invalid token payload"})
			username = payload.get("sub")
			if username is None:
				return JSONResponse(status_code=401, content={"detail":"Token missing 'sub' claim"})
			# Store the username in request.state so downstream endpoints can access it
			request.state.username = username
		except ValueError:
			return JSONResponse(status_code=401,content={"detail":"Invalid Token"})
		return await call_next(request)
			
