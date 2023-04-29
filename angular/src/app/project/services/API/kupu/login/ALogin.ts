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
        /* const obj= {user,password};
        const txt = JSON.stringify(obj); */
        return this.http.post('http://localhost:3000/api/v0.1/login', {user, password} , this.requestOptions);
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