---
title: "CLRS Graphs && Leetcode graphs - Day 20"
date: "2025-08-19"
description: "Leetcode Affirm Questions Last 3 months continued"
---

Get in the habit of revisiting interview questions you've missed

Shortest Uncommon Substring in an Array. Needs revisiting and didn't get the correct solution. People are saying the correct approach is brute force though.

I also did a pramp to prepare for affirm. I got merge intervals, and my partner got flatten dictionary. Take things slow and fully try to communicate what you're doing.

I also think i went over random insertion problem.

```js
var RandomizedSet = function() {
    this.map = new Map();
    this.list = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    }

    this.list.push(val);
    this.map.set(val, this.list.length - 1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.map.has(val)) {
        const index = this.map.get(val);
        this.list[index] = this.list[this.list.length - 1];
        this.map.set(this.list[index], index);
        this.list.pop();
        this.map.delete(val);
        return true;
    } else {
        return false;
    }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list[randomIndex];
};
```

```js
var shortestSubstrings = function(arr) {
    let res = [];

    function createSubString(word) {
        let subStrings = [];
        let numOfChars = 1;
        while (numOfChars <= word.length) {
            for (let i = 0; i <= word.length - numOfChars; i++) {
                let subString = word.slice(i, i + numOfChars);
                console.log(subString, 'subString')
                subStrings.push(subString);
            }
            numOfChars++;
        }

        return subStrings;
    }

    for (let word of arr) {
        let subStringList = createSubString(word);
        for (let subString of subStringList) {
            let found = false;

            for (let compareWord of arr) {
                if (compareWord === word) continue;
                if (compareWord.includes(subString)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                res.push(subString);
            }
        }
    }

    return res;
};
```

