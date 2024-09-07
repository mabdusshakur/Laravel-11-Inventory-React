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
-   Run `npm run dev` to compile the assets as for development

**_ This is the same project done on blade but now its on React._**

-   You can find the project at this GitHub repository: [Laravel-11-Inventory- Blade version](https://github.com/mabdusshakur/Laravel-11-Inventory)

## Change Log

-   Added axios interceptor to handle 401 (unauthorized) error globally
-   Added State authentication
