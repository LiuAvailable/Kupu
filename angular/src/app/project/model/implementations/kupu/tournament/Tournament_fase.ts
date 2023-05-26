import { ITournament_fase } from "../../../interfaces/ITournament_fase";

export class Tournament_fase implements ITournament_fase {
    inici!: string;
    fi!: string;
    equipos!: number;
    type!: string;

    constructor(inici: string, fi: string, equipos: number, type:string) {
        this.inici = this.stringToDate(inici);
        this.fi = this.stringToDate(fi);
        this.equipos = equipos;
        this.type = type;
    }

    stringToDate(dateString:string):string {
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1
        const day = fecha.getDate();

        return `${year}-${month}-${day}`;
    }

    /** Returns true if the nº of teams is equal to 2^n (2, 4, 8, 16, 32...) */
    checkTeamsNumber(){ return this.equipos > 0 && Math.log2(this.equipos) % 1 === 0 }
}