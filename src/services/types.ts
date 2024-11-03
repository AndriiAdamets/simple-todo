export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

export type UserStatistics = {
    completedTodos: number;
    notCompletedTodos: number;
    todosTotal: number;
};

export type SummaryItem = User & {
    statistics?: UserStatistics;
}

export type Todo = {
    id: number;
    userId: User['id'];
    title: string;
    completed: boolean;
}