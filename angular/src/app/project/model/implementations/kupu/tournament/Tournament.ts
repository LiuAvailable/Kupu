import { ITournament } from "../../../interfaces/ITournament";
import { ITournament_fase } from "../../../interfaces/ITournament_fase";

export class Tournament implements ITournament {
    name!: string;
    descripcio!: string;
    numPlayers_team!:number;
    time_format!:string;
    fases: ITournament_fase[] = [];
    organizator!:string;
    finish!: Date;

    constructor(name:string, descripcio:string, numPlayers_team:number, time_format:string, organizator:string){
        this.name=name;
        this.descripcio=descripcio;
        this.numPlayers_team=numPlayers_team;
        this.time_format=time_format;
        this.organizator=organizator;
    }

    newFase(fase: ITournament_fase) { this.fases.push(fase); }
    clearFase(){ this.fases = []; }

    checkFases():Boolean {
        let correct = true;

        let lastfase:Date;
        let teamsAlive:number;
        this.fases.forEach(fase => {
            // new fase has less teams than the last one
            if(!teamsAlive) teamsAlive = fase.equipos;
            else teamsAlive < fase.equipos ? correct = false : '';
            // check if the playoff has the correct number of teams
            if(fase.type.toLocaleLowerCase() == 'eliminatoria') fase.checkTeamsNumber() ? '' : correct = false;
            // each fase starts before ending
            fase.inici < fase.fi ? '' : correct = false
            // fase starts after the last one ends
            if(lastfase && new Date(fase.inici) < lastfase) correct = false;

            teamsAlive = fase.equipos
            lastfase = new Date(fase.fi);
        });

        return correct;
    }
}