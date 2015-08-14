import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {AuthenticationService} from '../../services/AuthenticationService';
import {Task} from 'components/tasks/task';
import {TaskServiceWebsockets} from '../../services/TaskServiceWebsockets';
import {EventManager} from "utils/eventbus/EventManager";

import {formDirectives} from 'angular2/forms';

@Component({
    selector: 'component-2',
    viewInjector: [AuthenticationService, TaskServiceWebsockets]
})
@View({
    templateUrl: './components/tasks/tasks.html?v=<%= VERSION %>',
    directives: [NgFor, NgIf, formDirectives]
})
export class Tasks {
    tasks: Array<Task>;
	task: Task = new Task();
	nrOfTasks: number;
    private eventManager: EventManager = EventManager.getInstance();

    constructor(public authenticationService: AuthenticationService, public taskService: TaskServiceWebsockets) {
        console.log("tasks.ts constructor");

        if (this.authenticationService.isLoggedIn()) {
            this.taskService.sendMessage({messageType: "GET_TASKS_FOR_USER"}).then((obj) => {
	            console.log("tasks got: " + JSON.stringify(obj));
                this.tasks = obj;
                console.log("finished getting tasks: " + this.tasks.length);
	            this.nrOfTasks = this.tasks.length;
            }).catch((error) => {
	            this.eventManager.publish("tasksResult", [false, error.message]);
            });
        } else {
	        this.eventManager.publish("authenticationStateChange", [false, "You are not authenticated, please log in."]);
        }
    }

    saveTask(event: any): void {
        event.preventDefault(); // prevent native page refresh
	    console.log("controller saveTask");
        if (this.task && (this.task._id == null || this.task._id == undefined)) {
	        let newTask = this.task;
	        console.log("hier");
	        this.taskService.sendMessage(this.taskService.sendMessage({messageType: "ADD_TASK", task: newTask}).then((obj) => {
		        console.dir(obj);
		        newTask.setId(obj._id);
		        console.log("before push: " + this.tasks.length);
		        this.nrOfTasks = this.tasks.push(newTask);
		        this.eventManager.publish("tasksResult", [true, "Added task '" + newTask.getId() + "'"]);
		        this.task = new Task();
	        }).catch((error) => {
		        this.eventManager.publish("tasksResult", [false, error.message]);
	        }));
        } else {
	        this.taskService.sendMessage(this.taskService.sendMessage({messageType: "UPDATE_TASK", task: this.task}).then((obj) => {
		        this.eventManager.publish("tasksResult", [true, "Updated task '" + this.task._id + "'"]);
		        this.task = new Task();
	        }).catch((error) => {
		        this.eventManager.publish("tasksResult", [false, error.message]);
	        }));
        }
    }

	loadTask(event: any, task: Task): void {
		event.preventDefault(); // prevent native page refresh
		console.log("load task " + task._id);
		this.task = task;
	}

	clearTask(event: any): void {
		event.preventDefault(); // prevent native page refresh
		this.task = new Task();
	}

	deleteTask(event: any): void {
		event.preventDefault(); // prevent native page refresh
		console.log("tasks.ts delete " + this.task._id);
		this.taskService.sendMessage({messageType: "DELETE_TASK", task: this.task}).then((obj) => {
			this.eventManager.publish("tasksResult", [true, "Deleted task '" + this.task._id + "'"]);
			// findIndex does not work on Task[]
			// this.tasks.splice(this.tasks.findIndex(_task => _task._id == this.task._id));
			for (let i = 0, len = this.tasks.length; i < len; i++) {
				let _task = this.tasks[i];
				if (_task._id == this.task._id) {
					console.log("delete task with id " + this.task._id + ", " + i);
					this.tasks.splice(i);
				}
			}
			this.task = new Task();
		}).catch((error) => {
			this.eventManager.publish("tasksResult", [false, error.message]);
		});
	}
}
