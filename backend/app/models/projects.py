from app.database import Base
from sqlalchemy import Column, String, Integer, Boolean, DateTime,ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship



class Project(Base):
    __tablename__ = "projects"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,unique=True,nullable=False)
    description=Column(String,nullable=True)
    owner_id=Column(Integer,ForeignKey("users.id"),nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow)
    
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project")