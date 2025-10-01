# To Do application - Kanban Style

This is a Kanban styled To Do application

## Clone The Repo

`git clone git@github.com:shovontanvir/kanban-todo-app.git`

## How To Run The App In Local Env

### Install Dependencies - FE and BE Both

In the root folder, run the follwoing
`npm run install`

### Start The Servers - FE and BE Both

`npm start`

The FE will run on `http://localhost:5173` and the BE will run on `http://localhost:8000`

## How To Run Using Docker

### Build container

`docker compose build`

### Run container

`docker compose up -d`

The FE will run on `http://localhost:5173` and the BE will run on `http://localhost:8000`

## Tech Stacks:

- Front End: `React`, `React Query`, `React Hook Form`, `ShadCN UI`, `TailwindCSS`
- Back End: `NodeJS`, `ExpressJS`
- Database: `MongoDB`

## How To Use

- `Sign Up`: Sign up to create a user
- `Login`: After creating a user, login to get the application access
- `Category`: Add a category first, you can not create a task before creating a category. Other users category won't be available in your Task board
- `Task`: Add Tasks after creating category/ies.
- `Task Details`: Go to task details, you can update/delete your tasks here
- `DragAndDrop`: Grab a task to Drag and drop it in any available categories to change the status
- `Notification`: Tasks with deadlines near can be seen in the notification board, just a list view, no interactions
- `Log Out`: Log out when done
- `Tasks can be created/updated/deleted`
- `Categories do not support Update/Delete`

# Thank you
