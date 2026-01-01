---
title: "Amazon leetcode stacks - Day 2"
date: "2025-09-17"
description: "Amazon Leetcode for OA"
---
```js
function maxSubarraySum(nums) {
    let best = Number.MIN_SAFE_INTEGER;
    let l = 0;
    let currWindowSum = 0;

    for (let r = 0; r < nums.length; r++) {

        currWindowSum += nums[r];

        best = Math.max(best, currWindowSum);
        while (currWindowSum < 0) {
            currWindowSum -= nums[l];
            l++;
            r = l - 1;
        }
    }

    return best === Number.MIN_SAFE_INTEGER ? 0 : best;
}

```

// debug your code below
console.log(maxSubarraySum([0, -1, 2, 3, -1, 0]));