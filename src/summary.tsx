import React from 'react';
import { useSummary } from './summary-hook';
import { Card, Stack } from 'react-bootstrap';
import { ColDef } from 'ag-grid-community';
import {SummaryItem} from './services/types';
import { AgGridReact } from 'ag-grid-react';

const columnDefs: ColDef<SummaryItem>[] = [
    {
        field: 'name',
        flex: 1,
        headerName: 'User Name'
    },
    {
        field: 'statistics.completedTodos',
        cellRenderer: ({value}: {value: number}) => (<span style={{color: '#00ff00'}}>{value}</span>),
        headerName: 'Completed todos',
    },
    {
        field: 'statistics.notCompletedTodos',
        cellRenderer: ({value}: {value: number}) => (<span style={{color: '#ff0000'}}>{value}</span>),
        headerName: 'Non-completed todos',
    },
    {
        field: 'statistics.todosTotal',
        headerName: 'Total',
    },
];

export const Summary = () => {
    const {data, isLoading} = useSummary();

    let content;

    if(isLoading) {
        content = <h2>Loading</h2>;
    } else {
        content = <AgGridReact
        domLayout="autoHeight"
        columnDefs={columnDefs}
        rowData={data}
        ></AgGridReact>
    }

    return (<>
        <Card body className="h-100">
            <Stack className="h-100 ag-theme-material">
                <Card.Title>Summary</Card.Title>
                {content}
            </Stack>
        </Card>
    </>);
};