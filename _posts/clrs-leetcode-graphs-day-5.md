---
title: "CLRS Graphs && Leetcode graphs - Day 5"
date: "2025-08-06"
description: "Graph Question for Meta"
---

Got this question for pramp today. Its [similar sentences](https://leetcode.com/problems/sentence-similarity/) in leetcode.

```js

function areSentencesSimilar(sentence1, sentence2, similarPairs) {

    if (sentence1.length !== sentence2.length) {
        return false;
    }
    // your code goes here
    // build the adjacency list of similar pairs
    const pairs = {};
    for (let [word1, word2] of similarPairs) {
        if (pairs[word1]) {
            pairs[word1].add(word2);
        } else {
            pairs[word1] = new Set([word2]);
        }

        if (pairs[word2]) {
            pairs[word2].add(word1);
        } else {
            pairs[word2] = new Set([word1]);
        }
    }

    function isValidMatch(source, target, visited) {
        
        let set = pairs[source];

        if (visited.has(source)) {
            return false;
        }

        visited.add(source);

        // base case is if it doesn't exist in our adj list or has no values return
        if (!set) {
            return false;
        }

        // first i think we can do the direct check, if its in the set we can immediately return true
        if (set.has(target)) {
            return true;
        }

        // iterate through the set now and see if other words will have it a relationship
        for (const possibleWord of set) {
            if (isValidMatch(possibleWord, target, visited)) {
                return true
            } 
        }
        return false;
    }

    for (let i = 0; i < sentence1.length; i++) {
        if (sentence1[i] !== sentence2[i]) {
            const visited = new Set()
            if (!isValidMatch(sentence1[i], sentence2[i], visited)) {
                return false;
            }
        }
    }

    return true;

    
    // 2 pointers
    // base case, if length are the not same you can return false
    // iterate through the sentences
    // once you iterate through the one sentence you can return true or false
}

// the adjList needs to look like 

// {
// love: {adore},    
// adore: {like},
// like: {love}
// debug your code below
const sentence1 = ["I", "love", "Python"];
const sentence2 = ["I", "like", "Python"];
const similarPairs = [
  ["love", "adore"],
  ["adore", "like"],
  ["like", "love"]  // ← creates a cycle: love ↔ adore ↔ like ↔ love
];

console.log(areSentencesSimilar(sentence1, sentence2, similarPairs));
```