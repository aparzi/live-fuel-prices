import React, {useState} from 'react';
import './App.css';
import CitySearch from "./components/city-search/city-search";
import Map from "./components/map-viewer/map";
import {IDropdown} from "./models/interfaces/IDropdown";
import {IGeographicInfo} from "./models/interfaces/IGeographicInfo";
import FuelPricesViewer from "./components/fuel-prices-viewer/fuel-prices-viewer";
import axios from "axios";
import {IResult} from "./models/interfaces/IResults";

function App() {

    const [selectedCountry, setSelectedCountry] = useState<IDropdown<IGeographicInfo>>();
    const [records, setRecords] = useState<Array<IResult>>([]);

    const onCityChange = (e: { value: IDropdown<IGeographicInfo> }) => {
        setSelectedCountry(e.value);
    }

    const getInfoFuelBySelectedCity = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}search/zone`, {
                points: [
                    {
                        "lat": selectedCountry?.code?.lat,
                        "lng": selectedCountry?.code?.lng
                    }
                ]
            });
            setRecords(response.data.results);
        } catch (error) {
            console.error('Error get info fuel => ', error);
            setRecords([]);
        }
    }

    // @ts-ignore
    return (
        <div className="App">
            <CitySearch selectedCountry={selectedCountry} onCityChange={onCityChange} getInfoFuelBySelectedCity={getInfoFuelBySelectedCity}/>
            <div style={{paddingBottom: '5rem'}}></div>
            <Map geographicInfo={selectedCountry?.code} records={records}/>
            <div style={{paddingBottom: '3rem'}}></div>
            <FuelPricesViewer records={records}/>
        </div>
    );
}

export default App;
