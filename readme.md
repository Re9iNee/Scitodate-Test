# Scitodate entry test porject
This project developed for scitodate Co.

# Installation
head over to root folder. then type

`npm install`


change directory to **client** folder.

`cd client/`

then: 
`npm install`

head back to root folder `cd ..`

rename **sample.env** to **.env** file.

open .env file and edit these fields to anything you want:

**NOTE**: If you want to use custom port rather than 5000 - You should change proxy setting in client/package.json too.

`
SERVER_PORT = 5000
`
`
MONGODB_URI = MONGO_CLUSTER_URI
`

finally in root folder, run:

`node server.js`
