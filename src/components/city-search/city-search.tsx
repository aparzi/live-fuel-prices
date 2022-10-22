import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Button, Dropdown} from "primereact";
import axios from "axios";
import {IDropdown} from "../../models/interfaces/IDropdown";
import {IGeographicInfo} from "../../models/interfaces/IGeographicInfo";
import {IProvincia} from "../../models/interfaces/IProvincia";
import {ICountry} from "../../models/interfaces/ICountry";

// @ts-ignore
const CitySearch = ({selectedCountry, onCityChange, getInfoFuelBySelectedCity}) => {

    const [regioni, setRegioni] = useState<Array<IDropdown<string>>>([]);
    const [province, setProvince] = useState<Array<IDropdown<string>>>([]);
    const [countries, setCountries] = useState<Array<IDropdown<IGeographicInfo>>>([]);
    const [selectedRegione, setSelectedRegione] = useState<IDropdown<string>>();
    const [selectedProv, setSelectedProv] = useState<IDropdown<string>>();

    useEffect(() => {
        getRegioni();
    }, []);
    const getRegioni = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}regioni`);
            const regioni: Array<IDropdown<string>> = response.data.map((regione: string) => (
                {
                    name: regione,
                    code: regione
                }
            ));

            setRegioni(regioni);
        } catch (error) {
            console.error('Error get info regioni => ', error);
            setRegioni([]);
        }
    }
    const getProvince = async (regione: string) => {
        try {
            if (!regione) {
                setProvince([]);
                return;
            }

            const response = await axios.get(`${process.env.REACT_APP_API_URL}province/${regione}`);
            const province: Array<IDropdown<string>> = (response.data as Array<IProvincia>)?.map((provincia: IProvincia) => (
                {
                    name: provincia?.nome,
                    code: provincia?.nome
                }
            ));

            setProvince(province);
        } catch (error) {
            console.error('Error get info province => ', error);
            setProvince([]);
        }
    }
    const getCountries = async (provincia: string) => {
        try {
            if (!provincia) {
                setCountries([]);
                return;
            }

            const response = await axios.get(`${process.env.REACT_APP_API_URL}comuni/${provincia}`);
            const countries: Array<IDropdown<IGeographicInfo>> = (response.data as Array<ICountry>)?.map((country: ICountry) => (
                {
                    name: country?.nome,
                    code: country?.coordinate
                }
            ));

            setCountries(countries);
        } catch (error) {
            console.error('Error get info countries => ', error);
            setCountries([]);
        }
    }

    const onRegioneChange = async (e: { value: IDropdown<string> }) => {
        if (!e.value) {
            onReset();
            return;
        }
        setSelectedRegione(e.value);
        await getProvince(e.value?.code);
    }

    const onProvinciaChange = async (e: { value: IDropdown<string> }) => {
        setSelectedProv(e.value);
        await getCountries(e.value?.name);
    }

    const onReset = () => {
        setSelectedRegione(undefined);
        setProvince([]);
        setSelectedProv(undefined);
        setCountries([]);
        onCityChange({value: undefined});
    }

    return (
        <Container className='text-center'>
            <Row>
                <Col>
                    <h5>Seleziona Regione, Provincia e Città...</h5>
                    <br></br>
                    <Dropdown value={selectedRegione} options={regioni} filter={true} emptyMessage={'Nessun risultato disponibile...'}
                              onChange={onRegioneChange} optionLabel="name" placeholder="Regione..." resetFilterOnHide={true}
                                filterPlaceholder={'Cerca regione...'} showFilterClear={true} showClear={true} />
                    <Dropdown value={selectedProv} options={province} filter={true} emptyMessage={'Nessun risultato disponibile...'}
                              onChange={onProvinciaChange} optionLabel="name" resetFilterOnHide={true}showFilterClear={true}
                              showClear={true} filterPlaceholder={'Cerca provincia...'} className={'ml-4'} placeholder="Provincia..."/>
                    <Dropdown value={selectedCountry} options={countries} filter={true} emptyMessage={'Nessun risultato disponibile...'}
                              onChange={onCityChange} optionLabel="name" resetFilterOnHide={true} showFilterClear={true}
                              showClear={true} filterPlaceholder={'Cerca comune...'} className={'ml-4'} placeholder="Comune..."/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button label="Cerca impianti" icon="pi pi-search" iconPos="right" aria-label="Search"
                            onClick={getInfoFuelBySelectedCity} className={'p-button-success'}/>
                </Col>
            </Row>
        </Container>
    )
}

export default CitySearch;