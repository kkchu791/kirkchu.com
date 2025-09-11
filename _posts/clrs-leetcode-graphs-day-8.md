---
title: "CLRS Graphs && Leetcode graphs - Day 8"
date: "2025-08-09"
description: "CLRS on DFS and Leetcode"
---

# Depth First Search 

DFS is about search deeply in deeper into the graph.

When its goes as deep as it can, it backtracks and then explores more edges

Predecessor subgraph  - a tree derived from a graph that has most recent visited or shortest path

When you do DFS, it adds a timestamp to each level going down, and it also adds a color to the nodes

Depth first forest is something DFS creates. When DFS happens it creates multiple trees to find how to reach all vertices from your current node. The creates the the image of a forest.

So it goes on to say how DFS works, seems like you visit a node and then you visit all the neigbors in that node one by on through dfs, and throughout the process you give a timestamp and distance

The runtime would be O(vertices + edges) of DFS on a graph.

Noteable properties of Depth First search
1. It looks like a forest, it does create many trees its ran.
2. The discovery and finishing times form a parenthesis structure. I think it means when it propagates back up its able to  close all the parenthesis it's opened.
3. You can classify edges
    a. Tree edges - a tree edge is a normal edge when you first discover a new vertex.
    b. Back edges - a back edge is when you connect an edge to an ancestor. Self lopps are back edges.
    c. Forward edges - a forward edge is when you connect to an vertex that is already discovered. 
    d. Cross edges - totally unrelated edges, not connected edges because they don't belong to the same 
    graph

    i. WHITE indicates a tree edge
    ii. GRAY indicates a back edge
    iii. BLACK indicates a forward or cross edge

## Topological sort

Its way to sort based on ordering of when things need to happen.

How it works:
1. Calls a dfs function to compute finishing times for each vertex.
2. As As each vertex finishes, we insert the the vertex to a list
3. Return the list of vertices.

## Strongly connected components

So it sounds like this is useful for complex graph systems and simplifying them into DAGS.
How it works:
1. Calls a dfs function the on the graph to comput finishing times for each vertex
2. Transpose or Reverse the graphs direction
3. Call dfs on the transposed graph, but consder the nodes in ord of decreasing finishing times
4. Assign it to a a strongly connected component.


Max Area of Island

```js
var maxAreaOfIsland = function(grid) {
    let bestCandidate = 0;
    const visited = new Set();

    function isOutOfBounds(r, c) {
        return r < 0 || r >= grid.length || c < 0 || c >= grid[r].length;
    }

    function search(r, c) {
        if (isOutOfBounds(r, c) || grid[r][c] === 0) {
            return 0;
        }

        if (visited.has(`${r},${c}`)) {
            return 0;
        }

        visited.add(`${r},${c}`);
        let count = 1;

        count += search(r - 1, c, count);
        count += search(r, c + 1, count);
        count += search(r + 1, c, count);
        count +=  search(r, c - 1, count);

        return count
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                let count = search(r, c);
                bestCandidate = Math.max(count, bestCandidate);
            }
        }
    }

    return bestCandidate;
};
```

clone graph 

```js


 
// function _Node(val, neighbors) {
//     this.val = val === undefined ? 0 : val;
//     this.neighbors = neighbors === undefined ? [] : neighbors;
// };


/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    console.log(node, 'node')
    const seen = new Set();

    function dfs(oldNode) {
        if (seen.has(oldNode)) {
            return oldNode;
        }

        seen.add(oldNode);

        console.log(oldNode, 'what is node')
        const nodeCopy = new _Node(oldNode.val);

        console.log(nodeCopy, "nodeCopy")
        const neighborsCopy = []; 
        const neighbors = node.neighbors;
        for (let neighbor of neighbors) {
            neighborsCopy.push(dfs(neighbor))
        }

        nodeCopy.neighbors = neighborsCopy;

        return nodeCopy;
    }

    return dfs(node);
};
```

clone graph revisited

```js
var cloneGraph = function(node) {
    console.log(node, 'node')
    const seen = new Map();

    function dfs(oldNode) {

        if (oldNode === null) return null;
          
        if (seen.has(oldNode)) return seen.get(oldNode);

        const nodeCopy = { val: oldNode.val, neighbors: [] };

        seen.set(oldNode, nodeCopy);

        for (let neighbor of oldNode.neighbors) {
            nodeCopy.neighbors.push(dfs(neighbor));
        }

        return nodeCopy;
    }

    return dfs(node);
};
```

rotting oranges

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const rotten = [];
    let freshCount = 0;
    let minute = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 2) {
                rotten.push([r, c]);
            }

            if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    console.log(freshCount, 'freshCount')

    if (freshCount === 0) {
        return 0;
    }

    if (rotten.length === 0 && freshCount > 0) {
        return -1;
    }

    while (rotten.length > 0) {
        let size = rotten.length

        for (let i = 0; i < size; i++) {
            let currEl = rotten.shift();

            const coordinates = [
                [currEl[0] - 1, currEl[1]], // top
                [currEl[0], currEl[1] + 1], // right
                [currEl[0] + 1, currEl[1]], // bottom
                [currEl[0], currEl[1] - 1] // left
            ] 

            coordinates.forEach(([r, c]) => {
                const isInBound = r >= 0 && r < grid.length && c >= 0 && c < grid[r].length;
                if (isInBound && grid[r][c] === 1) {
                    rotten.push([r, c])
                    grid[r][c] = 2;
                    freshCount--;
                }
            });

        }
        
        minute++;

    }
    return freshCount === 0 ? minute - 1 : -1;
};
```