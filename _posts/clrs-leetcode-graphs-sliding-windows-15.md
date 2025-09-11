---
title: "CLRS Graphs && Leetcode graphs - Day 15"
date: "2025-08-16"
description: "Leetcode Meta Questions Last 3 months continued"
---
Grinding meta questions 1 days away 


Simplify Path w/ Stacks (Revisited)

```js
var simplifyPath = function(path) {
   let arr = path.split("/").filter(Boolean);

   
   const stack = []
   let res = ""

   for (let i = 0; i < arr.length; i++) {
        console.log(stack, 'stack')
        let cur = arr[i];

        if (cur === '..') {
            
            if (stack.length > 0) {
                let stackEl = stack.pop();
                let deleteAmt = stackEl.length + 1;
                let newRes = res.slice(0, -deleteAmt);
                
                res = newRes;
            }
          
            continue;
        }

        if (cur === '.') {
            continue;
        }

        stack.push(cur)
        res += '/' + cur;
   }

   return res.length === 0 ? "/" : res;
};

```

We also did a mock interview with 2 questions

Unique Paths II
```js

var uniquePathsWithObstacles = function(obstacleGrid) {
       let count = 0

       function isOutOfBound(r, c) {
         return r < 0 || r >= obstacleGrid.length || c < 0 || c >= obstacleGrid[0].length;
       } 


       function dfs(r, c) {
        if (isOutOfBound(r,c) || obstacleGrid[r][c] === 1 ) {
            return;
        }

        if (r === obstacleGrid.length - 1 && c === obstacleGrid[0].length - 1) {
            count++;
            return;
        }

        dfs(r, c + 1)
        dfs(r + 1, c) //down

       }
       
       dfs(0, 0)

       return count;
};
```

Min Remove to Make Valid
```js

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    const stack = [];

    let res="";

    for (let i = 0; i < s.length; i++) {
        let char = s[i];


        if (char === ")" && stack.length === 0) {
            continue;
        }

        if (char === "(") {
            stack.push(char)
        }

        if (char === ")") {
            stack.pop();
        }

        res += char
    }
    console.log(res);
    return res;
};

// // stack = [3 5]

// //  = slice(start, end)
// // "lee(t(c)o)de(("

// // if we find an open
// // we push it in our stack




// // if we find a close
// // we pop from our stack

// // if we find a close and our stack empty
// //remove ) from our string

// iterate right to left
// when we see ( we remove it


// return the string






//  "ab(c)d"
//  "))(("

```

We did this question (Find Peak Element)

```js
var findPeakElement = function(nums) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        
        cur = nums[mid];
        left = nums[mid - 1] === undefined ? Number.NEGATIVE_INFINITY : nums[mid - 1] 
        right = nums[mid + 1] === undefined ? Number.NEGATIVE_INFINITY : nums[mid + 1] 

        if (cur > left && cur > right) {
            return mid;
        } else if (cur < right) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
};

//do binary search
// you find a middle
// you look to your left and right
// if you find both are lower, you have a peak
// but if they ascending in particular direction, you always want to halve toward the higher side
```
