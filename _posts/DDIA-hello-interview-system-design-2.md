---
title: "DDIA Hello Interview System Design - Day 22"
date: "2025-08-23"
description: "System Design Readings"
---

Whenever you hit a question of read traffic scale:
The default solution is:

1. index your database and denormalize your data
2. horizontally scale your database with read replicas
3. Add caching to not hit the database so much

Whhenver you hit a question about right traffic scale:
The default solution is:

1. Horizontally shard the data accross multiple servers( ie, A-K on this server and J-Z on another), one server isn't just handling everything
2. Vertical Partitioning which creating more tables and dividing the data across tables so one table isn't overloaded with requests.
3. Queue to help with burst of writes and load shedding to just ignore things to help with not being overwhelmed.

Geospatial can be used for geolocation, we can add geo-location specific notifications for completing Action Items or Blocks.

Also worked on designing Bit.ly

```
Design Bit.ly

Func Requirements
Users can create short urls from original urls
Users can access the original url by visiting the short url

Non-Func Requirements
Ensure uniqueness of short urls
Low latency redirection
Availability >> consistency
Scalable to 1 billion urls and 100 million daily active users

Core Entities

Original URL
Short URL
User

The API

POST /urls
Long url
Custom_alias
expiration_date

Returns a {short_url: xxx}

   Redirect to Original URL
GET /{short_code}

High Level Design

Users should be able to submit a long URL and receive a shortened version

Client -> Server -> Database {

How do we add the same url if we already have it on our system?
We can check if we already have this URl saved in our DB. If we do we can just return the shortender code save to it. If we don’t we can save it our URL tables with the a new generated short url code.

How do we ensure that the URL is valid?

We can use a popular Open Source librariy like “is-url”

Users should be able to access the original URL by using the shortened URL


2 main HTTP redirects we could use:
301 (Permanent Redirect): Meaning subsequent requests for the same short URL might go directly to the long URL, by passing our server
```
HTTP/1.1 301 Moved Permanently
Location: https://www.original-long-url.com
```
302 (Temporary Redirect): suggests that the resource is temporarily located at a different URL. Browsers don’t cache this response and future requests will definitely hit our servers.
```
HTTP/1.1 302 Found
Location: https://www.original-long-url.com
```

So why is 302 preferred for a URL shortener?

It gives us more control, allowing us to update or expire links as needed
Let’s say the user wants this shortener to go to a different link. Well, I think if we used 301, we would have to invalidate the browser cache which is something the user would have to do
It also uses memory of the browser which that could take a good chunk of space.
If we needed to change a url, if its stuck in the users browser cache, we’d have no access to do so. This could lead to potential hardships when trying to fix bugs.
If it bypasses our server, we won’t be able to track the click statistic and it would screw up our analytics.


Deep Dives


How can we ensure URLs are unique?

	We’d generate a small hex and make sure it’s not already save in our database. If it is, we can generate a new one and check again. This is the random generator approach

	There’s also the hash approach where we hash the url to become a code.

	Lastly we encode it, and take the first N characters. N should be short but should be long enough to minimize most collisions. Maybe 8 chars.

	But we still have a good chance for collisions. For instance the birthday paradox is the counterintuitive fact that only 23 people are needed for that probability of collision to exceed 50%.

	The better approach is to use a counter for each unique new url and we just encode the counter. This means we’ll never have any collisions.


How can we ensure that redirects are fast?

The slow latency part is that we have to grab the long url in our DB from the short code. One thing we could do for popular urls is put in a cache. The key here instead of going to disk we access the mapping directly from memory.

This is important because its 10x faster going from memory rather than from disk.


The process of looking at all rows in the table is called a “Full Table Scan”

Cache takes time to warm up, initial requests might still hit the Database.
If we add to the CDN, the clients request never reaches our servers so it reduces the latency there.

Challenger here is you lose some control, like cache invalidation and consistency across all CDN nodes can be complex.

How can we scale to support 1B shortened urls and 100M DAU?

What if our Database server goes down - 

Database Replication 

Database Backup

We can separate read and write into different servers.

Counter Batching
Each Write Service instance requests a batch of counter values from the Redis instance
The Redis instance atomically increments the counter by 1000 and returns the start of the batch
The write service can use these 1000 values locally without needing to contact Redis for each new URL.
Batch is exhausted, the Writer Service requests a new batch.

```