import React from 'react';
import {IFuel, IResult} from "../../models/interfaces/IResults";
import { For } from 'react-loops';
import {Col, Row} from "react-bootstrap";
import './fuel-prices-viewer.css';
import {Column, DataTable} from "primereact";

const FuelPricesViewer = ({records}: {records: Array<IResult>}) => {

    const imageBodyTemplate = (rowData: IFuel) => {
        if (rowData?.isSelf) {
            return <img width={25} height={25} src={process.env.PUBLIC_URL + '/images/red-circle.png'} alt="image-red.png" />;
        } else {
            return <img width={25} height={25} src={process.env.PUBLIC_URL + '/images/green-circle.png'} alt="image-green.png" />;
        }
    }

    const formatDate = (item: IResult) => {
        const d = item?.insertDate.split('T');
        const s = d[1].split(':');
        const itaFormat = `${new Date(item?.insertDate).getDate()}/${new Date(item?.insertDate).getMonth()+1}/${new Date(item?.insertDate).getFullYear()}` ;
        return `${itaFormat} ${s[0]}:${s[1]}`;
    }

    return (
        <div>
            <div className={"table-responsive"}>
                <For of={records} as={(item: IResult) =>
                    <Row className={'margin border-bottom'}>
                        <Col sm={12} lg={6}>
                            <Row className={'ml-2'}>
                                {item?.name}
                            </Row>
                            <div className={'ml-2 mt-3'} style={{ textAlign: "left" }}>
                                <span className={'name-subhead mt-4 text-muted'}>
                                    <small>
                                        Ultima comunicazione rilevata: <strong>{formatDate(item)}</strong>
                                    </small>
                                </span>
                            </div>
                        </Col>

                        <Col sm={12} lg={6}>
                            <DataTable value={item?.fuels} scrollable scrollHeight="200px" responsiveLayout="scroll">
                                <Column className={'max-width-column'} field="name" header="Tipo" frozen></Column>
                                <Column field="price" header="Prezzo" frozen></Column>
                                <Column body={imageBodyTemplate} header="Servito" frozen></Column>
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