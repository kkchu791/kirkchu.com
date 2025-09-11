---
title: "Entire Flow of a JS Source Program"
date: "2025-07-30"
description: "Transpile with Babel, Webpacker, deliver to JS engine int AST and then Byte Code, JS VM translate bytecode to machine code."
---

Entire Flow of a JS Source Program:

1. Transpiled by Babel (JS compiler), it takes cutting edge JS and makes it into compatible JS.
2. Gets packed by webpack (module bundler) - takes all your JS files and assets and packages it into bundles that the browser can run.
3. Gets delivered to a JS engine in its new form.
4. JS engine turns that code to an AST (Abstract Syntax Tree)
5. And then from an AST, the engine concerts it into kind of kind of byte code (a binary intermediate representation) Why Byte code? Because it’s much smaller, execution ready. Optimized by JIT Compiler  (Just in time because compilation happens the exact moment its needed instead of ahead of time)
6. The JS Virtual Machine (a component within the JS engine) executes the program. JS VM translates bytecode to machine code.
