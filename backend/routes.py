# Router FastAPI pour définir les endpoints API
from fastapi import APIRouter, Depends

# Session SQLAlchemy
from sqlalchemy.orm import Session

# Pydantic
from pydantic import BaseModel

# DB
from database import get_db
import models as models

# Algo
from dijkstra import calculate_route

router = APIRouter()


# ==========================
# SCHEMA Pydantic
# ==========================
class RouteRequest(BaseModel):
    destination: str


# ==========================
# GET LOCATIONS
# ==========================
@router.get("/locations")
def get_locations(db: Session = Depends(get_db)):

    locations = db.query(models.Location).all()
    return locations


# ==========================
# GET POIS
# ==========================
@router.get("/pois")
def get_pois(db: Session = Depends(get_db)):

    pois = db.query(models.POI).all()
    return pois


# ==========================
# POST ROUTE (LOGIQUE REELLE)
# ==========================
@router.post("/route")
def get_route(data: RouteRequest, db: Session = Depends(get_db)):

    # Position actuelle (temporaire)
    # plus tard GPS / géolocalisation
    current_node_id = 1

    #  Trouver le POI correspondant
    poi = db.query(models.POI).filter(
        models.POI.category == data.destination
    ).first()

    if not poi:
        return {"error": "Destination introuvable"}

    end_id = poi.node_id

    # Charger graphe
    nodes = db.query(models.Node).all()
    edges = db.query(models.Edge).all()

    #  Calcul Dijkstra
    result = calculate_route(
        nodes,
        edges,
        current_node_id,
        end_id
    )

    # Transformer le path en instructions
    steps = []

    for node_id in result["path"]:
        steps.append({
            "distance": "",
            "text": f"Avancez vers le node {node_id}",
            "icon": "straight"
        })

    return {
        "path_steps": steps,
        "destination": poi.name
    }
