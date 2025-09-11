---
title: "DDIA Hello Interview System Design - Day 23"
date: "2025-08-24"
description: "System Design Readings - Dropbox"
---
Designing Dropbox

Func

Users should be able to upload a file from any device (Ourtracks needs to be able to do that too)

Users should be able to download a file from any device (Users want to be able to download their things they put onto Our Tracks App.

Users should be able to share a file with other users and view the files shared with them

Users can automatically sync files across devices

How does Blog Storage work and how is it designed?

Design patterns - separation of metadata and data, blob data in large distributed file systems
Flat namespace under the hood - Flat namespace under the hood
Object storage principles  - immutable writes ( you replace entire blobs rather than update chunks)

Non-Func

Availability > consistency
Support large file (<= 50 GB)
Secure & Reliable
Low Latency

Core Entities

File
FileMetadata
User

API or System Interface

POST /files - upload a file

File
FileMetadata

GET /files/{fileId} -> File & FileMetadata
	
	GET /files/{fileId} -> File & FileMetadata
POST /files/{fileId}/share  - sharing files with users
	Request:
	{ 	
		User[] // The users to share the file with
	}

GET /files/{fileId}/changes -> FileMetaData[]



High Level Design

Users should be able to upload a file from any device
Where do we store the file contents (the raw bytes)?
Where do we store the file metadata?

You can choose NoSQL database like DynamoDB to store the metadata.

{
	“Id”: “123”,
	“Name”: “file.txt”,
	“Size”: 1000,
	mimeType: “text/plain”,
	“uploadedBy”: “user1”
}

We can use a presigned url and upload the file directly to the Blob Storage to store the files and use a database to store the metadata.

Users should be allowed to download  a file from any device

For downloading, we can do the same approach, download the file using presigned urls from the blob storage to get the files. To optimize this, we can cache popular files in the CDN for quicker access.

Users should be able to share a file with other users

Users can automatically sync files across devices
Local -> Remote
Remote -> Local

Last write wins strategy - a way to resolve conflicts, if two users edit the same file, the most recent edit will be the one that’s saved.

I'm not familiar with how dropbox works, why would a user make local changes, wouldn't it just sync to the remote if he has internet. Can users use dropbox when they are not connected to the internet
Yea - you can work offline because of the local watcher + index lets Dropbox caputre changes without the cloud being available


Potential Deep Dives

How do you support large files?

	So the question is for me, if I wanted to upload a 50 GB file with my internet speed 100mbps, how long would that take.

	50GB * 8 Bits/bute / 100Mbps = 4000 seconds = 1.11 hours

	Limitations - 
	Network interruptions large files are more susceptible to network interruptions
	User has no idea if there upload is working
The browser and server seem to be only able to send 2 GB at most.
The browser and server have timeouts for long requests

We can use a technique called chunking. Chunking needs to be done on the client so that the file can be broken into pieces before it is sent to the server.

Fingerprints - rely on a unique identifier that is derived from the files content	

