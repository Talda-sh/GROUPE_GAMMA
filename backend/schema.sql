CREATE TABLE locations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,

  category TEXT NOT NULL,
  -- building, restaurant, street, park, entrance

  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,

  floor INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE nodes (
  id BIGSERIAL PRIMARY KEY,

  location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,

  x DOUBLE PRECISION,
  y DOUBLE PRECISION,

  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,

  floor INT,

  tactile_paving BOOLEAN DEFAULT false,
  sound_beacon BOOLEAN DEFAULT false,
  hazard_level INT DEFAULT 0
);

CREATE TABLE edges (
  id BIGSERIAL PRIMARY KEY,

  from_node_id BIGINT REFERENCES nodes(id) ON DELETE CASCADE,
  to_node_id BIGINT REFERENCES nodes(id) ON DELETE CASCADE,

  distance_m DOUBLE PRECISION NOT NULL,

  edge_type TEXT DEFAULT 'path',
  wheelchair_ok BOOLEAN DEFAULT true,

  tactile_paving BOOLEAN DEFAULT false,
  sound_beacon BOOLEAN DEFAULT false,
  hazard_level INT DEFAULT 0,

  edge_instructions TEXT
);

CREATE TABLE pois (
  id BIGSERIAL PRIMARY KEY,

  location_id BIGINT REFERENCES locations(id) ON DELETE CASCADE,
  node_id BIGINT REFERENCES nodes(id) ON DELETE SET NULL,

  name TEXT,
  category TEXT
);

CREATE TABLE routes (
  id BIGSERIAL PRIMARY KEY,
  from_node_id BIGINT REFERENCES nodes(id),
  to_node_id BIGINT REFERENCES nodes(id),
  total_distance DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE route_steps (
  id BIGSERIAL PRIMARY KEY,
  route_id BIGINT REFERENCES routes(id) ON DELETE CASCADE,
  step_order INT,
  node_id BIGINT REFERENCES nodes(id),
  instruction TEXT
);