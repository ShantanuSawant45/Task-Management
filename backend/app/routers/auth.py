
import os
from app.models.users import User
from app.schemas.user import UserCreate
from fastapi import Depends,HTTPException,APIRouter
from app.database import get_db
from sqlalchemy.orm import Session
from app.core.security import hash_password,verify_password,generate_jwt_token
from app.schemas.user import UserResponse ,UserLogin 



router=APIRouter()


@router.post("/auth/register")
def register(user : UserCreate,db:Session=Depends(get_db)):
    #now check if email and username already exist in db or not 
    
    does_user_exist=db.query(User).filter((User.email==user.email)|(User.username==user.username)).first()
    if does_user_exist:
        raise HTTPException(status_code=400,detail="User with this email or username already exists")
    
    # if user nhi hai present then create one user 
    new_user=User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserResponse.model_validate(new_user)


@router.post("/auth/login")

def login(user: UserLogin, db: Session = Depends(get_db)):
    # Find user by email
    existing_user = db.query(User).filter(User.email == user.email).first()
    
    # Check if user exists AND password is correct
    if not existing_user or not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return generate_jwt_token(
        data={"sub": existing_user.email},
        secret_key=os.getenv("SECRET_KEY"),
        algorithm=os.getenv("ALGORITHM"),
        expires_delta=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    )
