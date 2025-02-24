from fastapi import Request 
from fastapi.responses import JSONResponse 
from starlette.middleware.base import BaseHTTPMiddleware
from jose import JWTError 
from app.helpers.JWTHelpers import verify_access_token
EXCLUDED_PATHS = ["/auth/login/","/api/users/","/"]
class AuthMiddleware(BaseHTTPMiddleware):
	async def dispatch(self,request:Request,call_next):
		if request.url.path in EXCLUDED_PATHS:
			return await call_next(request)
		auth_header = request.headers.get("Authorization")
		if not auth_header or not auth_header.startswith("Bearer "):
			return JSONResponse(status_code=401,content={"detail":"Not authenticated"})
		token = auth_header.split(" ")[1]
		try:
			verify_access_token(token)
		except ValueError:
			return JSONResponse(status_code=401,content={"detail":"Invalid Token"})
		return await call_next(request)
			
