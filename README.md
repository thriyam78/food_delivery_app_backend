# food_delivery_app_backend

Start the server with

npm run dev

Local DB setup in .env

Step 1: Create .env file

Step 2: DATABASE_URL="postgresql://postgres:<superadmin_password>@localhost:5432/<DB_NAME>?schema=public"

Step 3: superadmin_password is your local machine postgres pgAdmin Password

Step 4: Create a DB in the pgAdmin and provide the name in <DB_NAME>(.env)


Test Suite:

Different edge cases had been tested using jest
