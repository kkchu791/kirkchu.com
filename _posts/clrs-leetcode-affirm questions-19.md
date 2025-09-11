---
title: "CLRS Graphs && Leetcode graphs - Day 19"
date: "2025-08-20"
description: "Leetcode Affirm Questions Last 3 months continued"
---

I did Affirm technicl screen interview which was this question:

```
first part: create function that takes in logs and returns users who meet these requirements( makes 2 differet loan type transaction and makes 2 transaction on different dates)
second part: create a function that calcTrustScore (score is based on 50 on one part/ 50 on second part another)
    first part: do we have enough data on the user and has he done this loan type transaction before, if yes (full 50)
    second part: get the min and max of all his transaction, and calculate if this current transaction is below it (calculate the percentage of how much its below it and add that the second score). For instance, if the the transaction he's trying to make is 80 and his lowest transaction is 100, the percentage of that is 20% so he gets 20 score for the second part
so his score would be 70
```

I revisited string compression in the morning. The key to that question is have 2 pointers, one pointer is the iterator and one pointer is the modifier pointer.

```js

var compress = function(chars) {
    let i = 0;
    let j = 0;

    while (i < chars.length) {
        let groupSize = 1; //2

        while (chars[i] === chars[i+groupSize]) {
            groupSize++;
        }

        chars[j] = chars[i]
        j++;

        if (groupSize > 1) {
            const strRep = groupSize.toString();
            chars[j] = strRep
            chars.splice(j, strRep.length, ...strRep.split(""));
            j += strRep.length;
        }

        i += groupSize;
    }

    return j;
};

```

PCC classes talk with counselor. That was lots of time wasted but it felt like I was doing work.


