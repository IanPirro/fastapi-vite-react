# FastAPI + React Boilerplate

## Overview

This is a boilerplate for building a full-stack application using FastAPI and React. The backend is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+. The frontend is built using React, a JavaScript library for building user interfaces. The application uses Postgres as the database to store and retrieve data. The application also uses Auth0 for authentication and authorization.

## Built With

- **FastAPI**: FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+.
- **SQLAlchemy**: SQLAlchemy is a SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- **Postgres**: Postgres is used as the database to store and retrieve data for the application.
- **Poetry**: Poetry is a dependency manager for Python projects. It handles project dependencies and packaging in a unified workflow.
- **Pydantic**: Pydantic is a data validation and settings management library for Python.
- **Alembic**: Alembic is a lightweight database migration tool for usage with SQLAlchemy.
- **Auth0**: Auth0 is an authentication and authorization platform. It provides authentication and authorization as a service.

- **Vite**: Vite is a frontend build tool that provides a faster and leaner development experience for modern web projects.
- **React**: React is a JavaScript library for building user interfaces.
- **TypeScript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
- **Storybook**: Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular.

## Getting Started

### Prerequisites

- Python 3.12.0 or higher
- [Poetry](https://python-poetry.org/) installed
- Postgres 15 installed and running

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ianpirro/fastapi-vite-react.git
    ```

2. Change into the project directory:

    ```bash
    cd fastapi-vite-react
    ```

3. Install dependencies using Poetry:

    ```bash
    poetry install
    ```

4. Install UI dependencies using NPM:

    ```bash
    cd ui && npm install
    ```

### Configuration

1. Create a `.env` file in the project root and configure the following settings:

    ```ini
    # .env
    # App
    CORS_ALLOWED_ORIGINS=origin1,origin2,origin3
    # Auth
    AUTH0_DOMAIN=your.domain.auth0.com
    AUTH0_API_AUDIENCE=https://your.api.audience
    AUTH0_ISSUER=https://your.domain.auth0.com/
    AUTH0_ALGORITHMS=RS256

    # DB
    SQL_ALCHEMY_DATABASE_URL="postgresql://localhost:<port>/<db_name>"
    ```

2. Create a `.env.local` file in the `ui` directory and configure the following settings:

    ```ini
    VITE_AUTH0_DOMAIN=your-auth0-domain
    VITE_AUTH0_CLIENT_ID=your-auth0-client-id
    VITE_AUTH0_AUDIENCE=your-auth0-audience
    VITE_API_URL=your-api-url
    ```

### Running the Application

Use the following command to run the FastAPI application:

```bash
poetry run uvicorn api.main:app --reload
```

Use the following command to run the UI:

```bash
nvm use
cd ui && npm run dev
```

Use the following command to run Storybook:

```bash
nvm use
cd ui && npm run storybook
```