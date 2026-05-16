from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.projects import router as projects_router
from app.routers.task import router as task_router
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()
app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(task_router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)