---
title: "DDIA Hello Interview System Design - Day 21"
date: "2025-08-21"
description: "System Design Readings"
---

Delivery Framework
1. Requirements
2. Core Entities
3. API or Interface
4. Data Flow
5. High-level Design
6. Deep Dives


Remote Procedure Call (RPC) - which is used for internal services communicating each other and they need fast performance.

I think gRPC would've been the preferred approach for token lookup service.

Fan-out-on-write -> Writes heavy but read friendly
Fan-out-on-read -> Reads heavy bu writes heavy

Consistent hashing is used for distributing load

When you're designing data flow, look for ways that you don't need a node talking to another node

A CDN is a type of cache that uses distributed servers to deliver content to users based on geographic location.

CDNs are used to deliver assets but also API responses, more for frequently requested data, and the data doesn't change often.

CDN offers DDoS protection and web application firewalls

Cap Theorem
Consistency, Availability and Partition

Stong Consistency Systems - 
 - Inventory management systems, - stock levels need to be precisely tracked to avoid overselling products.
 - Booking systems - prevents double booking
 - Banking systems - accounts need to be consistent

Locks are great for consistency and correctness but are terrible for performance

Optimistic concurrency control - assumes most times we won't have multiple people try to lock at the same time.

ElasticSearch is a good one to add to OurTracks for searching.

Inverted indexes - are data structures that maps from word to the documents that contain them.

### Communication protocols

You have 2 things to consider for protocols: internal and external.

For internal go with HTTP or gRPC.

### Monitoring

Infra monitoring - monitoring CPU usage, memory usage, disk usage, and network usage.

Service level monitoring - monitoring performance of your service. Thinkgs like request latency, error rates and throughput.

App Level monitoring - health and perf of your app, number of users, number of active session and number of connections


Going to start working on building RESTful endpoints starting with one

This will help with creating api interfaces for system design interview

```