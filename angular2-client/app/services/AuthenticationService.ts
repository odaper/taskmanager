import {$http} from "services/http";
import {REST_HOST} from "../config";

export class AuthenticationService {

    constructor() {
        console.log("AuthenticationService constructed with loggedIn [" + this.isLoggedIn() + "] based on localStorage");
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem('jwt');
        return (token && !this.isExpired(token));
    }

    logIn(token: any): void{
        console.log("AuthenticationService logIn (set jwt in localStorage)");
        localStorage.setItem("jwt", token);
    }

    logOut(): void {
        console.log("AuthenticationService logOut (remove jwt from localStorage)");
        localStorage.removeItem('jwt');
    }

    isExpired(token: string): boolean {
        //console.log("compare timestamps: " + Date.now() + " and " + this.getExpireTimestamp(token));
        return (Date.now() > this.getExpireTimestamp(token));
    }

    getExpireTimestamp(token: string): number {
        let tokenArr = token.split(".");
        let decodedMeta = this.base64Decode(tokenArr[1]);
        let jsonMeta = JSON.parse(decodedMeta);
        return jsonMeta.exp * 1000;
    }

    getUsername(token: string): string {
        let tokenArr = token.split(".");
        let decodedMeta = this.base64Decode(tokenArr[1]);
        let jsonMeta = JSON.parse(decodedMeta);
        return jsonMeta.username;
    }

    /**
    * Call REST api to request a JWT token
    * @return Promise object
    */
    getNewToken(username: string, password: string): Promise<any> {
        return $http.post(REST_HOST + "/api/token", {"username": username, "password" : password}, null);
    }

    private base64Decode(s: string): string {
        var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
        var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for(i=0;i<64;i++){e[A.charAt(i)]=i;}
        for(x=0;x<L;x++){
            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
        }
        return r;
    }
}
