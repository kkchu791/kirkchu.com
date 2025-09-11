---
title: "CLRS Graphs && Leetcode graphs - Day 16"
date: "2025-08-17"
description: "Leetcode Meta Questions Last 3 months continued"
---
Grinding meta questions last day

I also did a pramp with a binary search and my partner got shortest edit distance.

```js
// Will paste binary search here
```

```js
// Will paste shortest edit distance here
```

Shortest Path In Binary Matrix (Revisited)
```js
var shortestPathBinaryMatrix = function(grid) {
    
    if (grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) {
        return -1;
    }

    if (grid.length === 1 && grid[0].length === 1) {
        return 1;
    }

    const queue = [{coord: [0,0], cnt: 1}];
    let shortest = 0;
    const seen = new Set();

    function isOutOfBounds(r, c) {
        return r < 0 || r >= grid.length || c < 0 || c >= grid[0].length;
    }

    while (queue.length > 0) {
        let currEl = queue.shift()
        let row = currEl["coord"][0];
        let col = currEl["coord"][1];

        if (row === grid.length - 1 && col === grid[0].length - 1) {
            return currEl.cnt;
        }
        
        currEl["cnt"] = currEl["cnt"] + 1 ;
    
        const directions = [[row - 1, col],
        [row - 1, col + 1],
        [row, col + 1],
        [row + 1, col + 1],
        [row + 1, col],
        [row + 1, col - 1],
        [row, col - 1],
        [row - 1, col - 1]];

        for (let [r, c] of directions) {
            
            if (isOutOfBounds(r, c) || grid[r][c] === 1) {
                continue;
            }

            if (grid[r][c] === 0) {
                if (!seen.has(`${r},${c}`)) {
                    seen.add(`${r},${c}`);
                    queue.push({coord: [r, c], cnt:  currEl["cnt"] });
                }
            }

            // if (r === grid.length - 1 && c === grid[0].length - 1) {
            //     return currEl["cnt"];
            // }
        }
    }

    return -1;
};
```
