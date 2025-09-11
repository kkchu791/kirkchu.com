---
title: "CLRS Graphs && Leetcode graphs - Day 11"
date: "2025-08-12"
description: "Leetcode Sliding Windows for Meta"
---
best time to buy and sell stocks I

```js
var maxProfit = function(prices) {
    let l = 0;
    let maxProfit = 0;

    for (let r = 0; r < prices.length; r++) {
        if (prices[r] < prices[l]) {
            l = r;
            continue;
        }

        if (prices[r] > prices[l]) {
            maxProfit = Math.max(maxProfit, prices[r] - prices[l]);
        }
    }
    
    return maxProfit;
};
```

best time to buy and sell stocks II

```js
var maxProfit = function(prices) {
    let l = 0;
    let accProfit = 0;

    for (let r = 0; r < prices.length; r++) {
        if (prices[r] > prices[l]) {
            let profit = prices[r] - prices[l];
            accProfit += profit;
            l = r;
        }

        if (prices[r] < prices[l]) {
            l = r;
        }
    }
    return accProfit;
};

```

Longest repeating 
```js
var characterReplacement = function(s, k) {
    const currFreq = new Map();
    let l = 0;
    let longest = 0;
    let max = 0;

    for (let r = 0; r < s.length; r++) {
        if (currFreq[s[r]]) {
            currFreq[s[r]]++
        } else {
            currFreq[s[r]] = 1;
        } 
                
        max = Math.max(max, currFreq[s[r]]);

        while ((r - l + 1) - max > k) {
            currFreq[s[l]]--
            l++;
            max = Math.max(...Object.values(currFreq));
        }

        longest = Math.max(longest, r - l + 1);
    }

    return longest
};

```

Need to revisit my approach on this one ..Number of Substrings Containing All Three Characters

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
            }

            l++;
        }
    }

    return count;
};

```

Longest Substring Without Repeating Characters

```js
var lengthOfLongestSubstring = function(s) {
    const seen = new Set();
    let l = 0
    let longest = 0;

    for (let r = 0; r < s.length; r++) {
        while (seen.has(s[r])) { 
            seen.delete(s[l]);
            l++
        }

        // calculate longest
        seen.add(s[r]);
        longest = Math.max(longest, r - l + 1);
    } 

    return longest;

};
```