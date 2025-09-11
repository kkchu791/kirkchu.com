---
title: "CLRS Graphs && Leetcode graphs - Day 2"
date: "2025-08-03"
description: "Reading CLRS 22 - Elementary Graph Algorithms and Leetcode Graphs for Meta"
---

# CLRS Graphs Notes

Techniques for search a graph is the heart of graph algorithms.

2 common representations of graphs are adjacency lists and adjacency matrices.

The things we will go through are:
1. 2 Representations of graphs: Adjacency Lists and Adjacency Matrixes
2. Breath First Search and how to create a BFS Tree
3. Depth First Search and prrofs on DFS search visiting vertices
4. Real application for DFS: Topoligcally sorting a Directed Acyclic Graph
5. Second application of DFS, finding strongly connected components in a directed graph


### 22.1 Representations of Graphs

Adjacency Lists are good way to represent **sparse** graphs, which are graphs where edges (lines) are much less than the vertices (nodes).

When a graph is **dense**, graphs where edges are almost the same amount as vertices, adjacency matrix representation is preferred.

Image of the differnt types of representations

The next paragraph talks about the adjacency representation which is that's its a hash table, and the key represents the node, and the values (a list of nodes), represents all the nodes the key node is connected to.
```js
For example:
    0 -> 1 -> 2

Adjacency list would be:
    {
        0: [1],
        1: [2],
        2: [],
    }
```

The amount of memory and it requires is O(V+E).

###### Weighted graphs

Graphs where each edge has a weight assigned to it.

We usually store it as this:

```js
        0  -> 1 -> 2
weight     10   5
Adj list would be:
{
    0: [[1, 10]],
    1: [[2, 5]],
    2: []
}
```

Adjacency matrix requires O(V^2) memory, so its much larger than adjacency matrixes (O(V+E)).

The Adj matrix can also represent a weighted graph. Even though adj list is likely smaller use of memory, Adj matrix are simpler, so they may be the prefered apporach when graphs are reasonably small. Also Adj are good for unweighted graphs: ththeyye require only one bit per entry.

```js
        0  -> 1 -> 2
weight:    10   5
Adj matrix  would be:

  0  1  2 
0 0 10  0   

1 0  0  5

2 0  0  0 
```


# Leetcode

Revisit Twon Judge


```js

var findJudge = function(n, trust) {
    // two counts
    // one list of tracks is how many people you trust
    // the other track is who trust you
    // I guess you can think of it as indegrees and outdegrees
    // how many people are you connected to and how many people connect with you
    // then you loop through the n and see which one satisfies the judge requirements
        // everyone trust you so your group trust level should equal n - 1
        // you don't trust anyone so your trust level is 0
    
    // if you don;t find it return -1;

    const groupTrustScore = new Array(n).fill(0);
    const individualTrustScore = new Array(n).fill(0);

    for (let [truster, trustee] of trust) {
        groupTrustScore[trustee - 1]++;
        individualTrustScore[truster - 1]++;
    }


    for (let candidate = 0; candidate <= n; candidate++) {
        if (groupTrustScore[candidate] === n - 1 && individualTrustScore[candidate] === 0) {
            //because candidate is at 1 based index
            return candidate + 1;
        }
    }

    return -1;
};
```

Revision for Town Judge yesterday, same approach
```js
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    //Build the adjList
    // Figure out who the possible judges are by figuring in our adjacency list
    // select the judge by seeing if he is in everyones list
    // return the judge
    // else return -1
    const adjList = {};
    // trustor : these are the people they trust
    for (let [trustor, trusted] of trust) {
        if (adjList[trustor]) {
            adjList[trustor].push(trusted);
        } else {
            adjList[trustor] = [trusted];
        }
    }

    // the person not in the adjlist is a possible judge
    let candidates = [];
    for (let possibleJudge = 1; possibleJudge <= n; possibleJudge++) {
        if (!adjList[possibleJudge]) {
            candidates.push(possibleJudge);
        }
    }

    for (let candidate of candidates) {
        let isTrustedByAll = true;

        // instead of looping through adjList i'd loop through n to make sure everyone trust the candidate
        // before declaring him the judge

        for (let person = 1; person <= n; person++) {

            // skip the candidate
            if (person === candidate) {
                continue;
            }

            // get the person's trusted list
            if (adjList[person]) {
                // if candidate is not in that list turn isTrustedByAll to false and break
                if (!adjList[person].includes(candidate)) {
                    isTrustedByAll = false;
                    break;
                }
            } else {
                //  if the person has no list
                // we also must declare IsTrustedByall to false and break
                isTrustedByAll = false;
                break;
            }
        }

        if (isTrustedByAll) {
            return candidate;
        } 
    }
    return -1
};
```


course scheduler revisited

```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // i think the things is do is cycle detection
    // and you want to make sure you can go through all courses
    // so if you create an adjacency list, it will give you a good representation of what courses you need to take for each course
    // {1: [0]}
    // you can then do dfs to go through all the course and make sure you don't run to any cycles
    // if you run into a cycle that's not good and it's impossible to finish all courses

    // once you've gone through a course sequence, you can determine that course has been visited
    // and you know its possible to go through that course the next time you see it again, so itsl like a cache
    // you want to go through all courses so you'll iterate with numCourses

    // create adjList
    const adjList = {}
    const visiting = new Set();
    const visited = new Set()


    for (let [course, prereq] of prerequisites) {
        if (adjList[course]) {
            adjList[course].push(prereq);
        } else {
            adjList[course] = [prereq];
        }
    }

    // supplemneting the adjList with courses with no prereqs
    for (let course = 0; course < numCourses; course++) {
        if (!adjList[course]) {
            adjList[course] = [];
        }
    }

    function canTraverseAllPrereqs(course) {
        if (visited.has(course)) {
            return true;
        }

        if (visiting.has(course)) {
            return false;
        }

        visiting.add(course);

        for (let prereq of adjList[course]) {
            if (!canTraverseAllPrereqs(prereq)) {
                return false;
            }
        }
        visited.add(course);
        visiting.delete(course);
        return true;
    }

    for (let course = 0; course < numCourses; course++) {
        if (!canTraverseAllPrereqs(course)) {
            return false;
        }
    }

    return true;
};

```