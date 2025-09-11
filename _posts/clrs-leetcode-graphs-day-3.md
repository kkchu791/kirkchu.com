---
title: "CLRS Graphs && Leetcode graphs - Day 3"
date: "2025-08-04"
description: "Reading CLRS 22.2 - BFS and Leetcode Graph Questiosn for Meta"
---

# CLRS Graphs Notes - Breadth-first search

### 22.2 Breadth-first-search

Prim's min spanning tree algorithm and Dijkstra's single source shortest paths use ideas that are simmilar to BFS.

You need to a source (s) to start with and from that source you can traverse every edge of a graph.

So a "BFS tree" is just a tree that was created using breath first search on a graph.

Breadth is like all surface, and going to the next layer or frontier and doing any search. That's why it's called Breadth, and the opposite is depth, where you chose one of the graph and go all the way down, and then you come up and chose another passage and go all the way down.

Sounds like when it's searching, there are things its doing to keep track of nodes. It uses colors (white, gray, and black) to signifiy different stages. So white is undiscovered. Black is discovered. Gray is like discovered but is next to white nodes, that makes its gray. Grays represent the layer or the frontier so they are the one's about to be discovered.

So we start with source. 

THe algorith uses a queue

```js

// u is the element
function bfs(graph, source) {

    // for each node , we're giving extra attributes
    for each node starting with source
        u.color = white
        u.d = infinity // holds the distance from source to u (currNode)
        u.Pi = null  // this stores the predecessor or parent of u (currNode)

    source.color = grey
    source.d = 0
    source.PI = nil

    const queue = [];
    queue.push(source);

    while Q is not empty
        u = queue.shift();

        for each node in AdjList[u]

            if node.color === white
                node.color = gray
                node.d = u.d + 1 // current nodes distance + 1
                node.Pi = u // since u is the parent of node
                queue.push(node)
    
        u.color = Black // it's finished and it's been discovered
}
```

To summarize what this is doing, initally it paints all the nodes white. Then, it starts at the source, push that into the queue, and then starts doing all the neighbors in the adjacenty list, it paints those neighbors gray because they are the next one's the be search and also updates the attributes and pushes them into the queue.
So our root is done, we turn it black, and we start on one of the neigbors in the queue. We keep doing this process until the queue is empty, which means we've reached all our neighbors.s

The time complexity is O(V + E). It runs in linear time to size of the graph (Edges + Vertexes)

We go into how do we know BFS is good for shortest distance path? We have 5 proofs to show it.

Proof 1: If u (currentNode) is reachable from s(root), then so is v(what is v?).
Proof 2: I'm not sure what this is about.
Proof 3: At all times, the queue holds at most 2 distinct distant values.
Corollary: distance values at time vertices are enqueued are monotonically increasing over time.
