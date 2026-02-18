# dijkstra.py

def calculate_route(nodes, edges, start_id, end_id):
    """
    nodes : liste d'objets Node
    edges : liste d'objets Edge
    start_id : node de départ
    end_id : node d'arrivée
    """

    # Construire le graphe
    graph = {}

    for edge in edges:
        if edge.from_node_id not in graph:
            graph[edge.from_node_id] = []

        graph[edge.from_node_id].append(
            (edge.to_node_id, edge.distance_m)
        )

        # bidirectionnel simple
        if edge.to_node_id not in graph:
            graph[edge.to_node_id] = []

    # Initialisation
    distances = {node.id: float("inf") for node in nodes}
    previous = {}

    distances[start_id] = 0
    unvisited = set(distances.keys())

    # Algorithme Dijkstra
    while unvisited:
        current = min(unvisited, key=lambda node: distances[node])

        if current == end_id:
            break

        unvisited.remove(current)

        for neighbor, weight in graph.get(current, []):
            new_distance = distances[current] + weight

            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous[neighbor] = current

    # Reconstruction du chemin
    path = []
    current = end_id

    while current in previous:
        path.insert(0, current)
        current = previous[current]

    path.insert(0, start_id)

    return {
        "path": path,
        "distance": distances[end_id]
    }