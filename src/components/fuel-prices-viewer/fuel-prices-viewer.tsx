import React from 'react';
import {IResult} from "../../models/interfaces/IResults";
import { For } from 'react-loops';
import {Col, Row} from "react-bootstrap";
import './fuel-prices-viewer.css';
import {Column, DataTable} from "primereact";

const FuelPricesViewer = ({records}: {records: Array<IResult>}) => {

    return (
        <div>
            <div className={"table-responsive"}>

                <For of={records} as={(item: IResult) =>
                    <Row className={'margin border-bottom'}>
                        <Col sm={12} lg={6}>
                            <Row className={'ml-2'}>
                                {item?.name}
                            </Row>
                            <div className={'mt-3'}>
                                <span className={'name-subhead mt-4 text-muted'}>
                                    <small>
                                        Ultima comunicazione rilevata: <strong>{item?.insertDate}</strong>
                                    </small>
                                </span>
                            </div>
                        </Col>

                        <Col sm={12} lg={6}>
                            <DataTable value={item?.fuels} responsiveLayout="scroll">
                                <Column field="name" header="Tipo"></Column>
                                <Column field="price" header="Prezzo"></Column>
                                <Column field="isSelf" header="Servito"></Column>
                            </DataTable>
                        </Col>
                    </Row>
                }/>
            </div>
            <ul>
            </ul>
        </div>
    );
}

export default FuelPricesViewer;