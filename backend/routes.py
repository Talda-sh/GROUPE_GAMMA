from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
import models
from dijkstra import calculate_route

router = APIRouter()

# ==========================
# SCHEMA (ce que frontend envoie)
# ==========================
class RouteRequest(BaseModel):
    destination: str


# ==========================
# GET LOCATIONS
# ==========================
@router.get("/locations")
def get_locations(db: Session = Depends(get_db)):
    return db.query(models.Location).all()


# ==========================
# GET POIS
# ==========================
@router.get("/pois")
def get_pois(db: Session = Depends(get_db)):
    return db.query(models.POI).all()


# ==========================
# POST ROUTE (LOGIQUE REELLE)
# ==========================
@router.post("/route")
def get_route(data: RouteRequest, db: Session = Depends(get_db)):

    # 🔵 Position actuelle (temporaire)
    current_node_id = 1

    # 🔵 Trouver la destination dans les POI
    poi = db.query(models.POI).filter(
        models.POI.category == data.destination
    ).first()

    if not poi:
        return {"error": "Destination introuvable"}

    end_id = poi.node_id

    # 🔵 Charger graphe
    nodes = db.query(models.Node).all()
    edges = db.query(models.Edge).all()

    # 🔵 Calcul Dijkstra
    result = calculate_route(
        nodes,
        edges,
        current_node_id,
        end_id
    )

    # 🔵 Transformer le path en steps Angular
    steps = []

    for node_id in result["path"]:
        steps.append({
            "distance": "",
            "text": f"Dirigez-vous vers le point {node_id}",
            "icon": "straight"
        })

    return {
        "path_steps": steps,
        "destination": poi.name
    }
