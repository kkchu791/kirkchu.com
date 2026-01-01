---
title: "Amazon leetcode stacks - Day 1"
date: "2025-09-17"
description: "Amazon leetcode for OA"
---


Need to revisit basic calculator II, couldn't quite figure it out.
```js
var calculate = function(s) {
    const stack = [];
    let currOperation = "+";

    for (let char of s) {
        if (!isNaN(Number(char))) {
            let num = Number(char);

            if (currOperation === "-") {
                stack.push(-num);
            } else if (currOperation === "*") {
                let prev = stack.pop();
                stack.push(prev * num);
            } else if (currOperation === "/") {
                let prev = stack.pop();
                if (num === 0) throw new Error("Division by zero");
                stack.push(prev / num);
            } else { // '+'
                stack.push(num);
            }
        } else if (char === '-') {
            currOperation = '-';
        } else if (char === '*') {
            currOperation = '*';
        } else if (char === '/') {
            currOperation = '/';
        } else if (char === '+') {
            currOperation = '+';
        }
    }

    return stack.reduce((acc, el) => acc + el, 0);
};
```

Baseball Game
```js
/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function(operations) {
    const stack = [];

    for (let char of operations) {
        
        if (char === "C") {
            stack.pop();
            continue;
        }

        if (char === 'D') {
            stack.push(stack[stack.length - 1] * 2);
            continue;
        }

        if (char === '+') {
            stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
            continue;
        }

        
        stack.push(Number(char));
    }

    return stack.reduce((acc, el) => el + acc, 0);
};

// initialize a stack
// iterate through operations with index
// if you see see C
// pop from the stack
// if you see D
// get last element and * 2 and push to stack
// if you see +
// get last element and and to second last element and push to stack

// reduce the elements in an array.
```

Validate Parenthesis
```js
var isValid = function(s) {
    const stack = [];
    const openToClose = {
        '(' : ')',
        '{' : '}',
        '[' : ']',
    }

    const open = new Set(['(', '{', '['])

    for (let char of s) {
        if (open.has(char)) {
            stack.push(char);
        } else {
            const currOpen = stack.pop();
            if (openToClose[currOpen] !== char) {
                return false;
            }
        }

    }

    if (stack.length > 0) { 
        return false;
    } else {
        return true;
    }
};
```
Reverse Polish Notation

```js

var evalRPN = function(tokens) {
    const stack = [];

    for (let operand of tokens) {
        if (!isNaN(operand)) {
            stack.push(Number(operand));
        } else {
            let second = stack.pop();
            let first = stack.pop();

            if (operand === "+") {
                stack.push(first + second);
            } else if (operand === "-") {
                stack.push(first - second);
            } else if (operand === "*") {
                stack.push(first * second);
            } else if (operand === "/") {
                stack.push(Math.trunc(first / second));
            }
        }
    }

    return stack[0];
};


// key here is you create a stack
// iterate through tokens
// if operand is a number, push it to the stack
// if operand is an operator, pop two elements form the stack, do the operator and push to stack
// return stack[0]

```