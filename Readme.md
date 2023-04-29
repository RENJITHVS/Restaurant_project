

# Restaurant Project

A web application for ordering food from a restaurant. Users can view the menu, select quandity, and place an order. The application is built using Django and React, and uses JWT authentication.

![plot](https://github.com/RENJITHVS/Restaurant_project/blob/main/Frontend/restapi/src/assets/img1.png?raw=true)
![plot](https://github.com/RENJITHVS/Restaurant_project/blob/main/Frontend/restapi/src/assets/img2.png?raw=true)

## Technologies Used

- Django 4.2
- React 16.13.1
- JWT authentication
- Axios

## Features

- View menu items
- Select and add items to cart
- Place orders
- JWT authentication for user login and registration

## Installation and Setup

1. Clone the repository
2. Create a virtual environment and activate it:
   ```
   python3 -m venv myenv
   source myenv/bin/activate
   ```
3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```
4. Set up the backend by navigating to the `backend` directory and running the following commands:
   ```
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```
5. Set up the frontend by navigating to the `Frontend\restapi` directory and running the following commands:
   ```
   npm install
   npm start
   ```
   **Note:** You need to have Node.js installed to run the frontend.

6. Access the application at `http://localhost:3000`

## Usage

1. Register for an account or log in if you already have an account.
2. View the menu items and select the quandity of items you want to order.
3. Review your order.
