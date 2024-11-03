import React, {useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from './services/api';
import { Outlet } from 'react-router-dom';
import { Card, Stack, Button, Container, Navbar, Nav } from 'react-bootstrap';
import { TodoForm } from './todo-form';
import { Todo } from './services/types';
import { useCreateUserTodoMutation, useUpdateUserTodoMutation, useDeleteUserTodoMutation } from './services/api';
export const User = () => {
    const todoFormRef = useRef<{openModal: (data: Todo) => void}>(null);
    const [createTodo] = useCreateUserTodoMutation();
    const [updateTodo] = useUpdateUserTodoMutation();
    const [deleteTodo] = useDeleteUserTodoMutation();
    const { userId } = useParams();

    const { data, isLoading } = useGetUserByIdQuery(userId as string);

    const openForm = (todo = {
        id: 0,
        title: '',
        completed: false,
        userId: +(userId as string),
    }) => todoFormRef?.current?.openModal(todo);

    if(isLoading) {
        return <h1>Loading..</h1>
    }

    const onTodoFormSubmitted = ({id, ...data}: Todo) => {
        if(id) {
            updateTodo({id, ...data});
        } else {
            createTodo(data);
        }
    }

    const hadnleUpdateTodo = (todo: Todo) => {
        openForm(todo);
    }

    const handleDeleteTodo = (todo: Todo) => {
        deleteTodo(todo);
    }

    return <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Simple Todo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={`/simple-todo/users/${userId}/todos`}>My Todos</Nav.Link>
              <Nav.Link href={`/simple-todo/users/${userId}/summary`}>Summary</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Card body className="h-100">
        <Stack className="h-100 ag-theme-material">
            <Card.Title className="space-between">
                <span>{data?.name} ({data?.username}) Todos</span>
                <Button onClick={() => openForm()}>Add Todo</Button>
            </Card.Title>
            <Outlet context={{onUpdateTodo: hadnleUpdateTodo, onDeleteTodo: handleDeleteTodo}} />
        </Stack>
    </Card>
    <TodoForm ref={todoFormRef} onFormSubmit={onTodoFormSubmitted} />
    </>;
}