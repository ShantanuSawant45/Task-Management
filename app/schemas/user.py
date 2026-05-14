from pydantic import BaseModel, ConfigDict
from datetime import datetime


class UserCreate(BaseModel):
    email:str
    username:str
    password:str
    

class UserResponse(BaseModel):
    id:int
    email:str
    username:str
    is_active:bool
    created_at:datetime
        
    model_config = ConfigDict(from_attributes=True) # allows pydantic to concert the sqlalchemy schema directky into dictonary without the need for manual conversion dictonary 
        # nhi to ye apn to manually karana padta har baar 
#         user = db.query(User).first()
# return UserResponse(
#     id=user.id,
#     email=user.email,
#     name=user.name
# )   
            


class UserLogin(BaseModel):
    email:str
    password:str
    