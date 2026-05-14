from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.users import User
import os




def hash_password(password:str):
    pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
    hashed_pass=pwd_context.hash(password)
    
    return hashed_pass



def verify_password(plain_password:str,hashed_password:str):
    pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
    return pwd_context.verify(plain_password,hashed_password)   



def generate_jwt_token(data:dict,secret_key:str,algorithm:str,expires_delta:int):
    to_encode=data.copy()
    expire=datetime.utcnow()+timedelta(minutes=expires_delta)
    to_encode.update({"exp":expire})
    
    encoded_jwt=jwt.encode(to_encode,secret_key,algorithm=algorithm)
    
    return encoded_jwt


def get_current_user(db:Session=Depends(get_db), token:str=Depends(OAuth2PasswordBearer(tokenUrl="/auth/login"))):
    try:
        decoded_token=jwt.decode(token,key=os.getenv("SECRET_KEY"),algorithms=[os.getenv("ALGORITHM")])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid authentication credentials")
    email=decoded_token.get("sub")  
    check_email=db.query(User).filter(User.email==email).first()
    if not check_email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid authentication credentials")
    return check_email  