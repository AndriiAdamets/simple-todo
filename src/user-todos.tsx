import React, {useMemo} from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGetUserTodosQuery } from './services/api';
import { ColDef } from 'ag-grid-community';
import { Todo } from './services/types';
import { AgGridReact } from 'ag-grid-react';
import { Form, Button } from 'react-bootstrap';

export const UserTodos = () => {
    const { userId } = useParams();

    const {onUpdateTodo, onDeleteTodo}: {onUpdateTodo: (todo: Todo) => void, onDeleteTodo: (todo: Todo) => void} = useOutletContext();
    const columnDefs: ColDef<Todo>[] = useMemo(() => [
        {field: 'title', flex: 1},
        {field: 'completed', cellRenderer: ({data}: {data: Todo}) => <Form.Check type="checkbox" checked={data.completed} disabled={true} />},
        {headerName: 'Actions', cellRenderer: ({data}: {data: Todo}) => <div className="space-between w-100">
            <Button onClick={() => onUpdateTodo(data)}>Update</Button>
            <Button onClick={() => onDeleteTodo(data)}>Delete</Button>
        </div>}
    ], [onUpdateTodo, onDeleteTodo]);

    const {data, isLoading } = useGetUserTodosQuery(userId as string);
    if(isLoading) {
        return <h2>Loading</h2>
    }
    return <AgGridReact
    domLayout="autoHeight"
    rowHeight={50}
    columnDefs={columnDefs}
    rowData={data}
    ></AgGridReact>
}