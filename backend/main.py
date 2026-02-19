from fastapi import FastAPI

# Engine DB + Base SQLAlchemy
from database import engine, Base

# Import models pour que SQLAlchemy crée les tables
import models as models

# Router API
from routes import router

# Création de l'app FastAPI
app = FastAPI()


# 
# Startup event
# 
# Création automatique des tables si elles n'existent pas
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


# 
# Route racine
# 
@app.get("/")
def root():
    return {"message": "PostgreSQL connecté"}


# Inclusion des routes API
app.include_router(router)
