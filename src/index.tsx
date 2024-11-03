import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/styles/ag-grid.css";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { Container } from 'react-bootstrap';
import { Users } from './users';
import { User } from './user';
import { UserTodos } from './user-todos';
import { Summary } from './summary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {path: '/simple-todo', Component: Users},
  {path: '/simple-todo/users/:userId', Component: User, children: [
    {path: '/simple-todo/users/:userId/todos', Component: UserTodos},
    {path: '/simple-todo/users/:userId/summary', Component: Summary},
  ]},
])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container>
        <RouterProvider router={router}></RouterProvider>
      </Container>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
