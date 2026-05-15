from app.database import Base
from sqlalchemy import Column, String, Integer, Boolean, DateTime,ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship


class Task(Base):
    __tablename__ = "tasks"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,nullable=False)
    description=Column(String,nullable=True)
    project_id=Column(Integer,ForeignKey("projects.id"),nullable=False)
    owner_id=Column(Integer,ForeignKey ("users.id"),nullable=False)
    status=Column(String,default="pending")
    created_at=Column(DateTime,default=datetime.utcnow)
    
    project = relationship("Project", back_populates="tasks")
   