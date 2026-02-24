from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
import models
from dijkstra import calculate_route

router = APIRouter()

# ======================================================
# SCHEMA (ce que le frontend envoie)
# ======================================================

class RouteRequest(BaseModel):
    destination: str


# ======================================================
# NORMALISATION VOCALE
# Convertit "un" -> "1" etc
# ======================================================

def normalize_destination(text: str) -> str:

    if not text:
        return ""

    replacements = {
        "un": "1",
        "deux": "2",
        "trois": "3",
        "quatre": "4",
        "cinq": "5",
        "six": "6",
        "sept": "7",
        "huit": "8",
        "neuf": "9",
        "dix": "10"
    }

    text = text.lower()

    for word, number in replacements.items():
        text = text.replace(f" {word} ", f" {number} ")

    return text.strip()


# ======================================================
# GET LOCATIONS
# ======================================================

@router.get("/locations")
def get_locations(db: Session = Depends(get_db)):
    return db.query(models.Location).all()


# ======================================================
# GET POIS
# ======================================================

@router.get("/pois")
def get_pois(db: Session = Depends(get_db)):
    return db.query(models.POI).all()


# ======================================================
# SEARCH LIEUX (restaurant, gare, etc)
# ======================================================

@router.get("/search")
def search_places(q: str, db: Session = Depends(get_db)):

    query = normalize_destination(q)

    results = db.query(models.POI).filter(
        models.POI.name.ilike(f"%{query}%") |
        models.POI.category.ilike(f"%{query}%")
    ).limit(6).all()

    return results


# ======================================================
# POST ROUTE (CALCUL ITINÉRAIRE)
# ======================================================

@router.post("/route")
def get_route(data: RouteRequest, db: Session = Depends(get_db)):

    # position actuelle (temporaire)
    current_node_id = 1

    #  normaliser texte vocal
    destination_clean = normalize_destination(data.destination)

    print("DESTINATION NORMALISÉE:", destination_clean)

    #  chercher destination
    poi = db.query(models.POI).filter(
    (models.POI.name.ilike(f"%{data.destination}%")) |
    (models.POI.category.ilike(f"%{data.destination}%"))
).first()

    if not poi:
        return {"error": "Destination introuvable"}

    end_id = poi.node_id

    #  charger graphe
    nodes = db.query(models.Node).all()
    edges = db.query(models.Edge).all()

    # calcul Dijkstra
    result = calculate_route(
        nodes,
        edges,
        current_node_id,
        end_id
    )

    #  transformer path → steps Angular
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