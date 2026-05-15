from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.projects import router as projects_router
from app.routers.task import router as task_router


app=FastAPI()
app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(task_router)