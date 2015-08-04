var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AuthenticationService_1 = require('../../services/AuthenticationService');
var task_1 = require('components/tasks/task');
var TaskService_1 = require('../../services/TaskService');
var EventManager_1 = require("utils/eventbus/EventManager");
var forms_1 = require('angular2/forms');
var Tasks = (function () {
    function Tasks(authenticationService, taskService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.taskService = taskService;
        this.task = new task_1.Task();
        this.eventManager = EventManager_1.EventManager.getInstance();
        console.log("tasks.ts constructor");
        if (this.authenticationService.isLoggedIn()) {
            this.taskService.getTasks().then(function (obj) {
                _this.tasks = obj.actionResult;
                console.log("finished getting tasks: " + _this.tasks.length);
                _this.nrOfTasks = _this.tasks.length;
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
        else {
            this.eventManager.publish("authenticationStateChange", [false, "You are not authenticated, please log in."]);
        }
    }
    Tasks.prototype.saveTask = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.task && (this.task._id == null || this.task._id == undefined)) {
            var newTask = this.task;
            this.taskService.addTask(newTask).then(function (obj) {
                console.dir(obj);
                newTask.setId(obj.actionResult._id);
                console.log("before push: " + _this.tasks.length);
                _this.nrOfTasks = _this.tasks.push(newTask);
                _this.eventManager.publish("tasksResult", [true, "Added task '" + newTask.getId() + "'"]);
                _this.task = new task_1.Task();
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
        else {
            this.taskService.updateTask(this.task).then(function (obj) {
                _this.eventManager.publish("tasksResult", [true, "Updated task '" + _this.task._id + "'"]);
                _this.task = new task_1.Task();
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
    };
    Tasks.prototype.loadTask = function (event, task) {
        event.preventDefault();
        console.log("load task " + task._id);
        this.task = task;
    };
    Tasks.prototype.clearTask = function (event) {
        event.preventDefault();
        this.task = new task_1.Task();
    };
    Tasks.prototype.deleteTask = function (event) {
        var _this = this;
        event.preventDefault();
        this.taskService.deleteTask(this.task).then(function (obj) {
            _this.eventManager.publish("tasksResult", [true, "Deleted task '" + _this.task._id + "'"]);
            for (var i = 0, len = _this.tasks.length; i < len; i++) {
                var _task = _this.tasks[i];
                if (_task._id == _this.task._id) {
                    console.log("delete task with id " + _this.task._id + ", " + i);
                    _this.tasks.splice(i);
                }
            }
            _this.task = new task_1.Task();
        }).catch(function (error) {
            _this.eventManager.publish("tasksResult", [false, error.message]);
        });
    };
    Tasks = __decorate([
        angular2_1.Component({
            selector: 'component-2',
            viewInjector: [AuthenticationService_1.AuthenticationService, TaskService_1.TaskServiceImpl]
        }),
        angular2_1.View({
            templateUrl: './components/tasks/tasks.html?v=0.7.0',
            directives: [angular2_1.NgFor, angular2_1.NgIf, forms_1.formDirectives]
        }), 
        __metadata('design:paramtypes', [AuthenticationService_1.AuthenticationService, TaskService_1.TaskServiceImpl])
    ], Tasks);
    return Tasks;
})();
exports.Tasks = Tasks;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFza3MvdGFza3MudHMiXSwibmFtZXMiOlsiVGFza3MiLCJUYXNrcy5jb25zdHJ1Y3RvciIsIlRhc2tzLnNhdmVUYXNrIiwiVGFza3MubG9hZFRhc2siLCJUYXNrcy5jbGVhclRhc2siLCJUYXNrcy5kZWxldGVUYXNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHlCQUEyQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRS9ELHNDQUFvQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzNFLHFCQUFtQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzNDLDRCQUE4Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzNELDZCQUEyQiw2QkFBNkIsQ0FBQyxDQUFBO0FBRXpELHNCQUE2QixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTlDO0lBY0lBLGVBQW1CQSxxQkFBNENBLEVBQVNBLFdBQTRCQTtRQWR4R0MsaUJBbUZDQTtRQXJFc0JBLDBCQUFxQkEsR0FBckJBLHFCQUFxQkEsQ0FBdUJBO1FBQVNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFpQkE7UUFKdkdBLFNBQUlBLEdBQVNBLElBQUlBLFdBQUlBLEVBQUVBLENBQUNBO1FBRWJBLGlCQUFZQSxHQUFpQkEsMkJBQVlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1FBRzVEQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxzQkFBc0JBLENBQUNBLENBQUNBO1FBRXBDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxHQUFHQTtnQkFDakNBLEtBQUlBLENBQUNBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBO2dCQUM5QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsMEJBQTBCQSxHQUFHQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDL0RBLEtBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBO1lBQ3BDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFDQSxLQUFLQTtnQkFDZEEsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbEVBLENBQUNBLENBQUNBLENBQUNBO1FBQ1BBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLDJCQUEyQkEsRUFBRUEsQ0FBQ0EsS0FBS0EsRUFBRUEsMkNBQTJDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM5R0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFREQsd0JBQVFBLEdBQVJBLFVBQVNBLEtBQVVBO1FBQW5CRSxpQkFzQkNBO1FBckJHQSxLQUFLQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEVBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3hCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxHQUFHQTtnQkFDMUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNqQkEsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDakRBLEtBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUMxQ0EsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsSUFBSUEsRUFBRUEsY0FBY0EsR0FBR0EsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pGQSxLQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxXQUFJQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsS0FBS0E7Z0JBQ2RBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2xFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxHQUFHQTtnQkFDL0NBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLElBQUlBLEVBQUVBLGdCQUFnQkEsR0FBR0EsS0FBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pGQSxLQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxXQUFJQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBQ0EsS0FBS0E7Z0JBQ2RBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1lBQ2xFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUVKRix3QkFBUUEsR0FBUkEsVUFBU0EsS0FBVUEsRUFBRUEsSUFBVUE7UUFDOUJHLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBQ3ZCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBRURILHlCQUFTQSxHQUFUQSxVQUFVQSxLQUFVQTtRQUNuQkksS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7UUFDdkJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLFdBQUlBLEVBQUVBLENBQUNBO0lBQ3hCQSxDQUFDQTtJQUVESiwwQkFBVUEsR0FBVkEsVUFBV0EsS0FBVUE7UUFBckJLLGlCQWlCQ0E7UUFoQkFBLEtBQUtBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1FBQ3ZCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxHQUFHQTtZQUMvQ0EsS0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsSUFBSUEsRUFBRUEsZ0JBQWdCQSxHQUFHQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUd6RkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3ZEQSxJQUFJQSxLQUFLQSxHQUFHQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLElBQUlBLEtBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUNoQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esc0JBQXNCQSxHQUFHQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0RBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFDREEsS0FBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsV0FBSUEsRUFBRUEsQ0FBQ0E7UUFDeEJBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFVBQUNBLEtBQUtBO1lBQ2RBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1FBQ2xFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNKQSxDQUFDQTtJQWxGRkw7UUFBQ0Esb0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLGFBQWFBO1lBQ3ZCQSxZQUFZQSxFQUFFQSxDQUFDQSw2Q0FBcUJBLEVBQUVBLDZCQUFlQSxDQUFDQTtTQUN6REEsQ0FBQ0E7UUFDREEsZUFBSUEsQ0FBQ0E7WUFDRkEsV0FBV0EsRUFBRUEsZ0RBQWdEQTtZQUM3REEsVUFBVUEsRUFBRUEsQ0FBQ0EsZ0JBQUtBLEVBQUVBLGVBQUlBLEVBQUVBLHNCQUFjQSxDQUFDQTtTQUM1Q0EsQ0FBQ0E7O2NBNEVEQTtJQUFEQSxZQUFDQTtBQUFEQSxDQW5GQSxBQW1GQ0EsSUFBQTtBQTNFWSxhQUFLLFFBMkVqQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdGFza3MvdGFza3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlldywgTmdGb3IsIE5nSWZ9IGZyb20gJ2FuZ3VsYXIyL2FuZ3VsYXIyJztcblxuaW1wb3J0IHtBdXRoZW50aWNhdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL0F1dGhlbnRpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge1Rhc2t9IGZyb20gJ2NvbXBvbmVudHMvdGFza3MvdGFzayc7XG5pbXBvcnQge1Rhc2tTZXJ2aWNlSW1wbH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVGFza1NlcnZpY2UnO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gXCJ1dGlscy9ldmVudGJ1cy9FdmVudE1hbmFnZXJcIjtcblxuaW1wb3J0IHtmb3JtRGlyZWN0aXZlc30gZnJvbSAnYW5ndWxhcjIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvbXBvbmVudC0yJyxcbiAgICB2aWV3SW5qZWN0b3I6IFtBdXRoZW50aWNhdGlvblNlcnZpY2UsIFRhc2tTZXJ2aWNlSW1wbF1cbn0pXG5AVmlldyh7XG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudHMvdGFza3MvdGFza3MuaHRtbD92PTwlPSBWRVJTSU9OICU+JyxcbiAgICBkaXJlY3RpdmVzOiBbTmdGb3IsIE5nSWYsIGZvcm1EaXJlY3RpdmVzXVxufSlcbmV4cG9ydCBjbGFzcyBUYXNrcyB7XG4gICAgdGFza3M6IEFycmF5PFRhc2s+O1xuXHR0YXNrOiBUYXNrID0gbmV3IFRhc2soKTtcblx0bnJPZlRhc2tzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciA9IEV2ZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLCBwdWJsaWMgdGFza1NlcnZpY2U6IFRhc2tTZXJ2aWNlSW1wbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRhc2tzLnRzIGNvbnN0cnVjdG9yXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5pc0xvZ2dlZEluKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuZ2V0VGFza3MoKS50aGVuKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzID0gb2JqLmFjdGlvblJlc3VsdDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaGVkIGdldHRpbmcgdGFza3M6IFwiICsgdGhpcy50YXNrcy5sZW5ndGgpO1xuXHQgICAgICAgICAgICB0aGlzLm5yT2ZUYXNrcyA9IHRoaXMudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdCAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnB1Ymxpc2goXCJ0YXNrc1Jlc3VsdFwiLCBbZmFsc2UsIGVycm9yLm1lc3NhZ2VdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnB1Ymxpc2goXCJhdXRoZW50aWNhdGlvblN0YXRlQ2hhbmdlXCIsIFtmYWxzZSwgXCJZb3UgYXJlIG5vdCBhdXRoZW50aWNhdGVkLCBwbGVhc2UgbG9nIGluLlwiXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlVGFzayhldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgbmF0aXZlIHBhZ2UgcmVmcmVzaFxuICAgICAgICBpZiAodGhpcy50YXNrICYmICh0aGlzLnRhc2suX2lkID09IG51bGwgfHwgdGhpcy50YXNrLl9pZCA9PSB1bmRlZmluZWQpKSB7XG5cdCAgICAgICAgbGV0IG5ld1Rhc2sgPSB0aGlzLnRhc2s7XG5cdCAgICAgICAgdGhpcy50YXNrU2VydmljZS5hZGRUYXNrKG5ld1Rhc2spLnRoZW4oKG9iaikgPT4ge1xuXHRcdCAgICAgICAgY29uc29sZS5kaXIob2JqKTtcblx0XHQgICAgICAgIG5ld1Rhc2suc2V0SWQob2JqLmFjdGlvblJlc3VsdC5faWQpO1xuXHRcdCAgICAgICAgY29uc29sZS5sb2coXCJiZWZvcmUgcHVzaDogXCIgKyB0aGlzLnRhc2tzLmxlbmd0aCk7XG5cdFx0ICAgICAgICB0aGlzLm5yT2ZUYXNrcyA9IHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcblx0XHQgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnB1Ymxpc2goXCJ0YXNrc1Jlc3VsdFwiLCBbdHJ1ZSwgXCJBZGRlZCB0YXNrICdcIiArIG5ld1Rhc2suZ2V0SWQoKSArIFwiJ1wiXSk7XG5cdFx0ICAgICAgICB0aGlzLnRhc2sgPSBuZXcgVGFzaygpO1xuXHQgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdCAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIucHVibGlzaChcInRhc2tzUmVzdWx0XCIsIFtmYWxzZSwgZXJyb3IubWVzc2FnZV0pO1xuXHQgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMudGFza1NlcnZpY2UudXBkYXRlVGFzayh0aGlzLnRhc2spLnRoZW4oKG9iaikgPT4ge1xuXHRcdCAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIucHVibGlzaChcInRhc2tzUmVzdWx0XCIsIFt0cnVlLCBcIlVwZGF0ZWQgdGFzayAnXCIgKyB0aGlzLnRhc2suX2lkICsgXCInXCJdKTtcblx0XHQgICAgICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XG5cdCAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0ICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci5wdWJsaXNoKFwidGFza3NSZXN1bHRcIiwgW2ZhbHNlLCBlcnJvci5tZXNzYWdlXSk7XG5cdCAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0bG9hZFRhc2soZXZlbnQ6IGFueSwgdGFzazogVGFzayk6IHZvaWQge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgbmF0aXZlIHBhZ2UgcmVmcmVzaFxuXHRcdGNvbnNvbGUubG9nKFwibG9hZCB0YXNrIFwiICsgdGFzay5faWQpO1xuXHRcdHRoaXMudGFzayA9IHRhc2s7XG5cdH1cblxuXHRjbGVhclRhc2soZXZlbnQ6IGFueSk6IHZvaWQge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgbmF0aXZlIHBhZ2UgcmVmcmVzaFxuXHRcdHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XG5cdH1cblxuXHRkZWxldGVUYXNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IG5hdGl2ZSBwYWdlIHJlZnJlc2hcblx0XHR0aGlzLnRhc2tTZXJ2aWNlLmRlbGV0ZVRhc2sodGhpcy50YXNrKS50aGVuKChvYmopID0+IHtcblx0XHRcdHRoaXMuZXZlbnRNYW5hZ2VyLnB1Ymxpc2goXCJ0YXNrc1Jlc3VsdFwiLCBbdHJ1ZSwgXCJEZWxldGVkIHRhc2sgJ1wiICsgdGhpcy50YXNrLl9pZCArIFwiJ1wiXSk7XG5cdFx0XHQvLyBmaW5kSW5kZXggZG9lcyBub3Qgd29yayBvbiBUYXNrW11cblx0XHRcdC8vIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuZmluZEluZGV4KF90YXNrID0+IF90YXNrLl9pZCA9PSB0aGlzLnRhc2suX2lkKSk7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy50YXNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRsZXQgX3Rhc2sgPSB0aGlzLnRhc2tzW2ldO1xuXHRcdFx0XHRpZiAoX3Rhc2suX2lkID09IHRoaXMudGFzay5faWQpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZSB0YXNrIHdpdGggaWQgXCIgKyB0aGlzLnRhc2suX2lkICsgXCIsIFwiICsgaSk7XG5cdFx0XHRcdFx0dGhpcy50YXNrcy5zcGxpY2UoaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XG5cdFx0fSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHR0aGlzLmV2ZW50TWFuYWdlci5wdWJsaXNoKFwidGFza3NSZXN1bHRcIiwgW2ZhbHNlLCBlcnJvci5tZXNzYWdlXSk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==