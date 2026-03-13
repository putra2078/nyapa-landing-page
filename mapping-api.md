Free Trial

POST https://api.nyapa.id/api/v1/auth/register

Body:
{
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
}

Response:
{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "string",
            "email": "string",
            "phone": "string",
            "role": "string",
            "created_at": "2026-03-13T08:31:38.000000Z",
            "updated_at": "2026-03-13T08:31:38.000000Z"
        },
        "token": "string"
    }
}


Login

POST https://api.nyapa.id/api/v1/auth/login

Body:
{
    "email": "string",
    "password": "string"
}

Response:
{
    "status": "success",
    "message": "User logged in successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "string",
            "email": "string",
            "phone": "string",
            "role": "string",
            "created_at": "2026-03-13T08:31:38.000000Z",
            "updated_at": "2026-03-13T08:31:38.000000Z"
        },
        "token": "string"
    }
}


Get Profile

GET https://api.nyapa.id/api/v1/users/profile

Response:
{
    "status": "success",
    "message": "User profile retrieved successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "string",
            "email": "string",
            "phone": "string",
            "role": "string",
            "created_at": "2026-03-13T08:31:38.000000Z",
            "updated_at": "2026-03-13T08:31:38.000000Z"
        }
    }
}



