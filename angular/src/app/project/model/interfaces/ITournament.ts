import { ITournament_fase } from "./ITournament_fase";

export interface ITournament {
    name: string;
    descripcio: string;
    numPlayers_team:number;
    time_format:string;
    fases:Array<ITournament_fase>
}