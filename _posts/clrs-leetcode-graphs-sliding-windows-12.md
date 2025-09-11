---
title: "CLRS Graphs && Leetcode graphs - Day 12"
date: "2025-08-13"
description: "Leetcode Sliding Windows for Meta"
---

Revisiting String Permutation (remember there are two kind of things to be aware of for this one (if letter doesn't match and if our counter goes over ref))

```js

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    let ref = new Map();
    let counter = new Map();

    for (let char of s1) {
        if (ref.get(char)) {
            ref.set(char, ref.get(char) + 1);
        } else {
            ref.set(char, 1);
        }

        counter.set(char, 0)
    }
    
    l = 0;

    function resetCounter() {
        for (const [char, count] of counter) {
            counter.set(char, 0);
        }
    }

    function mapsEqual(m1, m2) {
        for (let [key, val] of m1) {
            if (!m2.get(key)) {
                return false
            }
            if (m2.get(key) !== val) {
                return false
            }
        }
        return true;
    }

    function isCounterGreater(ref, counter) {
        for (let [key, value] of counter) {
            if (counter.get(key) > ref.get(key)) {
                return true;
            }
        }

        return false;
    }


    for (let r = 0; r < s2.length; r++) {

        while(!ref.get(s2[r])) {
            r++;
            l = r;
            resetCounter();

            if (r === s2.length) {
                break;
            }
        }

        counter.set(s2[r], counter.get(s2[r]) + 1)

        while (isCounterGreater(ref, counter)) {
            counter.set(s2[l], counter.get(s2[l]) - 1)
            l++
        }

        if (mapsEqual(ref, counter)) {
            return true;
        }
    }

    return false;
};

// Steps

// we'll initialize our ref (ref to count of s1) and counter (counters to 0)
// they will be maps
// we can create a helper function to check if counts match between the two maps
// we can also compare Json Strings
// if it matches we return true 


// else the r reaches the end and we return false

// // our truths
// if we find a letter not in ref, its not possible to make a permutation out of the current window.
//     we can use r to search for a letter in ref
//     if it finds one, we move l to r, update our counter, and start the search again


// if the counts match in both ref and counter, we have a permutation and can return true

```
Number of Substrings Containing All Three Characters revisited()

```js
var numberOfSubstrings = function(s) {
    // there has to a quick check to make sure s has the char a b and c

    const chars = new Set(s);

    if (!chars.has('a') || !chars.has('b') || !chars.has('c')) {
        return 0
    }

    const charCount = {};
    for (let char of s) {
        charCount[char] = 0;
    }

    let l = 0
    let count = 0;

    function isComplete(hash) {
        for (let key in hash) {
            if (hash[key] <= 0) {
                return false;
            }
        }

        return true;
    }


    for (let r = 0; r < s.length; r++) {
        charCount[s[r]]++

        if (isComplete(charCount)) {
            count++;
            let remainingCharCount = (s.length - 1) - r;
            count += remainingCharCount
        }


        while (isComplete(charCount)) {
            charCount[s[l]]--;
            
            if (charCount[s[l]] !== 0) {
                count++;
                let remainingCharCount = (s.length - 1) - r;
                count += remainingCharCount
            }

            l++;
        }
    }

    return count;
};

// Input: s = "abcabc"
//             l
//               r
// charCount = {a: 0 b:1  c:1 }
// count = 3
// "a a a c b"
//        l
//            r
// Output: 10

// char = a b c

// Rules:
// when you hit all character at least once, you can up the counter
// as many characters as you have to the right, you can add that the count
// decrement the window, add to the count until you have character at 0
// the search again for the next one

// 2 assumptions: 1 is like once you find at least one of each, the number of chars to the right of it are all going to valid so you can add those to the count

// as your decrement, up the counter until you valid anymore
```

Did this problem next Minimum Size Subarray 

```js
var minSubArrayLen = function(target, nums) {
   let min = Number.MAX_SAFE_INTEGER;
   let count = 0;
   let l = 0;

   for (let r = 0; r < nums.length; r++) {
        count += nums[r];

        while (count >= target) {
            min = Math.min(min, r - l + 1);
            count -= nums[l];
            l++;
        }
   }

   return min === Number.MAX_SAFE_INTEGER ? 0 : min;
};

```