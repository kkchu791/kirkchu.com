---
title: "CLRS Graphs && Leetcode graphs - Day 14"
date: "2025-08-15"
description: "Leetcode Meta Questions Last 3 months"
---
Grinding meta questions 2 days away 

Merge arrays revisited (trick is to remember i gets placed first before j)

```js
 */
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;

    for (let k = nums1.length - 1; k >= 0; k--) {
        if (j < 0) {
            break;
        }

        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--
        }

      
    }

    return nums1; 
};
```
# Top K Frequent Elements
```js
var topKFrequent = function(nums, k) {
    const counter = new Map();

    for (let num of nums) {
        counter.has(num) ? counter.set(num, counter.get(num) + 1) : counter.set(num, 1);
    }    

    const mapEntries = [...counter.entries()];

    sorted = mapEntries.sort((a, b) => b[1] - a[1]);

    return sorted.slice(0, k).map(el => el[0])
};

```


Basic Calculator II

```js
function isNumeric(str) {
  if (str === " ") return false;
  return !isNaN(Number(str));
}

var calculate = function(s) {
    let i = 0;
    let cur = 0;
    let prev = 0;
    let res = 0;
    let cur_operation = "+";
    while (i < s.length) {
        let cur_char = s[i];

        if (isNumeric(cur_char)) {
            while (i < s.length && isNumeric(s[i])) { 
                cur = cur * 10 + parseInt(s[i]);
                i++;
            }

            i--;

            if (cur_operation === "+") {
                res += cur;
                prev = cur;
            } else if (cur_operation === "-") {
                res -= cur;
                
                prev = -cur;
            } else if (cur_operation === "*") {
                res -= prev;
                res += prev * cur;
                prev = prev * cur;
            } else {
                res -= prev;
                res += parseInt(prev/cur);
                prev = parseInt(prev/cur);
            }


        } else if (cur_char !== " ") {
            cur_operation = cur_char;
        }
        cur = 0;
        i++;
    }
    return res;
};

```

Find First and Last Position of Element in Sorted Array
```js
var searchRange = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (target === nums[mid]) {
            let left = mid;
            let right = mid;
            while (nums[left] === target) {
                left--;
            }

            left++;
            start = left;

            while (nums[right] === target) {
                right++;
            }
            right--;
            end = right;

            return [start, end];
        }

        if (target < nums[mid]) {
            high = mid - 1;
        }

        if (target > nums[mid]) {
            low = mid + 1;
        }
    }

    return [-1, -1];
};
```

Simplify Path (needs revisiting)
```js
var simplifyPath = function(path) {
   let arr = path.split("/").filter(Boolean);
    console.log({arr})
   let res = ""

   for (let i = 0; i < arr.length; i++) {
        let next = arr[i+1];
        let cur = arr[i];

        if (next === '..') {
            i += 1;
            continue;
        }

        if (cur === '.') {
            continue;
        }

        if (cur === '..') {
            // res = '/'
            continue;
        }
        console.log({res}, {cur})
        res += '/' + cur;
   }

   return res.length === 0 ? "/" : res;
};
```

