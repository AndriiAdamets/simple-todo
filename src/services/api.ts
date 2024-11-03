import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Todo, User, UserStatistics } from './types';

const INITIALUSER_STATISTICS: UserStatistics = {
    completedTodos: 0,
    notCompletedTodos: 0,
    todosTotal: 0,
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        getUsersList: builder.query<User[], void>({query: () => 'users'}),
        getUserById: builder.query<User, string>({query: (id) => `users/${id}`}),
        getUserTodos: builder.query<Todo[], string>({query: (userId) => `users/${userId}/todos`}),
        getUsersStatistics: builder.query<{[key: User['id']]: UserStatistics},void>({query: () => 'todos', transformResponse: (todos: Todo[]) => {
            return todos.reduce<{[key: User['id']]: UserStatistics}>((acc, {userId, completed}) => {
                const {completedTodos, notCompletedTodos, todosTotal} = acc[userId] || {...INITIALUSER_STATISTICS}

                return {
                    ...acc,
                    [userId]: {
                        todosTotal: todosTotal + 1,
                        completedTodos: completedTodos + +completed,
                        notCompletedTodos: notCompletedTodos + +(!completed)
                    }
                }
            }, {});
        },
        }),
        createUserTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
            query: (data: Omit<Todo, 'id'>) => ({
                url: 'todos',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            async onQueryStarted(todoData, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled;
                dispatch(api.util.updateQueryData('getUserTodos', todoData.userId.toString(), (draft) => {
                    draft.push({id: data.id, ...todoData});
                }), )
            },
        }),
        updateUserTodo: builder.mutation<Todo, Todo>({
            query: (data: Todo) => ({
                url: `todos/${data.id}`,
                method: 'PATCH',
                body: JSON.stringify(data)
            }),
            async onQueryStarted(todoData, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(api.util.updateQueryData('getUserTodos', todoData.userId.toString(), (draft) => {
                    return draft.map(todo => {
                        return todo.id === todoData.id ? todoData : todo})
                }), )
            },
        }),
        deleteUserTodo: builder.mutation<void, Todo>({
            query: (data: Todo) => ({
                url: `todos/${data.id}`,
                method: 'DELETE',
                body: JSON.stringify(data)
            }),
            async onQueryStarted(todoData, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(api.util.updateQueryData('getUserTodos', todoData.userId.toString(), (draft) => {
                    return draft.filter(todo => {
                        return todo.id !== todoData.id})
                }), )
            },
        })
    }),
});


export const {
    useGetUsersListQuery,
    useGetUserByIdQuery,
    useGetUserTodosQuery,
    useGetUsersStatisticsQuery,
    useCreateUserTodoMutation,
    useUpdateUserTodoMutation,
    useDeleteUserTodoMutation,
} = api;