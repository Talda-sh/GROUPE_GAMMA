from dijkstra import calculate_route


class FakeNode:
    def __init__(self, id):
        self.id = id


class FakeEdge:
    def __init__(self, from_node_id, to_node_id, distance_m):
        self.from_node_id = from_node_id
        self.to_node_id = to_node_id
        self.distance_m = distance_m


def test_calculate_route_simple():

    nodes = [
        FakeNode(1),
        FakeNode(2),
        FakeNode(3),
    ]

    edges = [
        FakeEdge(1, 2, 5),
        FakeEdge(2, 3, 5),
    ]

    result = calculate_route(nodes, edges, 1, 3)

    assert result["path"] == [1, 2, 3]
    assert result["distance"] == 10
