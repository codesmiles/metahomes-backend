# MetaHomes backend

Deployed at:  <https://metahomes-be.onrender.com> <br>
This is the backend for the MetaHomes project. It's a node.js application that uses the express framework.

## Setup

### Prerequisites

- Node.js
- Express
- MongoDB

### Installation

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the environment variables as present in the `.env.format` file:

4. Run the application

```bash
npm start
```

## API

### Authentication

The API uses JWT for authentication. The JWT is sent in the `Authorization` header of the request. The JWT is valid for 2 hours. The JWT can be refreshed by sending a `POST` request to `/api/auth/refresh` with the `refreshToken` in the body. The `refreshToken` is valid for 7 days.

### Endpoints

#### User

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user
<!-- - `POST /api/user/refresh` - Refresh the JWT -->
- `GET /api/user` - Welcome message
<!-- - `GET /api/user/:id` - Get a user by id
- `GET /api/user/:id/properties` - Get all properties of a user
- `GET /api/user/:id/properties/:propertyId` - Get a property of a user
- `POST /api/user/:id/properties` - Add a property to a user
- `PUT /api/user/:id/properties/:propertyId` - Update a property of a user
- `DELETE /api/user/:id/properties/:propertyId` - Delete a property of a user -->

#### Property

- `GET /api/property` - Get all properties
- `GET /api/property/:id` - Get a property by id
- `GET /api/property/:id/properties` - Get all properties of a property
