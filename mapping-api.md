MODULE AUTH

Feature
User Registration

UI Page
Register Page

Frontend Route
/register

Service Function
authService.register()

HTTP Method
POST

Endpoint
/api/v1/auth/register

Authentication
No

Request Schema
{
"name": "string",
"email": "string",
"password": "string",
"phone": "string"
}

Response Schema
{
"status": "success",
"message": "User created successfully",
"data": {
"user": {
"id": "integer",
"name": "string",
"email": "string",
"phone": "string",
"role": "string",
"created_at": "datetime",
"updated_at": "datetime"
},
"token": "string"
}
}

State Management

authStore.setUser()
authStore.setToken()

Notes

Token disimpan di local storage atau secure cookie.

=======================================================================

Feature
User Login

UI Page
Login Page

Frontend Route
/login

Service Function
authService.login()

HTTP Method
POST

Endpoint
/api/v1/auth/login

Authentication
No

Request Schema
{
"email": "string",
"password": "string"
}

Response Schema
{
"status": "success",
"message": "User logged in successfully",
"data": {
"user": {
"id": "integer",
"name": "string",
"email": "string",
"phone": "string",
"role": "string",
"created_at": "datetime",
"updated_at": "datetime"
},
"token": "string"
}
}

State Management

authStore.setUser()
authStore.setToken()

=======================================================================

Feature
User Logout

UI Page
Profile Dropdown

Frontend Route
/profile

Service Function
authService.logout()

HTTP Method
POST

Endpoint
/api/v1/auth/logout

Authentication
Bearer Token

Request Header
Authorization: Bearer {token}

Response Schema
{
"status": "success",
"message": "User logged out successfully",
"data": {}
}

State Management

authStore.clear()

=======================================================================

Feature
Forgot Password

UI Page
Forgot Password Page

Frontend Route
/forgot-password

Service Function
authService.forgotPassword()

HTTP Method
POST

Endpoint
/api/v1/auth/forgot-password

Authentication
No

Request Schema
{
"email": "string"
}

Response Schema
{
"status": "success",
"message": "Password reset link sent successfully",
"data": {}
}

=======================================================================

Feature
Reset Password

UI Page
Reset Password Page

Frontend Route
/reset-password

Service Function
authService.resetPassword()

HTTP Method
POST

Endpoint
/api/v1/auth/reset-password

Authentication
No

Request Schema
{
"token": "string",
"password": "string",
"password_confirmation": "string"
}

Response Schema
{
"status": "success",
"message": "Password reset successfully",
"data": {}
}

=======================================================================

Feature
Change Password

UI Page
Account Settings

Frontend Route
/settings/security

Service Function
authService.changePassword()

HTTP Method
POST

Endpoint
/api/v1/auth/change-password

Authentication
Bearer Token

Request Schema
{
"current_password": "string",
"password": "string",
"password_confirmation": "string"
}

Response Schema
{
"status": "success",
"message": "Password changed successfully",
"data": {}
}

=======================================================================

MODULE USER

Feature
Get Profile

UI Page
Profile Page

Frontend Route
/profile

Service Function
userService.getProfile()

HTTP Method
GET

Endpoint
/api/v1/users/profile

Authentication
Bearer Token

Request Header
Authorization: Bearer {token}

Response Schema
{
"status": "success",
"message": "User profile retrieved successfully",
"data": {
"user": {
"id": "integer",
"name": "string",
"email": "string",
"phone": "string",
"role": "string",
"created_at": "datetime",
"updated_at": "datetime"
}
}
}

State Management

userStore.setProfile()