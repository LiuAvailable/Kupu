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

    login(user:string, password:string):Observable<any>{
        return this.http.post(`${this.url}/login`, { user, password });
    }
}