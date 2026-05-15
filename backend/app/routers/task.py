from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import get_current_user
from app.models.projects import Project
from app.models.tasks import Task
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate




router=APIRouter()  


@router.post("/projects/{project_id}/tasks")
def create_task(task_data:TaskCreate,project_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    
    new_task=Task(
        title=task_data.title,
        description=task_data.description,
        project_id=project_id,
        owner_id=task_data.assigned_to,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return TaskResponse.model_validate(new_task)


@router.get("/projects/{project_id}/tasks")
def get_tasks(project_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    
    tasks=db.query(Task).filter(Task.project_id==project_id).all()
    return [TaskResponse.model_validate(task) for task in tasks]

@router.get("/projects/{project_id}/tasks/{task_id}")
def get_task(project_id:int,task_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    
    task=db.query(Task).filter(Task.project_id==project_id,Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,detail="Task not found")
    
    return TaskResponse.model_validate(task)    

@router.put("/projects/{project_id}/tasks/{task_id}")
def update_task(project_id:int,task_id:int,task_data:TaskUpdate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")

    task=db.query(Task).filter(Task.project_id==project_id,Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,detail="Task not found")

    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return TaskResponse.model_validate(task)



@router.delete("/projects/{project_id}/tasks/{task_id}")
def delete_task(project_id:int,task_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")

    task=db.query(Task).filter(Task.project_id==project_id,Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,detail="Task not found")

    db.delete(task)
    db.commit()
    return {"detail":"Task deleted successfully"}       
