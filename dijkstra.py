def calculate_route(nodes, edges, start_id, end_id):

    # ===== Sécurité : vérifier que les nodes existent =====
    node_ids = [node.id for node in nodes]

    if start_id not in node_ids or end_id not in node_ids:
        return {
            "path": [],
            "distance": None,
            "error": "Node introuvable"
        }

    graph = {}

    for edge in edges:
        if edge.from_node_id not in graph:
            graph[edge.from_node_id] = []

        graph[edge.from_node_id].append(
            (edge.to_node_id, edge.distance_m)
        )

        if edge.to_node_id not in graph:
            graph[edge.to_node_id] = []

    distances = {node.id: float("inf") for node in nodes}
    previous = {}

    distances[start_id] = 0
    unvisited = set(distances.keys())

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

    path = []
    current = end_id

    while current in previous:
        path.insert(0, current)
        current = previous[current]

    if start_id in distances:
        path.insert(0, start_id)

    return {
        "path": path,
        "distance": distances.get(end_id)
    }
