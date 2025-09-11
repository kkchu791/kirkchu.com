---
title: "Affirm Leetcode - Day 18"
date: "2025-08-18"
description: "Leetcode Affirm Questions"
---

Need to revisit this one.
```js
var RandomizedSet = function() {
    this.array = [];
    this.map = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    } else {
        this.array.push(val);
        this.map.set(val, this.array.length - 1);
        return true;
    }
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.map.has(val)) {
        const index = this.map.get(val)  // we get the index
        this.array[index] = this.array[this.array.length - 1]; // we assign the index el to be also equal the last el
        this.map.set(this.array[index], index);  // updateing the el at index, to the new index
        this.array.pop();
        this.map.delete(val);
        return true;
    } else {
        return false;
    }
};
```