-   API Documentation
-   This API provides endpoints for user authentication, user management, customer management, category management,
-   product management, invoice management, and generating sales reports.
-   ** Key Features **

    -   Backend Calculations For Sales + Invoice
    -   valid - invalid JWT tokens is plus point instead of just removing the token from cookie
    -   Secure Password reset process
    -   More over its Multi Vendor POS System

-   ** Change Log **

    -   Added Client Side Authentication (`24/08/2024`)

-   ** Requirements **

    -   PHP 8.2 >= as its Laravel 11

-   ** Installation **

    -   Clone the repository
    -   Run `composer install`
    -   Run `npm install`
    -   Run `cp .env.example .env`
    -   Run `php artisan key:generate`
    -   Set your database credentials in the `.env` file
    -   Set your mail credentials in the `.env` file
    -   Run `php artisan migrate`
    -   Run `php artisan serve` to start the test server

-   Endpoints:
-   note : most of the request requires the id & email from the token set on the cookie
-   Note: except for register, login, send-otp, verify-otp, all other endpoints require a valid JWT token in the cookie, named `token`.
-
-   -   `/auth/register` (POST): Register a new user.
        ```json
        {
            "firstName": "required|string|max:50",
            "lastName": "required|string|max:50",
            "email": "required|email|unique:users,email",
            "mobile": "required|string|max:16",
            "password": "required|string"
        }
        ```
-   -   `/auth/login` (POST): User login.
        ```json
        {
            "email": "required|email",
            "password": "required|string"
        }
        ```
-   -   `/auth/send-otp` (POST): Send OTP (One-Time Password) for user verification.
        ```json
        {
            "email": "required|email"
        }
        ```
-   -   `/auth/verify-otp` (POST): Verify OTP for user verification.
        ```json
        {
            "email": "required|email",
            "otp": "required|string|max:4"
        }
        ** sets a token in the cookie with user email encrypted
        ```
-   -   `/user/reset-password` (PATCH): Reset user password.
        ```json
        {
            "password": "required|string"
        }
        ** requires the email from the token set on the cookie
        ```
-   -   `/auth/logout` (POST): User logout.
-   -   `/user/profile` (GET): Get user profile information.
-   -   `/user/profile` (PUT): Update user profile information.
        ```json
        {
            "firstName": "required|string|max:50",
            "lastName": "required|string|max:50",
            "email": "required|email|unique:users,email",
            "mobile": "required|string|max:16"
        }
        ```
-   -   `/customers` (GET, POST): Get a list of customers or create a new customer.
        ```json
        {
            "name": "required|string|max:50",
            "email": "required|email|unique:customers,email",
            "mobile": "required|string"
        }
        ```
-   -   `/customers/{id}` (GET, PUT, DELETE): Get, update, or delete a specific customer.
-   -   `/categories` (GET, POST): Get a list of categories or create a new category.
-   -   `/categories/{id}` (GET, PUT, DELETE): Get, update, or delete a specific category.

-   -   `/products` (GET, POST): Get a list of products or create a new product.
        ```json
        {
            "name": "required|string|max:50",
            "category_id": "required|integer|exists:categories,id",
            "price": "required|numeric",
            "unit": "required|integer",
            "image": "required|image" // you can skip this for update
        }
        ```
-   -   `/products/{id}` (GET, PUT, DELETE): Get, update, or delete a specific product.
-   -   `/invoices` (GET, POST): Get a list of invoices or create a new invoice.
        ```json
        {
            "vat": "required|numeric",
            "discount": "required|numeric",
            "customer_id": "required|integer|exists:customers,id",
            "products": "required|array",
            "products.*.product_id": "required|integer|exists:products,id",
            "products.*.quantity": "required|integer"
        }
        ```
-   -   `/invoices/{id}` (GET, DELETE): Get, update, or delete a specific invoice.
-   -   `/sales-report/{fromDate}/{toDate}` (GET): Generate a sales report between the specified
        dates.
-   -   `/summary` (GET): Get a summary of sales data.
-
-   Response Types:
-
-   -   Success Response:
-   ```json
    {
        "success": true,
        "message": "The success message",
        "data": {}
    }
    ```
-
-   -   Error Response (Note that the `errors` field is optional, as well as some time the error code will be 200 instead of 400 or 500):
-   ```json
    {
        "success": false,
        "message": "The error message",
        "errors": []
    }
    ```
-   ** will add frontend documentation soon **
