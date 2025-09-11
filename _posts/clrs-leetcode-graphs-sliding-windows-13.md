---
title: "CLRS Graphs && Leetcode graphs - Day 13"
date: "2025-08-14"
description: "Leetcode Sliding Windows for Meta"
---
Grinding meta questions until the meta interview which 3 days away.

Valid Palindrome II

```js

var validPalindrome = function(s) {
    let i = 0
    let j = s.length - 1

    function isValidP(i, j) {
        while (i < j) {
            if (s[i] !== s[j]) {
                return false;
            }
            i++;
            j--;
        }

        return true;
    }


    while (i < j) {
        if (s[i] !== s[j]) {
            return isValidP(i, j - 1) || isValidP(i + 1, j)
        }
        i++;
        j--;   
    }


    return true;
};
```

Minimum Remove to Make Valid Parentheses

```js
var minRemoveToMakeValid = function(s) {
    const stack = [];

    function deleteCharAtIndex(index) {
        if (index < 0 || index >= s.length) {
            return str;
        }
        s = s.slice(0, index) + s.slice(index + 1);
    }
    
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char === ")" && stack.length === 0) {
            deleteCharAtIndex(i)
            i = i - 1;
        }

        if (char === ")" && stack.length > 0) {
            stack.pop()
        }

        if (char === "(") {
            stack.unshift("(")
        }
    }

    if (stack.length > 0) {
        for (let i = s.length - 1; i >= 0; i--) {
            if (s[i] === "(") {
                stack.pop()
                deleteCharAtIndex(i)
                i = i + 1;
            }

            if (stack.length === 0) {
                break;
            }
        }
    }

    return s;

};

```

Binary Tree Right Side View

```js
 * @param {TreeNode} root
 * @return {number[]}
 */

var rightSideView = function(root) {

    let counter = {};

    function dfs(node, depth) {
        if (!node) {
            return;
        }

        if (counter[depth] === undefined) {
            counter[depth] = node.val;
        }

        dfs(node.right,  depth + 1 );
        dfs(node.left, depth + 1 );
    }

    dfs(root, 0)
    return Object.values(counter);
};
 
// //steps
// //initialize a depthCounter
// // depthCount = 0

// dfs(node, depthCount)
//   // add the counter if counter the def
// // just return the values

// // if its new depth we add property to our object of depth and the value
// // we dfs to the right first
// then we dfs to the left
// // each dfs we check if the hash hash the current Counter as a key
// // if it doesn't we add it to our hash
// // if it does wi don't do anything

```

Random Pick with Weight

```js
var Solution = function(w) {
    this.w = w;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const weights = this.w;
    const flatArray = [];

    for (let i = 0; i < weights.length; i++) {
        let numbers = new Array(weights[i]).fill(i);
        flatArray.push(...numbers)
    }

    const randomElement = flatArray[Math.floor(Math.random() * flatArray.length)];

    return randomElement;
};
```


Kth Largest Element in an Array

```python
import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        for i in range(len(nums)):
            nums[i] = nums[i] * -1
        
        heapq.heapify(nums)

        while (k > 0):
            num = heapq.heappop(nums)

            if k == 1:
                return num * -1
            k -= 1
```

Sorted Intervals

```js
var merge = function(intervals) {
    const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    let state = intervals[0];


    for (let i = 1; i < sortedIntervals.length; i++) {
        let intervalB = sortedIntervals[i]

        if (state[1] >= intervalB[0]) {
            state[0] = Math.min(state[0], intervalB[0]);
            state[1] = Math.max(state[1], intervalB[1]);
        } else {
            res.push(state);
            state = intervalB;
        }
    }

    res.push(state);
    return res;

};
```

merge sorted array 
```js
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;

    for (let k = nums1.length - 1; k >= 0; k--) {

        if (j < 0) {
            break;
        }
        
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--

        } else {
            nums1[k] = nums2[j]
            j--;
        }

    
    }

    return nums1;
};
```