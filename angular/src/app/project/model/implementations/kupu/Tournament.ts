import { ITournament } from "../../interfaces/ITournament";

export class Tournament implements ITournament {
    id!: string;
    name!: string;
    description!: string;

    constructor(id:string, name:string){
        this.id=id;
        this.name=name;
    }

}