CREATE TABLE locations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  floor INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE nodes (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  floor INT
);

CREATE TABLE edges (
  id BIGSERIAL PRIMARY KEY,
  from_node_id BIGINT REFERENCES nodes(id),
  to_node_id BIGINT REFERENCES nodes(id),
  distance_m DOUBLE PRECISION NOT NULL
);

CREATE TABLE pois (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id),
  node_id BIGINT REFERENCES nodes(id),
  name TEXT,
  category TEXT
);