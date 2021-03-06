var Task = (function () {
    function Task(title, _id, username) {
        this.description = "default description";
        this.title = title;
        this._id = _id;
        this.username = username;
    }
    Task.prototype.setId = function (id) {
        this._id = id;
    };
    Task.prototype.getId = function () {
        return this._id;
    };
    Task.prototype.setUsername = function (username) {
        this.username = username;
    };
    Task.prototype.isValid = function () {
        var valid = (this.title !== undefined && this.title != "");
        console.log("Task.isValid, title [" + this.title + "] isValid? " + valid);
        return valid;
    };
    return Task;
})();
exports.Task = Task;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFza3MvdGFzay50cyJdLCJuYW1lcyI6WyJUYXNrIiwiVGFzay5jb25zdHJ1Y3RvciIsIlRhc2suc2V0SWQiLCJUYXNrLmdldElkIiwiVGFzay5zZXRVc2VybmFtZSIsIlRhc2suaXNWYWxpZCJdLCJtYXBwaW5ncyI6IkFBS0E7SUFNSUEsY0FBWUEsS0FBY0EsRUFBRUEsR0FBWUEsRUFBRUEsUUFBaUJBO1FBTDNEQyxnQkFBV0EsR0FBV0EscUJBQXFCQSxDQUFDQTtRQU14Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDbkJBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzdCQSxDQUFDQTtJQUVNRCxvQkFBS0EsR0FBWkEsVUFBYUEsRUFBVUE7UUFDbkJFLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUVNRixvQkFBS0EsR0FBWkE7UUFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDcEJBLENBQUNBO0lBRUdILDBCQUFXQSxHQUFsQkEsVUFBbUJBLFFBQWdCQTtRQUNsQ0ksSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBRVNKLHNCQUFPQSxHQUFkQTtRQUNDSyxJQUFJQSxLQUFLQSxHQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxLQUFLQSxTQUFTQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNwRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsdUJBQXVCQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxhQUFhQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUN2RUEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDakJBLENBQUNBO0lBQ0xMLFdBQUNBO0FBQURBLENBN0JBLEFBNkJDQSxJQUFBO0FBN0JZLFlBQUksT0E2QmhCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy90YXNrcy90YXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiogQVBJIGRlY2xhcmVzIGEgVGFzayBhczpcbioge1wiZGVzY3JpcHRpb25cIjpcIlRhc2sgZGVzY3JpcHRpb25cIixcIl9pZFwiOlwiMVwiLFwidXNlcm5hbWVcIjpcInRpbVwiLFwidGl0bGVcIjpcIlJlcG9ydCBhbiBpc3N1ZVwifVxuKi9cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJkZWZhdWx0IGRlc2NyaXB0aW9uXCI7XG4gICAgX2lkOiBudW1iZXI7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGl0bGU/OiBzdHJpbmcsIF9pZD86IG51bWJlciwgdXNlcm5hbWU/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLl9pZCA9IF9pZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJZChpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cblx0cHVibGljIHNldFVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpOnZvaWQge1xuXHRcdHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcblx0fVxuXG4gICAgcHVibGljIGlzVmFsaWQoKTogYm9vbGVhbiB7XG5cdCAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSAodGhpcy50aXRsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudGl0bGUgIT0gXCJcIik7XG5cdCAgICBjb25zb2xlLmxvZyhcIlRhc2suaXNWYWxpZCwgdGl0bGUgW1wiICsgdGhpcy50aXRsZSArIFwiXSBpc1ZhbGlkPyBcIiArIHZhbGlkKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==