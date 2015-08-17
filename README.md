Taskmanager Node.js and Angular2
==================================

Basic TODO application, microservices with mongodb, express, angular2 and node.js

ISSUES
======
 - tasks.ts: use ng-form-model with validators, 
       see: https://angular.io/docs/js/latest/api/forms/NgFormModel-class.html and https://angular.io/docs/js/latest/api/forms/Validators-class.html         
 - Remove 'actionResult'
 - Introduce roles
 - server.js as .ts 
 - Upgrade to Latest Angular2 alpha (recurring task)
 - Perhaps introduce CQRS 
 
MONGODB
=======
 - mongo
 - use taskmanager
 - db.tasks.count()
 - db.tasks.save({"description":"Task description","_id":"1","username":"tim","title":"Report an issue"});
 - db.tasks.find().forEach(printjson);
