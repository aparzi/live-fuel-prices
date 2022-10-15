import React, {useState} from 'react';
import './App.css';
import CitySearch from "./components/city-search/city-search";
import Map from "./components/map-viewer/map";
import {IDropdown} from "./models/interfaces/IDropdown";
import {IGeographicInfo} from "./models/interfaces/IGeographicInfo";

function App() {
  const [selectedCity, setSelectedCity] = useState<IDropdown<IGeographicInfo>>();
  const onCityChange = (e: { value: IDropdown<IGeographicInfo>}) => {
    console.log('city selected => ', e.value);
    setSelectedCity(e.value);
  }

  return (
    <div className="App">
      <CitySearch selectedCity={selectedCity} onCityChange={onCityChange}/>
      <div style={{ paddingBottom: '5rem' }}></div>
      <Map lat={selectedCity?.code?.lat} lng={selectedCity?.code?.lng}/>
    </div>
  );
}

export default App;
