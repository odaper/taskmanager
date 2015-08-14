export class TaskServiceWebsockets {

	private connection: WebSocket = new WebSocket("ws://127.0.0.1:8081");

	constructor() {
	}

	// TODO use proper Typed Object for 'message'
	sendMessage(message:Object): Promise<any> {
		console.log("TaskServiceWebsockets.sendMessage(obj);");
		return new Promise((resolve, reject) => {
			console.log("TaskServiceWebsockets.sendMessage starting a new promise ...");
			if (this.connection.readyState === 1) {
				console.log("using previously opened connection");
				console.log("TaskServiceWebsockets.sending: " + JSON.stringify(message));
				this.connection.send(JSON.stringify(message));
			}
			if (this.connection.readyState === 0) {
				this.connection.onopen = <Event>() => {
					console.log("opening connection");
					console.log("TaskServiceWebsockets.sending: " + JSON.stringify(message));
					this.connection.send(JSON.stringify(message));
				};
			}
			//} else {
			//	console.log("TaskServiceWebsockets.readyState: " + this.connection.readyState);
			//}
			this.connection.onmessage = <MessageEvent>(evt) => {
				console.log('onmessage got something: ' + evt);
				console.log("evt.data: " + evt.data);
				//this.connection.close();
				resolve(JSON.parse(evt.data).tasks);
			};
			this.connection.onerror = <ErrorEvent>(error) => {
				console.log("onerror: " + error);
				reject(error);
			};
			this.connection.onclose = <ErrorEvent>(error) => {
				console.log("onclose");
			};
			console.log("TaskServiceWebsockets.sendMessage ending promise.");
		});
	}

	//addTask(task:Task):Promise<any> {
	//	return new Promise((resolve, reject) => {
	//		this.connection.send(JSON.stringify({messageType: "ADD_TASK", task: task}));
	//		// TODO a
	//		resolve({"ok"});
	//	});
	//}
	//
	//updateTask(task:Task):Promise<any> {
	//	return undefined;
	//}
	//
	//deleteTask(task:Task):Promise<any> {
	//	return undefined;
	//}

};