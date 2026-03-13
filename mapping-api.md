Module Auth

POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
POST /api/v1/auth/change-password

Module User

GET /api/v1/users/profile

// ================================================================= //

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



POST https://api.nyapa.id/api/v1/auth/logout

Response:
{
    "status": "success",
    "message": "User logged out successfully",
    "data": {}
}


POST https://api.nyapa.id/api/v1/auth/forgot-password

Body:
{
    "email": "string"
}

Response:
{
    "status": "success",
    "message": "Password reset link sent successfully",
    "data": {}
}


POST https://api.nyapa.id/api/v1/auth/reset-password

Body:
{
    "token": "string",
    "password": "string",
    "password_confirmation": "string"
}

Response:
{
    "status": "success",
    "message": "Password reset successfully",
    "data": {}
}


POST https://api.nyapa.id/api/v1/auth/change-password

Body:
{
    "current_password": "string",
    "password": "string",
    "password_confirmation": "string"
}

Response:
{
    "status": "success",
    "message": "Password changed successfully",
    "data": {}
}

