from sqlalchemy import Column, Integer, BigInteger, String, Float, ForeignKey, Text, TIMESTAMP
from sqlalchemy.sql import func
from database import Base


# ======================================
# LOCATIONS
# ======================================

class Location(Base):
    __tablename__ = "locations"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)

    latitude = Column(Float)
    longitude = Column(Float)

    floor = Column(Integer)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


# ======================================
# NODES
# ======================================

class Node(Base):
    __tablename__ = "nodes"

    id = Column(BigInteger, primary_key=True, index=True)

    location_id = Column(BigInteger, ForeignKey("locations.id"), nullable=True)

    latitude = Column(Float)
    longitude = Column(Float)

    floor = Column(Integer)


# ======================================
# EDGES (liaisons du graphe)
# ======================================

class Edge(Base):
    __tablename__ = "edges"

    id = Column(BigInteger, primary_key=True, index=True)

    from_node_id = Column(BigInteger, ForeignKey("nodes.id"))
    to_node_id = Column(BigInteger, ForeignKey("nodes.id"))

    distance_m = Column(Float, nullable=False)

    edge_instructions = Column(Text)


# ======================================
# POIS
# ======================================

class POI(Base):
    __tablename__ = "pois"

    id = Column(BigInteger, primary_key=True, index=True)

    location_id = Column(BigInteger, ForeignKey("locations.id"))
    node_id = Column(BigInteger, ForeignKey("nodes.id"), nullable=True)

    name = Column(String)
    category = Column(String)


# ======================================
# ROUTES (optionnel)
# ======================================

class Route(Base):
    __tablename__ = "routes"

    id = Column(BigInteger, primary_key=True, index=True)

    from_node_id = Column(BigInteger, ForeignKey("nodes.id"))
    to_node_id = Column(BigInteger, ForeignKey("nodes.id"))

    total_distance = Column(Float)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


# ======================================
# ROUTE STEPS
# ======================================

class RouteStep(Base):
    __tablename__ = "route_steps"

    id = Column(BigInteger, primary_key=True, index=True)

    route_id = Column(BigInteger, ForeignKey("routes.id"))
    step_order = Column(Integer)

    node_id = Column(BigInteger, ForeignKey("nodes.id"))

    instruction = Column(Text)