---
title: "CLRS Graphs && Leetcode graphs - Day 10"
date: "2025-08-11"
description: "Leetcode Graphs BFS"
---

spiral Copy pramp


```js
function spiralCopy(inputMatrix) {
  const nextDirectionMap = {
    right: "bottom", // [r + 1, c]
    bottom: "left",
    left: "top",
    top: "right"
  }

  const directionRules = {
    right: []
  }

  const visited = new Set();
  let firstEl = inputMatrix[0][0]

  function dfs(row, column, direction) {
    if (isOutOfBounds || visited.has(`${row},${column}`)) {
      ,nextDirectionMap[direction]
    }

  }
  
  
  dfs(0, 0, "right");
}

// debug your code below
const inputMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]]

console.log(spiralCopy(inputMatrix))


// Steps
// 1. initialize a hashmap {right => bottom, bottom => left, left => top, top=> right} 
// initialize visited set with sting templates of coordinates
// 2. you do a dfs on the first element
        // if we hit undefined or visited, we switch directions and start dfs the other way
        // the dfs pushes the elemnt into a flat res array
        // theres a base case where it stops if all surrounded have been visited


// the rules
// if its undefined or already visited
// siwtch directions


// dfs in all directions
    // doesn't return on undefined or visited
    // it goes into the next direction
    // we need to pass in direction
    // and look up the next direction with hashmap lookup
    

// Base case: you stop when all surrounding nodes have been visited
```

Pacific Atlantic Water Flow Problem, what a tough one to code up and figure out

```js

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    const pQueue = [];
    const aQueue = [];
    const canReachP = new Set();
    const canReachA = new Set();
    const res = [];

    for (let r = 0; r < heights.length; r++) {
        pQueue.push([r, 0]); //00 10 20 30 40
        canReachP.add(`${r},0`) // 00 10 20 30 40

        aQueue.push([r, heights[0].length - 1]) // 04 14 24, 34, 44
        canReachA.add(`${r},${heights[0].length - 1}`)
    }

    for (let c = 0; c < heights[0].length; c++) {
        pQueue.push([0, c]); //01 02 03 04 05
        canReachP.add(`0,${c}`); // 00 10 20 30 40

        aQueue.push([heights.length - 1,c]); // 40, 41, 42, 43, 44
        canReachA.add(`${heights.length - 1},${c}`);
    }

    function findHighGround(queue, canReach) {
        while (queue.length > 0) {
            let [row, col] = queue.shift()
            const directionsOffset = [
                [1, 0],
                [0, 1],
                [-1, 0],
                [0, -1]
            ];

            for (let offset of directionsOffset) {
                let newRow = row + offset[0];
                let newCol = col + offset[1];

                function isOutOfBounds(row, col) {
                    return  row < 0 || row >= heights.length || col < 0 || col >= heights[0].length;
                }

                if (!isOutOfBounds(newRow, newCol) && !canReach.has(`${newRow},${newCol}`) && heights[newRow][newCol] >= heights[row][col]) {
                    queue.push([newRow, newCol]);
                }
            }

            canReach.add(`${row},${col}`);
        }
    }

    findHighGround(pQueue, canReachP);
    findHighGround(aQueue, canReachA);

    for (let r = 0; r < heights.length; r++) {
        for (let c = 0; c < heights[r].length; c++) {
            if (canReachP.has(`${r},${c}`) && canReachA.has(`${r},${c}`)) {
                res.push([r, c]);
            }
        }
    }

    return res;
    
};

//i'm gonna initialize pQueue and populate it with the edges of pacific ocean
// i'm also gonna initialize a set call canReachP, and it holds string template coordinates of all coordinates that can reach Pacific.
//i'm gonna do bfs from all directions
// and look for new flow to do this

// afterwards I'll look through the matrix and check if they are in both my p set and A set, if they are we can push them into the a res output.

// can reach 
```

Also revisted surrounded regions problem, I just got some of the matrix grid logic wrong

```
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    const leftEdge = [];
    const rightEdge = [];
    for (let r = 0; r < board.length; r++) {
        leftEdge.push([r, 0]);
        rightEdge.push([r, board[0].length - 1]);
    }

    const topEdge = [];
    const bottomEdge = [];
    for (let c = 0; c < board[0].length; c++) {
        topEdge.push([0, c]);
        bottomEdge.push([board.length - 1, c]);
    }

    const edges = [
        topEdge,
        bottomEdge,
        leftEdge,
        rightEdge,
    ]

    function dfs(r, c) {
        const isOutOfBounds = r < 0 || r >= board.length || c < 0 || c >= board[r].length;

        if (isOutOfBounds) {
            return;
        }

        if (board[r][c] === "O") {
            board[r][c] = "Unsurrounded";

            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r + 1, c);
            dfs(r, c - 1);
        }
    }

    for (let edge of edges) {
        for (let [r, c] of edge) {
            if (board[r][c] === "O") {
                dfs(r, c);
            }   
        }
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (board[r][c] === "Unsurrounded") {
                board[r][c] = "O";
            } else if (board[r][c] === "O") {
                board[r][c] = "X";
            }
        }
    }
};


// [["X","O","X","O","X","O"],
// ["O","X","O","X","O","X"],
// ["X","O","X","O","X","O"],
// ["O","X","O","X","O","X"]]
// reverse iteration

// go through and mark them as not surroundable
// turn O to X for one's that are not in not surroundable set
// and don't reutrn anything.


// [["X","X","X","X"],
// ["X","O","O","X"],
// ["X","X","O","O"],
// ["X","O","O","X"]]
// // iterate through the matrix
// if we find an O we
// we a dfs in all four directions and check if they are surrounded
    // surrounded is they either have x's and or o's around them and
    // or you can say they don't go out of bounds

```

sliding window problem, Contains Duplicate II

```js
var containsNearbyDuplicate = function(nums, k) {
    const set = new Set();

    let l = 0;

    for (let r = 0; r < nums.length; r++) {
        if (set.has(nums[r])) {
            return true;
        }

        set.add(nums[r]);
        

        if (set.size > k) {
            set.delete(nums[l])
            l++
        }

        
    }


    return false;
};
```