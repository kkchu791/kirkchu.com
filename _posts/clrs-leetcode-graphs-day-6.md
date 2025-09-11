---
title: "CLRS Graphs && Leetcode graphs - Day 6"
date: "2025-08-07"
description: "Graph Question for Meta"
---

```js
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    // the asuumption is that once we've seen a city, and if we see it again its connected
    // Another way to say it, "After searching through direct and indirect relationships, we only want to count cities we haven't seen yet. They are new cities"
    // iterature through the length of isConnected
    // dfs search to popular seen
    // once finished, let's up the count
    const seen = new Set();
    let count = 0;

    const adjList = {};
    for (let r = 0; r < isConnected.length; r++) {
        for (let c = 0; c < isConnected[r].length; c++) {
            if (isConnected[r][c] === 1) {
                adjList[r] ? adjList[r].push(c) : adjList[r] = [c];
            }
        }
    }

    function dfs(i) {
        if (seen.has(i)) {
            return;
        }

        seen.add(i);

        for (let neighbor of adjList[i]) {
            dfs(neighbor);
        }        
    }

    for (let i = 0; i < isConnected.length; i++) {
        if (!seen.has(i)) {
            dfs(i)
            count++;
        }
    }

    return count;
};
```

Instead of creating an adjList, I it with just using the adjMatrix

```js

var findCircleNum = function(isConnected) {
    // trying with an adjMatrix
    let seen = new Set();
    let count = 0;

    function dfs(city) {
        if (seen.has(city)) {
            return;
        }

        seen.add(city);

        for (let i = 0; i < isConnected[city].length; i++) {
            if (isConnected[city][i] === 1) {
                dfs(i);
            }
            
        }
    }

    for (let r = 0; r < isConnected.length; r++) {
        for (let c = 0; c < isConnected[r].length; c++) {
            
            if (isConnected[r][c] === 1) {
                if (!seen.has(r)) {
                    dfs(r);
                    count++;
                }
            }
        }
    }

    return count;
};
```

Keys and Room implementation
```js
var canVisitAllRooms = function(rooms) {
    const seen = new Set();
    const adjList = {};

    for (let i = 0; i < rooms.length; i++) {
        adjList[i] = rooms[i];
    }

    function dfs(room) {
        if (seen.has(room)) {
            return;
        }

        seen.add(room);

        for (let key of adjList[room]) {
            dfs(key)
        }
    }

    dfs(0);
    return seen.size === rooms.length;
};
```