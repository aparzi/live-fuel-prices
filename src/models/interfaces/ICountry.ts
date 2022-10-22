import {IGeographicInfo} from "./IGeographicInfo";

export interface ICountry {

    codice: string;
    nome: string;
    nomeStraniero: string;
    codiceCatastale: string;
    cap: string;
    prefisso: string;
    provincia: string;
    email: string;
    pec: string;
    telefono: string;
    fax: string;
    coordinate: IGeographicInfo;

}