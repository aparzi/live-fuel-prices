import {IGeographicInfo} from "./IGeographicInfo";

interface IFuel {
    id: number;
    price: number;
    name: string;
    fuelId: number;
    isSelf: boolean;
}

export interface IResult {
    id: number;
    name: string;
    fuels: Array<IFuel>;
    location: IGeographicInfo;
    insertDate: string;
    address: string;
    brand: string;
}