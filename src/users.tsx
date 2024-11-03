import React from 'react';
import { useGetUsersListQuery } from './services/api';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { User } from './services/types';
import { Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const columnDefs: ColDef<User>[] = [
    {
        field: 'username',
        flex: 1,
        cellRenderer: ({data}: {data: User}) => <Link to={`/simple-todo/users/${data.id}/todos`}>{data.username}</Link>,
    },
    {
        field: 'name'
    },
    {
        field: 'email',
    },
];

export const Users = () => {
    const { data, isLoading } = useGetUsersListQuery();
    const headerAndDescription = (
        <>
            <h1>Wellcome to simple todo!</h1>
            <p>For autorize as any user and proceed with todo list just click to one of there users from list below</p>
        </>
    );

    if(isLoading) {
        return <>
            {headerAndDescription}
            <h2>Loading...</h2>
        </>
    }

    if(data) {
        return <>
            {headerAndDescription}
            <Card body className="h-100">
            <Stack className="h-100 ag-theme-material">
                <Card.Title>Users</Card.Title>
                <AgGridReact
                domLayout="autoHeight"
                columnDefs={columnDefs}
                rowData={data}
                ></AgGridReact>

            </Stack>
            </Card>
        </>
    }
    
    return null;
}