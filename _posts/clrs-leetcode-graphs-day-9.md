---
title: "CLRS Graphs && Leetcode graphs - Day 9"
date: "2025-08-10"
description: "Leetcode Graphs BFS"
---

shortest Path Binary Matrix


```js
var shortestPathBinaryMatrix = function(grid) {
    if (grid[0][0] !== 0 || grid[grid.length - 1][grid[0].length - 1] !== 0) {
        return -1;
    }

    const visited = new Set();
    const queue = [{coordinates: [0, 0], count: 1}];


    while (queue.length > 0) {
        let currEl = queue.shift();
        
        if (visited.has(`${currEl["coordinates"][0]}${currEl["coordinates"][1]}`)) {
            continue;
        }

        visited.add(`${currEl["coordinates"][0]}${currEl["coordinates"][1]}`);

        let r = currEl["coordinates"][0];
        let c = currEl["coordinates"][1];

        if (r === grid.length - 1 && c === grid[0].length - 1) {
            return currEl["count"];
        }

        const directions = [
            [r - 1, c],
            [r - 1, c + 1],
            [r, c + 1],
            [r + 1, c + 1],
            [r + 1, c],
            [r + 1, c - 1],
            [r, c - 1],
            [r  - 1, c - 1]
        ]

        for (let i = 0; i < directions.length; i++) {
            let row = directions[i][0];
            let column = directions[i][1];

            const isOutOfBounds = row < 0 || row >= grid.length || column < 0 || column >= grid[r].length;
            if (isOutOfBounds) {
                continue;
            }

            if (visited.has(`${row},${column}`)) {
                continue;
            }

            if (grid[row][column] === 0) {
                if (!visited.has(`${row},${column}`)) {
                    queue.push({coordinates: [row, column], count: currEl["count"] + 1});
                }
            }

            if (row === grid.length - 1 && column === grid[0].length - 1) {
                return currEl["count"] + 1;
            }
        }

        // quick return which is if you don't find any 0s, you can return earl
    }
    return -1;
};
```


My approach at doing the Atlantic Pacific Water flow problem (Incomplete)

```js
var pacificAtlantic = function(heights) {
    const visited = new Map();
    res = [];

    function isReachableAtlantic(r, c) {
        // base case is if its iin visited just return the results

        //cached
        if (visited.get(JSON.stringify([r, c]))) {
            return visited.get(JSON.stringify([r, c])["isReachableAtlantic"]);
        }

        //brute force search until it breaks
        let right = true;
        for (let i = c; i < heights[0].length; i++) {
            if (heights[r][c] < heights[r][i]) {
                right = false;
                break;
            }
        }

        //brute force search until it breaks
        let bottom = true;
        for (let i = r; i < heights.length; i++) {
            if (heights[r][c] < heights[i][c]) {
                bottom = false;
                break;
            }
        }

        return (right && bottom);
    }


    function isReachablePacific(r, c) {
        //cached
        if (visited.get(JSON.stringify([r, c]))) {
            return visited.get(JSON.stringify([r, c])["isReachablePacific"]);
        }

        //brute force search until it breaks
        let left = true;
        for (let i = c; i <= 0; i--) {
            if (heights[r][c] < heights[r][i]) {
                right = false;
                break;
            }
        }

        //brute force search until it breaks
        let top = true;
        for (let i = r; i <= 0; i--) {
            if (heights[r][c] < heights[i][c]) {
                bottom = false;
                break;
            }
        }

        return (left && top);
    }

    for (let r = 0; r < heights.length; r++) {
        for (let c = 0; c < heights[r].length; c++) {

            let currEl = heights[r][c];
            
            const canReachA = isReachableAtlantic(r, c);
            const canReachP = isReachablePacific(r, c);

            visited.set(
                JSON.stringify([r, c]),
                {
                    isReachableAtlantic: canReachA,
                    isReachablePacific: canReachP,
                } 
            )

        
            if (canReachA && canReachP) {
                res.push([r, c])
            }
        }
    }

    return res;
};
```

