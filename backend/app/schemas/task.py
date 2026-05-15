
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class TaskCreate(BaseModel):
    title:str
    description:str
    assigned_to:int
    

class TaskResponse(BaseModel):
    id:int
    title:str
    description:str
    project_id:int
    assigned_to:int|None = None
    created_at:datetime
    
    model_config = ConfigDict(from_attributes=True)
    
class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assigned_to: int | None = None
    
    