import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Button, Dropdown} from "primereact";
import {IGeographicInfo} from "../../models/interfaces/IGeographicInfo";

// @ts-ignore
const CitySearch = ({selectedCity, onCityChange, getInfoFuelBySelectedCity}) => {
    const cities = [
        {name: 'Campobasso', code: {lat: 41.5602544, lng: 14.6627161} as IGeographicInfo},
        {name: 'Bojano', code: {lat: 41.4820727, lng: 14.4736937} as IGeographicInfo},
        {name: 'Isernia', code: {lat: 41.59712622004702, lng: 14.234130344010838} as IGeographicInfo},
        {name: 'Termoli', code: {lat: 42.00126788980249, lng: 14.994226995641514} as IGeographicInfo}
    ];

    return (
        <Container className='text-center'>
            <Row>
                <Col>
                    <h5>Seleziona una città</h5>
                    <Dropdown value={selectedCity} options={cities} onChange={onCityChange} optionLabel="name"
                              placeholder="Selziona una città"/>
                    <Button icon="pi pi-search" className="p-button-rounded p-button-success ml-2" aria-label="Search"
                            onClick={getInfoFuelBySelectedCity}/>
                </Col>
            </Row>
        </Container>
    )
}

export default CitySearch;