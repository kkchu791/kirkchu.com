---
title: "Leetcode graphs - Day 1"
date: "2025-08-02"
description: "Going through graph leetcode questions for meta"
---

Island Perimeter
```js

// create a global count
// iterate throught the matrix
// create isValidPerimeter
//  is it a 0 or undefined, its valid
//  up the count


var islandPerimeter = function(grid) {
    let count = 0;

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) {
                const top = grid[r - 1]?.[c];
                const right = grid[r]?.[c + 1];
                const bottom = grid[r + 1]?.[c];
                const left = grid[r]?.[c - 1];

                [top, right, bottom, left].forEach(val => {
                    if (val === 0 || val === undefined) {
                        count++;
                    }
                });
            }
        }
    }    

    return count;
};

```

Find Judge
```js
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    //iterate through 0 .. n
    // create trust adjacency list
    // chech values that are not in adjList, these are possible judges
    // iterate through adj List and make sure each sure everyone has the possible Candidate judge in their list
    // return judge number
    // else return -1

    const adjList = {};

    for (let i = 0; i < trust.length; i++) {
        if (adjList[trust[i][0]]) {
            adjList[trust[i][0]].push(trust[i][1]);
        } else {
            adjList[trust[i][0]] = [trust[i][1]];
        }
    }

    if (Object.keys(adjList).length === 0) {
        return -1;
    }

    let possibleCandidate = [];

    for (let i = 1; i <= n; i++) {
        if (!adjList[i]) {
            possibleCandidate.push(i);
        }
    }

    console.log(possibleCandidate, 'possibleCandidate')

    
    let judge = -1
    possibleCandidate.some(candidate => {
        if (Object.values(adjList).every(trustGroup => {
            return trustGroup.includes(candidate);
        })) {
            judge = candidate;
        }
    });

    return judge;
};
```


Course Scheduler
```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const visited = new Set();
    
    // create an adjacent list
    const adjList = {};

    for (const [course, preReq] of prerequisites) {
        if (adjList[course]) {
            adjList[course].push(preReq);
        } else {
            adjList[course] = [preReq];
        }
    }

    function isPossibleToFinish(course, visiting) {
        //base case
        // if we've seen this in this time around return false cuz its circular now
        if (visiting.has(course)) {
            return false;
        }

        if (visited.has(course)) {
            return true;
        }

        visiting.add(course);

        console.log(adjList, course);

        if (adjList[course]) {
            for (let preReq of adjList[course]) {
                return isPossibleToFinish(preReq, visiting);

            }
        }
       

        visited.add(course);
        return true;
    }

    let possibleToFinish = true;
    for (let course = 0; course < numCourses; course++) {
        // dfs search
        const visiting = new Set();
        if (!isPossibleToFinish(course, visiting)) {
            possibleToFinish = false;
        }
    }

    return possibleToFinish;

};
```