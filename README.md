# Cues Core Backend
This repo contains the core backend logic and task/project/auth API of **Cues**.

Both **[Cues Web](https://cues-web.vercel.app)** and **[Cues CLI](https://github.com/aether-flux/cues-cli)** both depend on this repository.

## Project Overview

**Cues** is a multi-platform task and project management platform aimed at making task management for your projects as simple and easy as possible, with a CLI to access your tasks right from your terminal, while also providing a web UI for users who prefer a visual dashboard view.

### Problem
There are many existing platforms that provide excellent features to manage projects and tasks effectively (some including `Linear`, `Todoist`, etc.). However, one issue I personally faced, despite wanting to use such a platform, was that it would become a hassle to constantly switch between the terminal and the browser to develop software and creating/marking off tasks.

In order to solve this, I thought of developing a similar task and project management platform, except it comes with a **CLI** to enhance the productivity flow of developers who live in their terminal.

## Setup Instructions
This backend uses my own framework ([Rensa](https://rensa.vercel.app)). To get started, clone the repo:
```bash
git clone https://github.com/aether-flux/cues-backend.git
cd cues-backend
```

Then, add the following variables to an `.env` file in the project root:
```env
DATABASE_URL=<db-connection-url>
JWT_SECRET=<jwt-secret-key>
```

Next, build the *Prisma* `generated/` directory:
```bash
npm run build
```

Finally, start the server:
```bash
npm run dev
```

## REST API Endpoints
### User and Authentication

#### 1. POST `/api/auth/signup`
This endpoint creates a new user and logs them in by sending an `accessToken` and storing a `refreshToken`, either as a cookie (for Cues web) or sending it as body (for Cues CLI), as per the value of the header `UserAgent`.

Request Body:
```
email: <user-email>
username: <username>
password: <password>
```

Response Body (Web):
```
accessToken: <access-token-jwt>
```

Response Body (CLI):
```
accessToken: <access-token-jwt>
refreshToken: <refresh-token-jwt>
```

#### 2. POST `/api/auth/login`
Logs in an existing user. Requires either email or username, and a password.

Request Body:
```
email/username: <user-email/username>
password: <password>
```

Response Body:
```
same as /api/auth/signup
```

#### 3. POST `/api/auth/logout`
Needed only for Cues web usage. Clears any `refresh tokens` from the browser cookies.

No request body required.

Response Body:
```
message: "User data cleared."
success: true
```

#### 4. POST `/api/auth/refresh`
Refreshes an `accessToken` with the help of a provided `refreshToken`.

No request body required in case of Cues web usage.

Request Body (CLI):
```
refresh_token: <refresh-token-jwt>
```

Response Body:
```
on success:
    accessToken: <new-access-token>

on failure:
    error: <error-message>
    message: <detailed-information>
```

#### 5. GET `/api/auth/user`
Returns user information of currently logged in user.

No request body required. However, the `accessToken` needs to be passed as a header: `Authorization: Bearer {accessToken}`.

Response Body:
```
id: <user-id>
username: <username>
email: <user-email>
```

### Project Management
> All of the following routes require the `Authorization: Bearer {accessToken}` to be passed as a request header.

#### 1. GET `/api/projects`
Fetch all projects of current user.

Response Body:
```
on success:
    message: <message>
    projects: <array-of-all-project-objects>

on failure:
    message: <message>
    error: <error-message>
```

#### 2. GET `/api/projects/:id`
Fetch project with projectId `id`.

Response Body:
```
on success:
    message: <message>
    project: <project-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 3. POST `/api/projects/new`
Create a new project.

Request Body:
```
name: <project-name>
```

Response Body:
```
on success:
    message: <message>
    project: <project-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 4. PUT `/api/projects/:id`
Updates project with projectId `id` with new data.

Request Body:
```
name<optional>: <project-name>
```

Response Body:
```
on success:
    message: <message>
    project: <project-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 5. DELETE `/api/projects/:id`
Deletes the project with id `id`.

Response Body:
```
on success:
    message: <message>
    project: <project-object>

on failure:
    message: <message>
    error: <error-message>
```

### Task Management
> All of the following routes require the `Authorization: Bearer {accessToken}` to be passed as a request header.

#### 1. GET `/api/tasks`
Fetch all tasks of current user.

Response Body:
```
on success:
    message: <message>
    tasks: <array-of-all-task-objects>

on failure:
    message: <message>
    error: <error-message>
```

#### 2. GET `/api/tasks/:id`
Fetch task with taskId `id`.

Response Body:
```
on success:
    message: <message>
    task: <task-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 3. POST `/api/tasks/new`
Create a new task.

Request Body:
```
title: <task-title>,
description<optional>: <task-description>,
projectId: <project-id-where-task-belongs>,
due<optional>: <due-datetime-of-task-completion>,
priority<optional>: <task-priority>,
```

Response Body:
```
on success:
    message: <message>
    task: <task-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 4. PUT `/api/tasks/:id`
Updates task with taskId `id` with new data.

Request Body:
```
title<optional>: <task-title>,
description<optional>: <task-description>,
due<optional>: <due-datetime-of-task-completion>,
priority<optional>: <task-priority>,
```

Response Body:
```
on success:
    message: <message>
    task: <task-object>

on failure:
    message: <message>
    error: <error-message>
```

#### 5. DELETE `/api/tasks/:id`
Deletes the task with id `id`.

Response Body:
```
on success:
    message: <message>
    task: <task-object>

on failure:
    message: <message>
    error: <error-message>
```

## Interested?
- Visit the [web](https://cues-web.vercel.app) version of **Cues** to explore a familiar dashboard-based task and project management experience.
- Check out the **Cues CLI** [here](https://github.com/aether-flux/cues-cli). Installation instructions can be found on both the [website](https://cues-web.vercel.app/) as well as the repository provided.

## Support
If you liked the project and it turned out actually useful for you, consider supporting me at:
[![buymeacoffee-badge](https://img.shields.io/badge/aetherflux-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=1a1a1a)](https://buymeacoffee.com/aetherflux).

## License
This project is licensed under **MIT**.

