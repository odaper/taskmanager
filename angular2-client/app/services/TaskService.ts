import {$http} from "services/http";
import {REST_HOST} from "../config";
import {Task} from '../components/tasks/task';
import {AuthenticationService} from 'services/AuthenticationService';

export interface TaskService {
	getTasks(): Promise<any>;
	addTask(task:Task): Promise<any>;
	updateTask(task: Task): Promise<any>;
	deleteTask(task: Task): Promise<any>;
}

export class TaskServiceRestImpl implements TaskService {

	/**
	 * @returns a list of Task objects as a JavaScript Array
	 */
	public getTasks(): Promise<any> {
		return $http.get(REST_HOST + "/api/tasks/" + this.getUserData().username + "/", this.getUserData().token);
	}

	/**
	 * @param task is a Task object
	 * @returns server _id of newly created task
	 */
	public addTask(task: Task): Promise<any> {
		task.setUsername(this.getUserData().username);
		return $http.post(REST_HOST + "/api/tasks/" + this.getUserData().username + "/", task + "/", this.getUserData().token);
	}

	/**
	 * @param task is a Task object
	 * @returns server _id of updated task
	 */
	public updateTask(task: Task): Promise<any> {
		task.setUsername(this.getUserData().username);
		return $http.put(REST_HOST + "/api/tasks/" + this.getUserData().username + "/" + task._id + "/", task, this.getUserData().token);
	}

	/**
	 * @param task is a Task object
	 * @returns server _id of deleted task
	 */
	public deleteTask(task: Task): Promise<any> {
		return $http.delete(REST_HOST + "/api/tasks/" + this.getUserData().username + "/" + task._id + "/", task, this.getUserData().token);
	}

	private getUserData() {
		let token = localStorage.getItem("jwt");
		return { username: new AuthenticationService().getUsername(token), token: token };
	}
}

export class TaskServiceWebsocketsImpl implements TaskService {

	private connection: WebSocket = new WebSocket("ws://127.0.0.1:8081");

	getTasks(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.connection.onopen = <Event>() => {
				this.connection.send(JSON.stringify({type: "tasks"}));
			};
			this.connection.onmessage = <MessageEvent>(evt) => {
				console.log('onmessage got something: ' + JSON.stringify(evt));
				resolve(JSON.parse(evt.data));
			};
			this.connection.onerror = <ErrorEvent>(error) => {
				console.log("onerror: " + error);
				reject(error);
			};
		});
	}

	addTask(task:Task):Promise<any> {
		return undefined;
	}

	updateTask(task:Task):Promise<any> {
		return undefined;
	}

	deleteTask(task:Task):Promise<any> {
		return undefined;
	}

}

export class TaskServiceOfflineImpl implements TaskService {
	private goRun: Task = new Task("Go for a run", 1);
	private goShower: Task = new Task("Go have a shower", 2);
	private tasks: Array<Task> = new Array<Task>();

	constructor() {
		this.tasks.push(this.goRun);
		this.tasks.push(this.goShower);
	}

	//{_id: 1, user_id: 1, description: "description", title: "Go for a run", assignee: "Assignee"},
	//{_id: 2, user_id: 1, description: "description", title: "Shower", assignee: "Assignee"},

	public getTasks(): Promise<any> {
		let that = this;
		return new Promise(
			function(resolve, reject) {
				resolve({actionResult: that.tasks});
			}
		);
	}
	public addTask(task: Task): Promise<any> {
		let nextId = this.tasks.length++;
		task.setId(nextId);
		return new Promise(
			function(resolve, reject) {
				resolve({actionResult: {_id: nextId}});
			}
		);
	}
	public updateTask(task: Task): Promise<any> {
		// TODO implement
		return new Promise(
			function(resolve, reject) {
				resolve({actionResult: {_id: task._id}});
			}
		);
	}
	public deleteTask(task: Task): Promise<any> {
		// TODO implement
		return new Promise(
			function(resolve, reject) {
				resolve({actionResult: {_id: task._id}});
			}
		);
	}
}
