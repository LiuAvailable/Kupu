import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const conf = require('../conf.json');

@Injectable({
    providedIn: 'root'
})


export class ATournaments {
    url = conf.SERVER.url;
    constructor(private http: HttpClient){}

    requestOptions = this.createHeader();

    getTournaments():Observable<any>{
        return this.http.get(`${this.url}/tournaments`, this.requestOptions);
    }
    getTeams(id:string):Observable<any>{
        return this.http.get(`${this.url}/tournaments/${id}/teams`, this.requestOptions);
    }

    newTournament(tournament:any):Observable<any>{
        return this.http.post(`${this.url}/tournaments`, tournament, this.requestOptions);
    }

    newTeam(team:any):Observable<any>{
        return this.http.post(`${this.url}/tournaments/teams`, team, this.requestOptions);
    }

    createMathces(matches:any):Observable<any>{
        return this.http.post(`${this.url}/tournaments/matches`, matches, this.requestOptions);
    }

    getMatches(id:any):Observable<any>{
        return this.http.get(`${this.url}/tournaments/${id}/matches`, this.requestOptions);
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