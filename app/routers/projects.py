from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 
from app.database import get_db 
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.core.security import get_current_user
from app.models.projects import Project



router=APIRouter()



@router.post("/projects")
def create_project(project_data:ProjectCreate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):

    owner_id=current_user.id
    new_project=Project(
        title=project_data.title,
        description=project_data.description,
        owner_id=owner_id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return ProjectResponse.model_validate(new_project)


@router.get("/projects/")
def get_all_projects(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    projects=db.query(Project).filter(Project.owner_id==current_user.id).all()
    return [ProjectResponse.model_validate(project) for project in projects]



@router.get("/projects/{project_id}")
def get_project(project_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    return ProjectResponse.model_validate(project)



@router.put("/projects/{project_id}")
def update_project(project_id:int,project_data:ProjectUpdate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    
    if project_data.title is not None:
        project.title = project_data.title
    if project_data.description is not None:
        project.description = project_data.description
        
    db.commit()
    db.refresh(project)
    return ProjectResponse.model_validate(project)


@router.delete("/projects/{project_id}")
def delete_project(project_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    project=db.query(Project).filter(Project.id==project_id,Project.owner_id==current_user.id).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    db.delete(project)
    db.commit()
    return {"detail":"Project deleted successfully"}