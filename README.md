Taskmanager Node.js and Angular2
==================================

Basic TODO application,  microservices with node.js, websockets and angular2

ISSUES
======
 - Websockets
  - Better message protocol
  - Server side messagerouting via frontcontroller
  - Use Mongo from frontcontroller/serviceobject
 - Put Users in database
 - Introduce roles
 - Use typescript on servers 
 - Upgrade to Latest Angular alpha (recurring task)
 - Perhaps introduce CQRS 
 
MONGODB
=======
 - mongo
 - use taskmanager
 - db.tasks.count()
 - db.tasks.save({"description":"Task description","_id":"1","username":"tim","title":"Report an issue"});
 - db.tasks.find().forEach(printjson);
