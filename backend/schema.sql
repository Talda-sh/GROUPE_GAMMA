-- =====================================
-- TABLE LOCATIONS
-- =====================================

CREATE TABLE locations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  floor INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================
-- TABLE NODES
-- =====================================

CREATE TABLE nodes (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  floor INT,
  tactile_paving BOOLEAN DEFAULT false,
  sound_beacon BOOLEAN DEFAULT false,
  hazard_level INT DEFAULT 0
);

-- =====================================
-- TABLE EDGES (GRAPHE)
-- =====================================

CREATE TABLE edges (
  id BIGSERIAL PRIMARY KEY,
  from_node_id BIGINT REFERENCES nodes(id),
  to_node_id BIGINT REFERENCES nodes(id),
  distance_m DOUBLE PRECISION NOT NULL,
  edge_type TEXT DEFAULT 'path',
  wheelchair_ok BOOLEAN DEFAULT true,
  tactile_paving BOOLEAN DEFAULT false,
  sound_beacon BOOLEAN DEFAULT false,
  hazard_level INT DEFAULT 0,
  edge_instructions TEXT
);

-- =====================================
-- TABLE POIS
-- =====================================

CREATE TABLE pois (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id),
  node_id BIGINT REFERENCES nodes(id),
  name TEXT,
  category TEXT
);

-- =====================================
-- TABLE ROUTES
-- =====================================

CREATE TABLE routes (
  id BIGSERIAL PRIMARY KEY,
  from_node_id BIGINT REFERENCES nodes(id),
  to_node_id BIGINT REFERENCES nodes(id),
  total_distance DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================
-- TABLE ROUTE STEPS
-- =====================================

CREATE TABLE route_steps (
  id BIGSERIAL PRIMARY KEY,
  route_id BIGINT REFERENCES routes(id),
  step_order INT,
  node_id BIGINT REFERENCES nodes(id),
  instruction TEXT
);

-- =====================================
-- DATA ORLEANS
-- =====================================

INSERT INTO locations (id,name,category,latitude,longitude,floor) VALUES
(1,'Gare d Orleans','transport',47.902964,1.904587,0),
(2,'50 rue du faubourg bannier','adresse',47.910210,1.900360,0),
(3,'Royal Chatelet','restaurant',47.900690,1.904900,0),
(4,'Universite Orleans La Source','universite',47.842800,1.934500,0),
(5,'L Indien','restaurant',47.902200,1.909300,0);

INSERT INTO nodes (id,location_id,latitude,longitude,floor) VALUES
(1,NULL,47.903000,1.904000,0),
(10,1,47.902964,1.904587,0),
(11,2,47.910210,1.900360,0),
(12,3,47.900690,1.904900,0),
(13,4,47.842800,1.934500,0),
(14,5,47.902200,1.909300,0);

INSERT INTO edges (from_node_id,to_node_id,distance_m) VALUES
(1,10,120),
(10,11,400),
(10,12,80),
(12,14,150);

INSERT INTO pois (id,location_id,node_id,name,category) VALUES
(1,1,10,'Gare d Orleans','transport'),
(2,2,11,'50 rue du faubourg bannier','adresse'),
(3,3,12,'Royal Chatelet','restaurant'),
(4,4,13,'Universite Orleans La Source','universite'),
(5,5,14,'L Indien','restaurant');