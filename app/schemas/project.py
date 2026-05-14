from pydantic import BaseModel, ConfigDict
from datetime import datetime   



class ProjectCreate(BaseModel):
    title:str
    description:str|None = None
    
    

class ProjectResponse(BaseModel):
    id:int
    title:str
    description:str|None = None
    owner_id:int
    created_at:datetime
    
    model_config = ConfigDict(from_attributes=True)
    
class ProjectUpdate(BaseModel):
    title: str | None = None
    description: str | None = None