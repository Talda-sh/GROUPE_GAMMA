from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
import models
from dijkstra import calculate_route

router = APIRouter()


# ==========================
# Pydantic Schema (PRO)
# ==========================

class RouteRequest(BaseModel):
    start_id: int
    end_id: int


# ==========================
# GET ALL LOCATIONS
# ==========================

@router.get("/locations")
def get_locations(db: Session = Depends(get_db)):
    locations = db.query(models.Location).all()
    return locations


# ==========================
# GET ALL POIS
# ==========================

@router.get("/pois")
def get_pois(db: Session = Depends(get_db)):
    pois = db.query(models.POI).all()
    return pois


# ==========================
# POST ROUTE (DIJKSTRA)
# ==========================

@router.post("/route")
def get_route(data: RouteRequest, db: Session = Depends(get_db)):

    nodes = db.query(models.Node).all()
    edges = db.query(models.Edge).all()

    result = calculate_route(
        nodes,
        edges,
        data.start_id,
        data.end_id
    )

    return result
