import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const conf = require('../conf.json');

@Injectable({
    providedIn: 'root'
})


export class AUsers {
    url = conf.SERVER.url;
    constructor(private http: HttpClient){}

    requestOptions = this.createHeader();

    statistics(id:string):Observable<any>{
        return this.http.get(`${this.url}/users/${encodeURIComponent(id)}/statistics`, this.requestOptions);
    }

    tournaments(id:string):Observable<any>{
        return this.http.get(`${this.url}/users/${encodeURIComponent(id)}/organitzations`, this.requestOptions);
    }

    getTournamentTeam(tournament:string, user:string):Observable<any>{
        return this.http.get(`${this.url}/users/${encodeURIComponent(user)}/tournaments/${encodeURIComponent(tournament)}/teams`, this.requestOptions);
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