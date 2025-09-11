---
title: "CLRS Graphs && Leetcode graphs - Day 4"
date: "2025-08-05"
description: "Reading CLRS 22.2 -  Graph Questiosn for Meta"
---

Revisiting Number of Provinces

```js
var findCircleNum = function(isConnected) {
    // i guess my approach would be a bit different
    // i guess this is basically island count
    // i'm not sure why i didn't see it before

    // lineary iterate through the matrix
    // if i get a 1, i'll DFS in all directions
    // and when I've finished visiting ill turn it to 0
    // once it probagatew back to the source/root, ill update the global count
    // return the global count

    let count = 0;

    function isOutOfBounds(r, c) {
        return r < 0 || r >= isConnected.length || c < 0 || c >= isConnected[r].length;
    }

    function dfs(r, c) {
        if (isOutOfBounds(r, c)) {
            return;
        }

        if (isConnected[r][c] === 0) {
            return;
        }


        isConnected[r][c] = 0;

        dfs(r - 1, c); //top
        dfs(r, c + 1); // right
        dfs(r + 1, c); // bottom
        dfs(r, c - 1); // left
        
    }

    for (let r = 0; r < isConnected.length; r++) {
        for (let c = 0; c < isConnected[r].length; c++) {
            if (isConnected[r][c] === 1) {

                dfs(r - 1, c); //top
                dfs(r, c + 1); // right
                dfs(r + 1, c); // bottom
                dfs(r, c - 1); // left

                isConnected[r][c] = 0;

                count++;
            } 
        }
    }

    return count;
};
```

Not correct beacuse it's not number of islands questions

## Editorial Review

The connections are transitive (such that, if it applies between successive members of sequence, it must also apply between any two members taken in order). 

So by this definition if city a is directly connect with city b, and city b is directly connected with city c, then city a is indirectly connected with city c.

Revisting the editorial solution

```js
var findCircleNum = function(isConnected) {
    let count = 0
    const visited = new Array(isConnected.length).fill(false);

    function dfs(node) {
        visited[node] = true;

        for (let j = 0; j < isConnected.length; j++) {
            if (isConnected[node][j] === 1 && !visited[j]) {
                dfs(j)
            }
        }
    }

    for (let node = 0; node < isConnected.length; node++) {

        if (!visited[node]){
            count++;
            dfs(node);
        }
       
    }

    return count;
};

```
