---
title: "CLRS Graphs && Leetcode graphs - Day 7"
date: "2025-08-08"
description: "Pramp and Graph Questions for Meta"
---

# Pramp

I got this today in pramp. Key things to remember are you have to try all possibilities. I think this might be greedy approach or brute force

```js
function coinChange(coins, amount) {
    // your code goes here

    const sortedCoins = coins.sort((a, b) => b - a);
    let bestCandidate = Number.MAX_SAFE_INTEGER;

    function isAmountAttainable(index, ourAmount, count) {
        if (ourAmount === 0) {

            console.log("we've found our match")
            return true;
        }

        if (ourAmount < 0) {
            return false;
        }

        ourAmount -= sortedCoins[index];

        if (ourAmount >= 0) {
            count["cnt"]++;
        }

        for (let j = index; j < sortedCoins.length; j++) {
            if (isAmountAttainable(j, ourAmount, count)) {
                return true;
            }
        }

        return false;
    }

    for (let i = 0; i < sortedCoins.length; i++) {
        let ourAmount = amount;
        let count = { cnt: 0}
        if (isAmountAttainable(i, ourAmount, count)) {
            bestCandidate = Math.min(bestCandidate, count["cnt"]);
        }
    }

    // weve found our match, but there might be better combinations down the line.
    return bestCandidate === Number.MAX_SAFE_INTEGER ? -1: bestCandidate;
}


console.log(coinChange([1, 3, 4], 6)); // expected output is 2, but got 3

```


The dp solution I went over, but since it's unlikely I'll get it on the interview, I'm gonna skip my implementation for now.

Revisited eventual states, which seem to be to be an exercise in using visited and visiting effectively.

```js

var eventualSafeNodes = function(graph) {
    const visiting = new Set();
    const visited = new Set();
    const res = [];

    function isSafe(node) {
        if (visiting.has(node)) {
            return false
        }

        if (visited.has(node)) {
            return true;
        }

        visiting.add(node);

        const neighbors = graph[node];
        for (let neighbor of neighbors) {
            if (!isSafe(neighbor)) { //here
                return false;
            }
        }

        visiting.delete(node);
        visited.add(node);
        return true;
    }

    for (let i = 0; i < graph.length; i++) {
        if (isSafe(i)) { // and here
            res.push(i);
        }
    }

    return res.sort((a, b) => a - b);

};
```