from fastapi import FastAPI
from backend.database import engine, Base
import backend.models as models
from backend.routes import router

app = FastAPI()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "PostgreSQL connecté"}

app.include_router(router)
