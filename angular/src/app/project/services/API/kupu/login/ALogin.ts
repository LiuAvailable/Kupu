import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const conf = require('../conf.json');

@Injectable({
    providedIn: 'root'
})


export class ALogin {
    url = conf.SERVER.url;
    constructor(private http: HttpClient){}

    requestOptions = this.createHeader();

    login(user:string, password:string):Observable<any>{
        console.log({ user, password });
        const obj= {user,password};
        const txt = JSON.stringify(obj);
        console.log(txt);
        return this.http.post('http://localhost:3000/api/v0.1/login', txt , this.requestOptions);
        //return this.http.post(`http://localhost:4000/api/user/login`, { user, password }, this.requestOptions);
    }

    private createHeader(){

        const header = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Acces-Control-Allow-Headers':'Origin, Content-Type, Accept,Authorization',
        }
        return {headers: new HttpHeaders(header)};
    }

}