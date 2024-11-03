# Simple todo

It's just a simple todo manager with JSON placeholder as backend api. Used `create-react-app` boilerplate.

## Setup

To run this project locally you need just install node dependencies and run start script

```bash
npm i
```

```bash
npm start
```

## Maintainment

### App structure

Project structure is supper simple: it has just 3 pages to display, 5 components 1 rtk api service and 1 custom hook.

#### Services

##### Rtk api service (`src/services/api.ts`)

Provides api for getting data from JSON-placeholder service. Allows to fetch users, user todos and emulate crud operations
user todos (using `optimistic update` approach for update user todos query result). Also there is `getUsersStatistics` query
which fetch all todos, group them by `userId` and calculate count of completed, uncompleted and total of todos for each user.

#### Components

##### Users (`src/users.tsx`)

Just list of users with simple intro.

##### User (`src/user.tsx`)

Used as smething like layout. Contains navbar with two links: user todos and statistics page. Also there is `Add Todo` button which
allows to open `Create todo dialog`. This component also describes callbacks for submit todo form and provides callbacks for
editing and deleting todos via outlet context.

##### UserTodos (`src/user-todos.tsx`)
List of user todos. Just fetch list of todos for current user and displays it.

##### TodoForm (`src/todo-form.tsx`)
Contain todo create/update form wrapped to bootstrap modal.

##### Summary (`src/summary.tsx`)

Display users statistics. 

#### Custom hooks

##### useSummary (`src/summary-hook.ts`)

Running queries for get users satistics and users list and combine them (extends user info with `statistics` key).