from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# ==========================
# SCHEMA
# ==========================

class RouteRequest(BaseModel):
    destination: str


# ==========================
# ROUTE SIMPLE (SIMULATION)
# ==========================

@router.post("/route")
def get_route(data: RouteRequest):

    print("DESTINATION RECUE :", data.destination)

    return {
        "destination": data.destination,

        #  infos globales navigation
        "eta": "14:25",
        "timeLeft": "2 min",
        "metersLeft": "50 m",

        #  étapes simulées
        "path_steps": [
            {
                "distance": "50m",
                "text": "Avancez tout droit",
                "icon": "straight"
            },
            {
                "distance": "20m",
                "text": "Tournez à gauche",
                "icon": "turn_left"
            },
            {
                "distance": "10m",
                "text": "Vous êtes arrivé",
                "icon": "flag"
            }
        ]
    }