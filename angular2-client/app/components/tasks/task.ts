
/**
* API declares a Task as:
* {"description":"Task description","_id":"1","username":"tim","title":"Report an issue"}
*/
export class Task {
    description: string = "default description";
    _id: number;
    username: string;
    title: string;

    constructor(title?: string, _id?: number, username?: string) {
        this.title = title;
        this._id = _id;
        this.username = username;
    }

    public setId(id: number) {
        this._id = id;
    }

    public getId(): number {
        return this._id;
    }

	public setUsername(username: string):void {
		this.username = username;
	}
}
