/// <reference path="../tsd_typings/tsd.d.ts" />
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
var router_1 = require('angular2/router');
var home_1 = require('./components/home/home');
var tasks_1 = require('./components/tasks/tasks');
var login_1 = require('./components/login/login');
var settings_1 = require('./components/settings/settings');
var notifications_1 = require('./components/notifications/notifications');
var AuthenticationService_1 = require('services/AuthenticationService');
var LoggingService_1 = require('services/LoggingService');
var EventManager_1 = require("utils/eventbus/EventManager");
var App = (function () {
    function App(authenticationService, router, loggingService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.router = router;
        this.loggingService = loggingService;
        this.eventManager = EventManager_1.EventManager.getInstance();
        this.loggedIn = authenticationService.isLoggedIn();
        this.eventManager.subscribe("authenticationStateChange", function (event) {
            _this.loggedIn = event[0];
            console.log("App caught event, loggedIn: " + event[0]);
            loggingService.log(event);
        });
        this.eventManager.subscribe("tasksResult", function (event) {
            loggingService.log(event);
        });
        console.log("app.ts finished constructor");
    }
    App.prototype.logout = function (event) {
        event.preventDefault();
        this.authenticationService.logOut();
        this.loggedIn = false;
        this.eventManager.publish("authenticationStateChange", [false, "You logged out"]);
        this.router.navigate("/home");
    };
    App = __decorate([
        angular2_1.Component({
            selector: 'app',
            viewInjector: [AuthenticationService_1.AuthenticationService, LoggingService_1.LoggingService]
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.Home, as: 'home' },
            { path: '/home', component: home_1.Home, as: 'home' },
            { path: '/tasks', component: tasks_1.Tasks, as: 'tasks' },
            { path: '/login', component: login_1.Login, as: 'login' },
            { path: '/settings', component: settings_1.Settings, as: 'settings' }
        ]),
        angular2_1.View({
            templateUrl: './app.html?v=0.8.1',
            directives: [router_1.RouterOutlet, router_1.RouterLink, notifications_1.Notifications]
        }), 
        __metadata('design:paramtypes', [AuthenticationService_1.AuthenticationService, router_1.Router, LoggingService_1.LoggingService])
    ], App);
    return App;
})();
angular2_1.bootstrap(App, [router_1.routerInjectables, AuthenticationService_1.AuthenticationService]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAubG9nb3V0Il0sIm1hcHBpbmdzIjoiQUFBQSxnREFBZ0Q7Ozs7Ozs7Ozs7OztBQUVoRCx5QkFBZ0QsbUJBQW1CLENBQUMsQ0FBQTtBQUNwRSx1QkFBK0UsaUJBQWlCLENBQUMsQ0FBQTtBQUVqRyxxQkFBbUIsd0JBQXdCLENBQUMsQ0FBQTtBQUM1QyxzQkFBb0IsMEJBQTBCLENBQUMsQ0FBQTtBQUMvQyxzQkFBb0IsMEJBQTBCLENBQUMsQ0FBQTtBQUMvQyx5QkFBdUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUN4RCw4QkFBNEIsMENBQTBDLENBQUMsQ0FBQTtBQUV2RSxzQ0FBb0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNyRSwrQkFBNkIseUJBQXlCLENBQUMsQ0FBQTtBQUN2RCw2QkFBMkIsNkJBQTZCLENBQUMsQ0FBQTtBQUV6RDtJQW1CSUEsYUFBbUJBLHFCQUE0Q0EsRUFBU0EsTUFBY0EsRUFBU0EsY0FBOEJBO1FBbkJqSUMsaUJBMENDQTtRQXZCc0JBLDBCQUFxQkEsR0FBckJBLHFCQUFxQkEsQ0FBdUJBO1FBQVNBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1FBQVNBLG1CQUFjQSxHQUFkQSxjQUFjQSxDQUFnQkE7UUFGeEhBLGlCQUFZQSxHQUFpQkEsMkJBQVlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1FBR3pEQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxxQkFBcUJBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1FBRXREQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSwyQkFBMkJBLEVBQUVBLFVBQUNBLEtBQWlCQTtZQUNwRUEsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLDhCQUE4QkEsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLGNBQWNBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ3hCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVIQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxTQUFTQSxDQUFDQSxhQUFhQSxFQUFFQSxVQUFDQSxLQUFpQkE7WUFDNURBLGNBQWNBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVIQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSw2QkFBNkJBLENBQUNBLENBQUNBO0lBQy9DQSxDQUFDQTtJQUVERCxvQkFBTUEsR0FBTkEsVUFBT0EsS0FBS0E7UUFDUkUsS0FBS0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7UUFDdkJBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFDcENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSwyQkFBMkJBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbEZBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ2xDQSxDQUFDQTtJQXpDTEY7UUFBQ0Esb0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLEtBQUtBO1lBQ2ZBLFlBQVlBLEVBQUVBLENBQUNBLDZDQUFxQkEsRUFBRUEsK0JBQWNBLENBQUNBO1NBQ3hEQSxDQUFDQTtRQUNEQSxvQkFBV0EsQ0FBQ0E7WUFDVEEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsU0FBU0EsRUFBRUEsV0FBSUEsRUFBRUEsRUFBRUEsRUFBRUEsTUFBTUEsRUFBRUE7WUFDMUNBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLFNBQVNBLEVBQUVBLFdBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBO1lBQzlDQSxFQUFFQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxTQUFTQSxFQUFFQSxhQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFFQTtZQUNqREEsRUFBRUEsSUFBSUEsRUFBRUEsUUFBUUEsRUFBRUEsU0FBU0EsRUFBRUEsYUFBS0EsRUFBRUEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUE7WUFDakRBLEVBQUVBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLG1CQUFRQSxFQUFFQSxFQUFFQSxFQUFFQSxVQUFVQSxFQUFFQTtTQUM3REEsQ0FBQ0E7UUFDREEsZUFBSUEsQ0FBQ0E7WUFDSkEsV0FBV0EsRUFBRUEsNkJBQTZCQTtZQUMxQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EscUJBQVlBLEVBQUVBLG1CQUFVQSxFQUFFQSw2QkFBYUEsQ0FBQ0E7U0FDdERBLENBQUNBOztZQTRCREE7SUFBREEsVUFBQ0E7QUFBREEsQ0ExQ0EsQUEwQ0NBLElBQUE7QUFFRCxvQkFBUyxDQUFDLEdBQUcsRUFBQyxDQUFDLDBCQUFpQixFQUFFLDZDQUFxQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHNkX3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQge0NvbXBvbmVudCwgVmlldywgYm9vdHN0cmFwLCBOZ0Zvcn0gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZywgUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rLCBSb3V0ZXIsIHJvdXRlckluamVjdGFibGVzfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuXG5pbXBvcnQge0hvbWV9IGZyb20gJy4vY29tcG9uZW50cy9ob21lL2hvbWUnO1xuaW1wb3J0IHtUYXNrc30gZnJvbSAnLi9jb21wb25lbnRzL3Rhc2tzL3Rhc2tzJztcbmltcG9ydCB7TG9naW59IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbic7XG5pbXBvcnQge1NldHRpbmdzfSBmcm9tICcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zfSBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zJztcblxuaW1wb3J0IHtBdXRoZW50aWNhdGlvblNlcnZpY2V9IGZyb20gJ3NlcnZpY2VzL0F1dGhlbnRpY2F0aW9uU2VydmljZSc7XG5pbXBvcnQge0xvZ2dpbmdTZXJ2aWNlfSBmcm9tICdzZXJ2aWNlcy9Mb2dnaW5nU2VydmljZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcInV0aWxzL2V2ZW50YnVzL0V2ZW50TWFuYWdlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcCcsXG4gICAgdmlld0luamVjdG9yOiBbQXV0aGVudGljYXRpb25TZXJ2aWNlLCBMb2dnaW5nU2VydmljZV1cbn0pXG5AUm91dGVDb25maWcoW1xuICAgIHsgcGF0aDogJy8nLCBjb21wb25lbnQ6IEhvbWUsIGFzOiAnaG9tZScgfSxcbiAgICB7IHBhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZSwgYXM6ICdob21lJyB9LFxuICAgIHsgcGF0aDogJy90YXNrcycsIGNvbXBvbmVudDogVGFza3MsIGFzOiAndGFza3MnIH0sXG4gICAgeyBwYXRoOiAnL2xvZ2luJywgY29tcG9uZW50OiBMb2dpbiwgYXM6ICdsb2dpbicgfSxcbiAgICB7IHBhdGg6ICcvc2V0dGluZ3MnLCBjb21wb25lbnQ6IFNldHRpbmdzLCBhczogJ3NldHRpbmdzJyB9XG5dKVxuQFZpZXcoe1xuICB0ZW1wbGF0ZVVybDogJy4vYXBwLmh0bWw/dj08JT0gVkVSU0lPTiAlPicsXG4gIGRpcmVjdGl2ZXM6IFtSb3V0ZXJPdXRsZXQsIFJvdXRlckxpbmssIE5vdGlmaWNhdGlvbnNdXG59KVxuY2xhc3MgQXBwIHtcbiAgICBwdWJsaWMgbG9nZ2VkSW46IGJvb2xlYW47XG5cdHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIgPSBFdmVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VkSW4gPSBhdXRoZW50aWNhdGlvblNlcnZpY2UuaXNMb2dnZWRJbigpO1xuXG5cdCAgICB0aGlzLmV2ZW50TWFuYWdlci5zdWJzY3JpYmUoXCJhdXRoZW50aWNhdGlvblN0YXRlQ2hhbmdlXCIsIChldmVudDogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IGV2ZW50WzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBcHAgY2F1Z2h0IGV2ZW50LCBsb2dnZWRJbjogXCIgKyBldmVudFswXSk7XG5cdFx0ICAgIGxvZ2dpbmdTZXJ2aWNlLmxvZyhldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnN1YnNjcmliZShcInRhc2tzUmVzdWx0XCIsIChldmVudDogQXJyYXk8YW55PikgPT4ge1xuXHQgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLmxvZyhldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwLnRzIGZpbmlzaGVkIGNvbnN0cnVjdG9yXCIpO1xuICAgIH1cblxuICAgIGxvZ291dChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dPdXQoKTtcbiAgICAgICAgdGhpcy5sb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci5wdWJsaXNoKFwiYXV0aGVudGljYXRpb25TdGF0ZUNoYW5nZVwiLCBbZmFsc2UsIFwiWW91IGxvZ2dlZCBvdXRcIl0pO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcIi9ob21lXCIpO1xuICAgIH1cbn1cblxuYm9vdHN0cmFwKEFwcCxbcm91dGVySW5qZWN0YWJsZXMsIEF1dGhlbnRpY2F0aW9uU2VydmljZV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9